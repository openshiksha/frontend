export const camelCaseKeys = (data) => {
    if (Array.isArray(data)) {
        return camelCaseKeysInArray(data);
    }

    const nestedCamelCasedData = Object.keys(data).reduce((config, datum) => {
        if (Array.isArray(data[datum])) {
            config[datum] = camelCaseKeysInArray(data[datum]);
        }
        else {
            config[datum] = camelCaseKeysInObject(data[datum]);
        }

        return config;
    }, {});

    return camelCaseKeysInObject(nestedCamelCasedData);
}

const camelCaseKeysInArray = (arr) => {
    return arr.map(elem => camelCaseKeysInObject(elem));
}

const camelCaseKeysInObject =(obj) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelCasedKey = camelCaseString(key);
            if (camelCasedKey !== key) {
                obj[camelCasedKey] = obj[key];
                delete obj[key];
            }

            if (typeof obj[camelCasedKey] === 'object') {
                if (Array.isArray(obj[camelCasedKey])) {
                    obj[camelCasedKey] = camelCaseKeysInArray(obj[camelCasedKey]);
                } else {
                    obj[camelCasedKey] = camelCaseKeysInObject(obj[camelCasedKey]);
                }
            }
        }
    }

    return obj;
}
const toUpperCaseStringForCamel = (match, group) => {
    if (Number(group) >= 0 || Number(group) <= 9) {
        return `_${group}`;
    }
    return group.toUpperCase();
}

const camelCaseString = (str) => str.replace(/_(.)/g, toUpperCaseStringForCamel);
