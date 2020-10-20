import _ from 'lodash'

import * as ActionTypes from '../actions'
import { addProgrammaticAnswersToSubpart } from '../../common/utils/sphinxActions'

const variableBase = {
  name: 'defaultName',
  type: 'default',
  range: {
    rInclude: '',
    rExclude: '',
    step: 1
  },
  options: '',
  fraction: {
    numerator: 1,
    denominator: 1
  }
}

const MCQAnswerBase = {
  text: '',
  images: []
}

const initialState = {
  questionLoader: {
    isVisible: false,
    questionList: [],
    board: 1,
    standard: 8,
    subject: '',
    chapter: '',
    selectedQuestionId: null
  },
  questionCreator: {
    subpartCreator: {
      contentImages: [],
      hintImages: [],
      solutionImages: [],
      index: 0,
      contentText: '',
      hintText: '',
      solutionText: '',
      variablesNumber: 0,
      templateType: 'textual',
      variables: [],
      imagePreviewVisible: false,
      previewImage: '',
      imagePreviewTitle: '',
      correctAnswer: {
        MCSAQ: {
          format: 'radio',
          correct: [{ ...MCQAnswerBase }],
          incorrectNumber: 1,
          incorrect: [{ ...MCQAnswerBase }]
        },
        MCMAQ: {
          incorrectNumber: 1,
          incorrect: [{ ...MCQAnswerBase }],
          correctNumber: 1,
          correct: [{ ...MCQAnswerBase }]
        },
        textual: {
          text: ''
        },
        numerical: {
          text: '',
          tolerance: '',
          unit: ''
        }
      },
      tags: []
    },
    subparts: [],
    tableSubparts: [],
    questionErrorText: '',
    questionSuccessText: '',
    editMode: false,
    previewType: '',
    subpartPreview: {},
    questionPreview: [],
    showPreviewQuestionItem: false,
    content: '',
    hint: '',
    tags: [],
    board: 1, // will give a drop down eventually,
    language: 1, // will be a dropdown eventually
    standard: '',
    subject: '',
    chapter: '',
    subjectData: [],
    chapterData: [],
    schoolData: [],
    tagsData: []
  }
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ON_CHANGE_SUBPART_CREATOR_FIELD: {
      const { changedField } = action

      // special case to populate variables field
      if (_.has(changedField, 'variablesNumber')) {
        changedField.variables = (changedField.variablesNumber !== 0) ? [...Array(changedField.variablesNumber).keys()].map(() => _.cloneDeep(variableBase)) : []
      }

      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            ...changedField
          },
          questionErrorText: '',
          questionSuccessText: '',
          previewType: '',
          subpartPreview: {}
        }
      }
    }

    case ActionTypes.ON_CHANGE_QUESTION_CREATOR_FIELD: {
      const { changedField } = action

      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          questionErrorText: '',
          questionSuccessText: '',
          previewType: '',
          subpartPreview: {},
          ...changedField
        }
      }
    }

    case ActionTypes.GET_ALL_TAGS_SUCCESS: {
      const {
        tags
      } = action.response.payload

      const parsedTags = JSON.parse(tags)
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          tagsData: parsedTags
        }
      }
    }

    case ActionTypes.GET_SUBJECTS_FROM_STANDARD_SUCCESS: {
      const {
        subjects
      } = action.response.payload

      const parsedSubjects = JSON.parse(subjects)
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subjectData: parsedSubjects
        }
      }
    }

    case ActionTypes.GET_CHAPTERS_FROM_SUBJECT_SUCCESS: {
      const {
        chapters
      } = action.response.payload

      const parsedChapters = JSON.parse(chapters)
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          chapterData: parsedChapters
        }
      }
    }

    case ActionTypes.ON_CHANGE_SUBPART_ANSWER_SELECTOR_FIELD: {
      const { changedField } = action

      // special case to populate variables field
      if (_.has(changedField, 'variablesNumber')) {
        changedField.variables = (changedField.variablesNumber !== 0) ? [...Array(changedField.variablesNumber).keys()].map(() => _.cloneDeep(variableBase)) : []
      }

      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            ...changedField
          },
          questionErrorText: '',
          questionSuccessText: '',
          previewType: '',
          subpartPreview: {}
        }
      }
    }

    case ActionTypes.ON_CHANGE_VARIABLE_CREATOR_FIELD: {
      const { changedField, changedIndex } = action

      const changedVariables = state.questionCreator?.subpartCreator?.variables

      changedVariables[changedIndex] = {
        ...changedVariables[changedIndex],
        ...changedField
      }
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            variables: changedVariables
          }
        }
      }
    }

    case ActionTypes.ON_CHANGE_IMAGE_LIST : {
      const { imageList, imageType } = action
      const subpartCreatorState = _.cloneDeep(state.questionCreator.subpartCreator)
      subpartCreatorState[imageType] = imageList
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: subpartCreatorState
        }
      }
    }

    case ActionTypes.ON_TRIGGER_IMAGE_PREVIEW: {
      const {
        filePreview: previewImage,
        fileName: imagePreviewTitle
      } = action
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            imagePreviewVisible: true,
            previewImage,
            imagePreviewTitle
          }
        }
      }
    }

    case ActionTypes.HANDLE_ADD_OR_SAVE_SUBPART_TO_QUESTION: {
      const oldSubparts = state.questionCreator.subparts
      const addedSubpart = state.questionCreator.subpartCreator
      const isEditing = state.questionCreator.editMode
      if (isEditing) {
        oldSubparts[addedSubpart.index] = addedSubpart
      } else {
      // TODO: change this to a proper validator
        const isSubpartValid = (oldSubparts.length === 0 && addedSubpart.index === 0) ||
        (oldSubparts.length ? (oldSubparts[oldSubparts.length - 1].index === addedSubpart.index - 1) : false)

        if (!isSubpartValid) {
          return {
            ...state,
            questionCreator: {
              ...state.questionCreator,
              questionErrorText: 'This is an invalid subpart index. Please start from 0 and go sequentially upwards'
            }
          }
        }
        oldSubparts.push(addedSubpart)
      }

      // required by ant design table layout
      const subparts = oldSubparts
      const tableSubparts = subparts.map((subpart, key) => {
        const { index, contentText, hintText, solutionText, variablesNumber, templateType } = subpart
        return {
          index,
          contentText,
          hintText,
          solutionText,
          variablesNumber,
          templateType,
          key
        }
      })
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: _.cloneDeep(initialState.questionCreator.subpartCreator),
          subparts,
          tableSubparts,
          questionSuccessText: isEditing ? 'You have successfully edited the subpart' : 'You have successfully added the subpart to the question',
          editMode: false
        }
      }
    }

    case ActionTypes.HANDLE_SUBMIT_QUESTION_SUCCESS: {
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subparts: [],
          tableSubparts: [],
          questionSuccessText: 'Successfully submitted question',
          subpartCreator: _.cloneDeep(initialState.questionCreator.subpartCreator)
        }
      }
    }

    case ActionTypes.HANDLE_SUBMIT_QUESTION_FAILURE: {
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          questionErrorText: 'Error in submitting the question'
        }
      }
    }

    case ActionTypes.HANDLE_CLOSE_PREVIEW_WINDOW: {
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            imagePreviewVisible: false
          },
          questionErrorText: '',
          questionSuccessText: '',
          subpartPreview: {},
          questionPreview: [],
          previewType: '',
          showPreviewQuestionItem: false
        }
      }
    }

    case ActionTypes.HANDLE_DELETE_SUBPART: {
      const { subpart: deletedSubpart } = action
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subparts: state.questionCreator.subparts.filter((subpart) => subpart.index !== deletedSubpart.index),
          tableSubparts: state.questionCreator.tableSubparts.filter((subpart) => subpart.index !== deletedSubpart.index)
        }
      }
    }

    case ActionTypes.HANDLE_EDIT_SUBPART: {
      const { subpart } = action

      const editedSubpart = state.questionCreator.subparts[subpart.index]
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          editMode: true,
          subpartCreator: editedSubpart
        }
      }
    }

    case ActionTypes.HANDLE_PREVIEW_SUBPART_SUCCESS: {
      const {
        subpartIndex
      } = action.response.payload

      const question = _.cloneDeep(state.questionCreator)
      const subpartPreview = addProgrammaticAnswersToSubpart(question, action.response.payload)

      const questionPreview = state.questionCreator.questionPreview
      questionPreview[subpartIndex] = subpartPreview
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartPreview,
          questionPreview
        }
      }
    }

    case ActionTypes.HANDLE_SET_PREVIEW_TYPE: {
      const { previewType } = action
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          previewType
        }
      }
    }

    case ActionTypes.HANDLE_SHOW_QUESTION_PREVIEW: {
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          showPreviewQuestionItem: true
        }
      }
    }

    case ActionTypes.ON_REMOVE_IMAGE_FROM_IMAGE_LIST: {
      const { imageType, removedFile } = action
      const subpartCreatorState = _.cloneDeep(state.questionCreator.subpartCreator)
      const newImageList = subpartCreatorState[imageType].filter((file) => {
        return file.uid !== removedFile.uid
      })
      subpartCreatorState[imageType] = newImageList
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: subpartCreatorState
        }
      }
    }

    case ActionTypes.ON_REMOVE_MCQ_OPTION_IMAGE: {
      const { templateType, removedFile, fieldSet, index } = action
      const MCQOptionsState = _.cloneDeep(state.questionCreator.subpartCreator.correctAnswer[templateType][fieldSet])
      const newImageList = MCQOptionsState[index].images.filter((file) => {
        return file.uid !== removedFile.uid
      })
      MCQOptionsState[index].images = newImageList
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            correctAnswer: {
              ...state.questionCreator.subpartCreator.correctAnswer,
              [templateType]: {
                ...state.questionCreator.subpartCreator.correctAnswer[templateType],
                [fieldSet]: MCQOptionsState
              }
            }
          }
        }
      }
    }

    case ActionTypes.ON_CHANGE_ANSWER_SELECTOR_FIELD: {
      const { changedField, templateType } = action

      if (_.has(changedField, 'incorrectNumber')) {
        changedField.incorrect = (changedField.incorrectNumber !== 0) ? [...Array(changedField.incorrectNumber).keys()].map(() => _.cloneDeep(MCQAnswerBase)) : []
      }

      if (_.has(changedField, 'correctNumber')) {
        changedField.correct = (changedField.correct !== 0) ? [...Array(changedField.correctNumber).keys()].map(() => _.cloneDeep(MCQAnswerBase)) : []
      }

      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            correctAnswer: {
              ...state.questionCreator.subpartCreator.correctAnswer,
              [templateType]: {
                ...state.questionCreator.subpartCreator.correctAnswer[templateType],
                ...changedField
              }
            }
          }
        }
      }
    }

    case ActionTypes.ON_CHANGE_MCQ_OPTION_FIELD: {
      const { changedField, templateType, fieldSet, index } = action

      const changedMCQArray = state.questionCreator?.subpartCreator?.correctAnswer[templateType][fieldSet]

      changedMCQArray[index] = {
        ...changedMCQArray[index],
        ...changedField
      }
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            correctAnswer: {
              ...state.questionCreator.subpartCreator.correctAnswer,
              [templateType]: {
                ...state.questionCreator.subpartCreator.correctAnswer[templateType],
                [fieldSet]: changedMCQArray
              }
            }
          }
        }
      }
    }

    case ActionTypes.ON_CHANGE_MCQ_OPTION_IMAGE_LIST: {
      const { templateType, imageList, fieldSet, index } = action

      const MCQOptionsState = _.cloneDeep(state.questionCreator.subpartCreator.correctAnswer[templateType][fieldSet])
      MCQOptionsState[index].images = imageList

      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            correctAnswer: {
              ...state.questionCreator.subpartCreator.correctAnswer,
              [templateType]: {
                ...state.questionCreator.subpartCreator.correctAnswer[templateType],
                [fieldSet]: MCQOptionsState
              }
            }
          }
        }
      }
    }

    default: {
      return state
    }
  }
}

export default mainReducer
