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
          correct: correctAnswer.MCSAQ.correct[0],
          incorrect: correctAnswer.MCSAQ.incorrect
        }
      }
    }
    case 'MCMAQ': {
      return {
        options: {
          correct: correctAnswer.MCMAQ.correct,
          incorrect: correctAnswer.MCMAQ.incorrect
        }
      }
    }
    default:
      return null
  }
}

export const convertSubpartToPayload = (subpart) => {
  const {
    hintText,
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
      text: hintText
    },
    solution: {
      text: solutionText
    },
    content: {
      text: contentText
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
