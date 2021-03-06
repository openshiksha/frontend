import { POST_API } from '../../common/middlewares/postAPI'
import { GET_API } from '../../common/middlewares/getAPI'
import { convertSubpartToPayload, convertQuestionToPayload } from '../../common/utils/sphinxActions'

export const GET_ALL_TAGS_REQUEST = 'GET_ALL_TAGS_REQUEST'
export const GET_ALL_TAGS_SUCCESS = 'GET_ALL_TAGS_SUCCESS'
export const GET_ALL_TAGS_FAILURE = 'GET_ALL_TAGS_FAILURE'
export const getAllTags = () => ({
  [GET_API]: {
    types: [GET_ALL_TAGS_REQUEST, GET_ALL_TAGS_SUCCESS, GET_ALL_TAGS_FAILURE],
    endpoint: '/sphinx/tags/'
  }
})

export const GET_SUBJECTS_FROM_STANDARD_REQUEST = 'GET_SUBJECTS_FROM_STANDARD_REQUEST'
export const GET_SUBJECTS_FROM_STANDARD_SUCCESS = 'GET_SUBJECTS_FROM_STANDARD_SUCCESS'
export const GET_SUBJECTS_FROM_STANDARD_FAILURE = 'GET_SUBJECTS_FROM_STANDARD_FAILURE'
export const getSubjectsFromStandard = () => ({
  [GET_API]: {
    types: [GET_SUBJECTS_FROM_STANDARD_REQUEST, GET_SUBJECTS_FROM_STANDARD_SUCCESS, GET_SUBJECTS_FROM_STANDARD_FAILURE],
    endpoint: '/sphinx/subjects/'
  }
})

export const GET_CHAPTERS_FROM_SUBJECT_REQUEST = 'GET_CHAPTERS_FROM_SUBJECT_REQUEST'
export const GET_CHAPTERS_FROM_SUBJECT_SUCCESS = 'GET_CHAPTERS_FROM_SUBJECT_SUCCESS'
export const GET_CHAPTERS_FROM_SUBJECT_FAILURE = 'GET_CHAPTERS_FROM_SUBJECT_FAILURE'
export const getChaptersFromSubject = () => ({
  [GET_API]: {
    types: [GET_CHAPTERS_FROM_SUBJECT_REQUEST, GET_CHAPTERS_FROM_SUBJECT_SUCCESS, GET_CHAPTERS_FROM_SUBJECT_FAILURE],
    endpoint: '/sphinx/chapters/'
  }
})

export const HANDLE_PREVIEW_SUBPART_REQUEST = 'HANDLE_PREVIEW_SUBPART_REQUEST'
export const HANDLE_PREVIEW_SUBPART_SUCCESS = 'HANDLE_PREVIEW_SUBPART_SUCCESS'
export const HANDLE_PREVIEW_SUBPART_FAILURE = 'HANDLE_PREVIEW_SUBPART_FAILURE'
export const handlePreviewSubpart = (subpart) => ({
  [POST_API]: {
    types: [HANDLE_PREVIEW_SUBPART_REQUEST, HANDLE_PREVIEW_SUBPART_SUCCESS, HANDLE_PREVIEW_SUBPART_FAILURE],
    endpoint: '/sphinx/deal/',
    payload: {
      subpart: convertSubpartToPayload(subpart)
    }
  }
})

export const HANDLE_SUBMIT_QUESTION_REQUEST = 'HANDLE_SUBMIT_QUESTION_REQUEST'
export const HANDLE_SUBMIT_QUESTION_SUCCESS = 'HANDLE_SUBMIT_QUESTION_SUCCESS'
export const HANDLE_SUBMIT_QUESTION_FAILURE = 'HANDLE_SUBMIT_QUESTION_FAILURE'
export const handleSubmitQuestion = (question) => ({
  [POST_API]: {
    types: [HANDLE_SUBMIT_QUESTION_REQUEST, HANDLE_SUBMIT_QUESTION_SUCCESS, HANDLE_SUBMIT_QUESTION_FAILURE],
    endpoint: '/sphinx/question/',
    payload: {
      question: convertQuestionToPayload(question)
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

export const ON_CHANGE_QUESTION_CREATOR_FIELD = 'ON_CHANGE_QUESTION_CREATOR_FIELD'
export const onChangeQuestionCreatorField = (changedField) => {
  return (
    {
      type: ON_CHANGE_QUESTION_CREATOR_FIELD,
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

export const ON_CHANGE_SUBPART_ANSWER_SELECTOR_FIELD = 'ON_CHANGE_SUBPART_ANSWER_SELECTOR_FIELD'
export const onchangeSubpartAnswerSelectionField = (changedIndex, changedField) => {
  return (
    {
      type: ON_CHANGE_SUBPART_ANSWER_SELECTOR_FIELD,
      changedField
    }
  )
}

export const ON_CHANGE_MCQ_FIELD = 'ON_CHANGE_VARIABLE_CREATOR_FIELD'
export const onChangeMCQField = (changedIndex, changedField) => {
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

export const HANDLE_SHOW_QUESTION_PREVIEW = 'HANDLE_SHOW_QUESTION_PREVIEW'
export const handleShowQuestionPreview = () => {
  return (
    {
      type: HANDLE_SHOW_QUESTION_PREVIEW
    }
  )
}

export const HANDLE_SET_PREVIEW_TYPE = 'HANDLE_SET_PREVIEW_TYPE'
export const handleSetPreviewType = (previewType = 'question') => {
  return (
    {
      type: HANDLE_SET_PREVIEW_TYPE,
      previewType
    }
  )
}

export const ON_CHANGE_MCQ_OPTION_IMAGE_LIST = 'ON_CHANGE_MCQ_OPTION_IMAGE_LIST'
export const onChangeMCQOptionImageList = (imageList, imageType, fieldSet, index) => {
  return (
    {
      type: ON_CHANGE_MCQ_OPTION_IMAGE_LIST,
      imageList,
      templateType: imageType,
      fieldSet,
      index
    }
  )
}

export const ON_REMOVE_MCQ_OPTION_IMAGE = 'ON_REMOVE_MCQ_OPTION_IMAGE'
export const onRemoveMCQOptionImage = (removedFile, imageType, fieldSet, index) => {
  return (
    {
      type: ON_REMOVE_MCQ_OPTION_IMAGE,
      templateType: imageType,
      removedFile,
      fieldSet,
      index
    }
  )
}

export const ON_CHANGE_MCQ_OPTION_FIELD = 'ON_CHANGE_MCQ_OPTION_FIELD'
export const onChangeMCQOptionField = (templateType, fieldSet, index, changedField) => {
  return (
    {
      type: ON_CHANGE_MCQ_OPTION_FIELD,
      changedField,
      index,
      fieldSet,
      templateType
    }
  )
}

export const ON_CHANGE_ANSWER_SELECTOR_FIELD = 'ON_CHANGE_ANSWER_SELECTOR_FIELD'
export const onChangeAnswerSelectorField = (templateType, changedField) => {
  return (
    {
      type: ON_CHANGE_ANSWER_SELECTOR_FIELD,
      templateType,
      changedField
    }
  )
}
