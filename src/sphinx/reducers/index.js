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
      contentImages: {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [{ uid: 'rc-upload-1594058525918-4', lastModified: 1593961857000, name: 'question.jpg', size: 98835, type: 'image/jpeg', percent: 0, originFileObj: { uid: 'rc-upload-1594058525918-4' }, status: 'removed', preview: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' }]
      },
      hintImages: {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
      },
      solutionImages: {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
      },
      index: 0,
      contentText: '',
      hintText: '',
      solutionText: '',
      variablesNumber: 0,
      templateType: 'Textual',
      variables: []
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
    default: {
      return state
    }
  }
}

export default mainReducer
