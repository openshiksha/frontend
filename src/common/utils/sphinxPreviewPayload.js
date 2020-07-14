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
          correct: correctAnswer.MCSAQ.correct,
          incorrect: correctAnswer.MCSAQ.incorrect
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
