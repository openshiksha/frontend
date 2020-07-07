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
