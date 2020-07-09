import _ from 'lodash'

import * as ActionTypes from '../actions'

const variableBase = {
  name: 'defaultName',
  type: 'default',
  range: {
    rInclude: '',
    rExclude: '',
    step: 1
  },
  options: '',
  fractions: {
    numerator: 1,
    denominator: 1
  }
}

const initialState = {
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
      templateType: 'Textual',
      variables: [],
      imagePreviewVisible: false,
      previewImage: '',
      imagePreviewTitle: ''
    },
    subparts: [],
    tableSubparts: [],
    questionErrorText: '',
    questionSuccessText: '',
    editMode: false
  }
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ON_CHANGE_SUBPART_CREATOR_FIELD: {
      const { changedField } = action

      // special case to populate variables field
      if (_.has(changedField, 'variablesNumber')) {
        changedField.variables = (changedField.variablesNumber !== 0) ? [...Array(changedField.variablesNumber).keys()].map(() => variableBase) : []
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
          questionSuccessText: ''
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
      const subpartCreatorState = state.questionCreator.subpartCreator
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
          subpartCreator: initialState.questionCreator.subpartCreator,
          subparts,
          tableSubparts,
          questionSuccessText: isEditing ? 'You have successfully edited the subpart' : 'You have successfully added the subpart to the question',
          editMode: false
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
          questionSuccessText: ''
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

    case ActionTypes.ON_REMOVE_IMAGE_FROM_IMAGE_LIST: {
      const { imageType, removedFile } = action
      const subpartCreatorState = state.questionCreator.subpartCreator
      const newImageList = state.questionCreator.subpartCreator[imageType].filter((file) => {
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

    default: {
      return state
    }
  }
}

export default mainReducer
