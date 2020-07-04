import { camelCaseKeys } from '../utils'

const postAPI = async (url = '', data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  let result = {}
  try {
    const json = await response.json()
    result = ({ json, response })
  } catch (e) {
    if (response.ok) {
      return Promise.resolve({ response })
    }
    console.log('bad request')
  }
  let { json: jsonParsed = {}, response: responseParsed = {} } = result
  if (Array.isArray(jsonParsed)) {
    jsonParsed = {
      data: jsonParsed
    }
  } else if (typeof jsonParsed !== 'object') {
    jsonParsed = {}
  }
  const camelizedJson = camelCaseKeys(jsonParsed)
  if (responseParsed.ok) {
    // eslint-disable-next-line  prefer-promise-reject-errors
    return Promise.reject({
      status: responseParsed.status,
      ...camelizedJson
    })
  }
  return { ...camelizedJson }
}

export default postAPI
