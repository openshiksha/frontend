import { GET_API } from '../../common/middlewares/getAPI'

export const HANDLE_TEST_ACTION_REQUEST = 'HANDLE_TEST_ACTION_REQUEST'
export const HANDLE_TEST_ACTION_SUCCESS = 'HANDLE_TEST_ACTION_SUCCESS'
export const HANDLE_TEST_ACTION_FAILURE = 'HANDLE_TEST_ACTION_FAILURE'
export const handleTestAction = (test = 'blah') => ({
  [GET_API]: {
    types: [HANDLE_TEST_ACTION_REQUEST, HANDLE_TEST_ACTION_SUCCESS, HANDLE_TEST_ACTION_FAILURE],
    endpoint: '/sphinx/deal',
    onSuccess: (response, state) => {
      console.log(response)
    },
    onFailure: (response, state) => {
      console.log(response)
    }
  }
})

export const ON_CHANGE_SUBPART_CREATOR_FIELD = 'ON_CHANGE_SUBPART_CREATOR_FIELD'
export const onChangeSubpartCreatorField = (changedField) => {
  return (
    {
      type: ON_CHANGE_SUBPART_CREATOR_FIELD,
      changedField
    }
  )
}

export const ON_CHANGE_VARIABLE_CREATOR_FIELD = 'ON_CHANGE_VARIABLE_CREATOR_FIELD'
export const onChangeVariableCreatorField = (changedIndex, changedField) => {
  return (
    {
      type: ON_CHANGE_VARIABLE_CREATOR_FIELD,
      changedIndex,
      changedField
    }
  )
}

export const HANDLE_CLOSE_PREVIEW_WINDOW = 'HANDLE_CLOSE_PREVIEW_WINDOW'
export const handleClosePreviewWindow = () => {
  return (
    {
      type: HANDLE_CLOSE_PREVIEW_WINDOW
    }
  )
}

export const ON_REMOVE_IMAGE_FROM_IMAGE_LIST = 'ON_REMOVE_IMAGE_FROM_IMAGE_LIST'
export const onRemoveImageFromImageList = (removedFile, imageType) => {
  return (
    {
      type: ON_REMOVE_IMAGE_FROM_IMAGE_LIST,
      imageType,
      removedFile
    }
  )
}

export const ON_TRIGGER_IMAGE_PREVIEW = 'ON_TRIGGER_IMAGE_PREVIEW'
export const onTriggerImagePreview = (filePreview, fileName) => {
  return (
    {
      type: ON_TRIGGER_IMAGE_PREVIEW,
      filePreview,
      fileName
    }
  )
}

export const ON_CHANGE_IMAGE_LIST = 'ON_CHANGE_IMAGE_LIST'
export const onChangeImageList = (imageList, imageType) => {
  return (
    {
      type: ON_CHANGE_IMAGE_LIST,
      imageList,
      imageType
    }
  )
}

export const HANDLE_ADD_OR_SAVE_SUBPART_TO_QUESTION = 'HANDLE_ADD_OR_SAVE_SUBPART_TO_QUESTION'
export const handleAddorSaveSubpartToQuestion = () => {
  return (
    {
      type: HANDLE_ADD_OR_SAVE_SUBPART_TO_QUESTION
    }
  )
}

export const HANDLE_DELETE_SUBPART = 'HANDLE_DELETE_SUBPART'
export const handleDeleteSubpart = (subpart) => {
  return (
    {
      type: HANDLE_DELETE_SUBPART,
      subpart
    }
  )
}

export const HANDLE_EDIT_SUBPART = 'HANDLE_EDIT_SUBPART'
export const handleEditSubpart = (subpart) => {
  return (
    {
      type: HANDLE_EDIT_SUBPART,
      subpart
    }
  )
}
