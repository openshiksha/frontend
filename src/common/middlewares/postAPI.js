import { camelCaseKeys } from '../utils';

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
    });
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

export default postAPI;