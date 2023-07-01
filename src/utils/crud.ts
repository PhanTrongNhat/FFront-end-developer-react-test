export const serialize = (obj:any) => {
    const keys = Object.keys(obj);
    let query = '?';
    keys.forEach(key => {
        if (obj[key] !== undefined && obj[key] !== '') {
            query +=
                typeof obj[key] === 'string'
                    ? `${key}=${obj[key]}&`
                    : `${key}=${JSON.stringify(obj[key])}&`;
        }
    });
    return query;
};