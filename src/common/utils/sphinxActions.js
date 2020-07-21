import _ from 'lodash'

const templateTypeToBackendTypeMap = {
  MCSAQ: 1,
  MCMAQ: 2,
  numerical: 3,
  textual: 4
}

const getVariableKeyforBackend = (variable) => {
  switch (variable.type) {
    case 'default': {
      return {
        [variable.name]: {}
      }
    }
    case 'options': {
      return {
        [variable.name]: {
          options: variable.options.split(',')
        }
      }
    }
    case 'range': {
      return {
        [variable.name]: {
          range: {
            include: [[variable.range.rInclude.split(',')]],
            exclude: variable.range.rExclude ? [[variable.range.rExclude.split(',')]] : null,
            decimal: variable.range.step || null
          }
        }
      }
    }
    case 'fraction': {
      return {
        [variable.name]: {
          fraction: {
            numerator: {
              rangeint: {
                include: [[variable.fraction.numerator.split(',')]]
              }
            },
            denominator: {
              rangeint: {
                include: [[variable.fraction.denominator.split(',')]]
              }
            }
          }
        }
      }
    }
    default:
      return null
  }
}

const changeMCQArrayForBackend = (MCQArray) => {
  const modifiedArray = []
  MCQArray.forEach((element, index) => {
    const modifiedElement = {
      text: element.text,
      img: element.images?.[0]?.name
    }
    modifiedArray.push(modifiedElement)
  })
  return modifiedArray
}

const returnImageKeyForMCQImages = (MCQArray) => {
  const imageArray = {}
  MCQArray.forEach((element, index) => {
    if (element.images?.[0]?.name) {
      imageArray[`${element.images?.[0]?.name}`] = element.images?.[0]?.thumbUrl
    }
  })
  return imageArray
}

// TODO: Support multiple images via sphinx
const getAllImageKeysForSubpartBackendStorage = (subpart) => {
  const refinedSubpart = _.cloneDeep(subpart)
  let allImages = {}
  const {
    hintImages,
    contentImages,
    solutionImages,
    correctAnswer,
    templateType
  } = refinedSubpart

  if (templateType === 'MCSAQ') {
    allImages = {
      ...allImages,
      ...returnImageKeyForMCQImages(correctAnswer.MCSAQ.correct),
      ...returnImageKeyForMCQImages(correctAnswer.MCSAQ.incorrect)
    }
  } else if (templateType === 'MCMAQ') {
    allImages = {
      ...allImages,
      ...returnImageKeyForMCQImages(correctAnswer.MCMAQ.correct),
      ...returnImageKeyForMCQImages(correctAnswer.MCMAQ.incorrect)
    }
  }
  if (hintImages?.[0]?.name) {
    allImages[`${hintImages?.[0]?.name}`] = hintImages?.[0]?.thumbUrl
  }

  if (solutionImages?.[0]?.name) {
    allImages[`${solutionImages?.[0]?.name}`] = solutionImages?.[0]?.thumbUrl
  }

  if (contentImages?.[0]?.name) {
    allImages[`${contentImages?.[0]?.name}`] = contentImages?.[0]?.thumbUrl
  }

  return allImages
}

const getAnswerKeyforBackend = (correctAnswer, templateType) => {
  switch (templateType) {
    case 'textual': {
      return {
        answer: correctAnswer.textual.text
      }
    }
    case 'numerical': {
      return {
        answer: {
          value: correctAnswer.numerical.text,
          tolerance: correctAnswer.numerical.tolerance || null
        },
        unit: correctAnswer.numerical.unit || null
      }
    }
    case 'MCSAQ': {
      return {
        options: {
          use_dropdown_widget: correctAnswer.MCSAQ.format === 'dropdown' ? true : undefined,
          correct: {
            text: correctAnswer.MCSAQ.correct[0].text,
            img: correctAnswer.MCSAQ.correct[0].images?.[0]?.name
          },
          incorrect: changeMCQArrayForBackend(correctAnswer.MCSAQ.incorrect)
        }
      }
    }
    case 'MCMAQ': {
      return {
        options: {
          correct: changeMCQArrayForBackend(correctAnswer.MCMAQ.correct),
          incorrect: changeMCQArrayForBackend(correctAnswer.MCMAQ.incorrect)
        }
      }
    }
    default:
      return null
  }
}

export const convertQuestionToPayload = (questionCreator) => {
  const {
    content: contentText,
    hint: hintText,
    tags,
    board,
    language,
    standard,
    chapter,
    subject,
    subparts
  } = questionCreator

  // required to change payload
  let allImages = {}
  const modifiedSubparts = []
  subparts.forEach((subpart) => {
    const modifiedSubpart = convertSubpartToPayload(subpart)
    const subpartImages = getAllImageKeysForSubpartBackendStorage(subpart)
    allImages = {
      ...allImages,
      ...subpartImages
    }
    modifiedSubparts.push(modifiedSubpart)
  })

  return {
    subparts: modifiedSubparts,
    all_images: allImages,
    content: {
      text: contentText
    },
    hint: {
      text: hintText
    },
    tags,
    board,
    language,
    standard,
    subject,
    chapter,
    school: 1 // hardcoded to openshiksha for now.
  }
}

export const convertSubpartToPayload = (subpart) => {
  const {
    hintText,
    hintImages,
    solutionImages,
    contentImages,
    solutionText,
    contentText,
    index,
    templateType,
    variables,
    correctAnswer
  } = subpart

  let variableConstraints = {}
  variables.forEach((variable) => {
    variableConstraints = {
      ...variableConstraints,
      ...getVariableKeyforBackend(variable)
    }
  })
  return {
    hint: {
      text: hintText,
      img: hintImages?.[0]?.name
    },
    solution: {
      text: solutionText,
      img: solutionImages?.[0]?.name
    },
    content: {
      text: contentText,
      img: contentImages?.[0]?.name
    },
    subpart_index: index,
    type: templateTypeToBackendTypeMap[templateType],
    variable_constraints: variableConstraints,
    ...getAnswerKeyforBackend(correctAnswer, templateType)
  }
}

export const addProgrammaticAnswersToSubpart = (questionCreator, payload) => {
  const {
    hint: {
      text: hintText
    },
    solution: {
      text: solutionText
    },
    content: {
      text: contentText
    },
    answer,
    options,
    subpartIndex
  } = payload

  const {
    previewType,
    subpartCreator,
    subparts
  } = questionCreator
  let subpartPreview = { ...subpartCreator }
  if (previewType === 'question') {
    subpartPreview = { ...subparts[subpartIndex] }
  }

  const { templateType } = subpartPreview
  switch (templateType) {
    case 'textual': {
      subpartPreview.correctAnswer[templateType].text = answer
      break
    }
    case 'numerical': {
      subpartPreview.correctAnswer[templateType].text = answer.value
      break
    }
    case 'MCSAQ': {
      subpartPreview.correctAnswer[templateType].correct[0].text = options.correct.text
      options.incorrect.forEach((incorrectOption, index) => {
        subpartPreview.correctAnswer[templateType].incorrect[index].text = incorrectOption.text
      })
      break
    }

    case 'MCMAQ': {
      options.correct.forEach((correctOption, index) => {
        subpartPreview.correctAnswer[templateType].correct[index].text = correctOption.text
      })
      options.incorrect.forEach((incorrectOption, index) => {
        subpartPreview.correctAnswer[templateType].incorrect[index].text = incorrectOption.text
      })
      break
    }
    default: break
  }

  subpartPreview = {
    ...subpartPreview,
    hintText,
    contentText,
    solutionText,
    index: subpartIndex
  }

  return subpartPreview
}
