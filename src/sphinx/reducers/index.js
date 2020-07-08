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
    subparts: []
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
          }
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
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            [imageType]: imageList
          }
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

    case ActionTypes.HANDLE_CLOSE_PREVIEW_WINDOW: {
      return {
        ...state,
        questionCreator: {
          ...state.questionCreator,
          subpartCreator: {
            ...state.questionCreator.subpartCreator,
            imagePreviewVisible: false
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
