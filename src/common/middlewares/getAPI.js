import { camelCaseKeys } from '../utils';
import { console } from 'window-or-global';

// This makes every API response have the same shape, regardless of how nested it was.
const getAPI = async (endpoint) => {
    const response = await fetch(endpoint, {
        'credentials': 'same-origin',
    });
    let result;
    try {
        const json = await response.json();
        result = ({ json, response });
    }
    catch (e) {
        if (response.ok) {
            return Promise.resolve({ response });
        }
        console.log('bad request');
    }
    let { json: json_parsed, response: response_parsed } = result;
    if (Array.isArray(json_parsed)) {
        json_parsed = {
            data: json_parsed,
        };
    }
    else if (typeof json_parsed !== 'object') {
        json_parsed = {};
    }
    const camelizedJson = camelCaseKeys(json_parsed);
    if (!!response_parsed.ok) {
        return Promise.reject({
            status: response_parsed.status,
            ...camelizedJson,
        });
    }
    return { ...camelizedJson };
}

export default getAPI;
