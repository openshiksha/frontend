
const variableBase = {
  name: 'defaultName',
  type: 'options',
  range: {
    rInclude: '',
    rExclude: '',
    step: 1
  },
  options: [],
  fractions: {
    numerator: '',
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
      variables: [variableBase, variableBase]
    },
    subparts: []
  }
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export default mainReducer
