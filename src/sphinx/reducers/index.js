
const initialState = {
  questionCreator: {
    subpartCreator: {
      contentImages: {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
      },
      hintImages: {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: []
      },
      SolutionImages: {
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
      templateType: 'Textual'
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
