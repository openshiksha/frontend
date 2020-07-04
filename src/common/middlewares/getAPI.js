import { console } from 'window-or-global'
import { camelCaseKeys } from '../utils'

// This makes every API response have the same shape, regardless of how nested it was.
const getAPI = async (endpoint) => {
  const response = await fetch(endpoint, {
    credentials: 'same-origin'
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

export default getAPI
