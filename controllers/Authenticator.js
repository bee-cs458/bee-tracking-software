export const permissionLevels = Object.freeze({
    'student': 0,
    'operator': 1,
    'owner': 2,
});

const extract = (obj, ...paramList) => {
    const extracted = {};
    for (const param of paramList) {
        if (obj[param] ?? null !== null) {
            extracted[param] = obj[param];
        }
    }
    return extracted;
}

// security measure: eliminate body params that shouldn't be included
export const filterBody = (...paramList) => (req, res, next) => {
    req.body = extract(req.body, paramList);
    next();
}

// validation: reject if the body does not contain required params
export const requireBody = (...paramList) => {
    // if no validators specified
    if (paramList.length <= 0) return (req, res, next) => {
        if (Object.keys(req.body).length <= 0) next({
            status: 400,
            message: 'Body cannot be empty.'
        })
        next();
    };
    // if validators are specified
    return (req, res, next) => {
        for (const param of paramList) {
            // check exists
            if (!(param in req.body)) {
                next({
                    status: 400,
                    message: `Parameter '${param}' is required.`
                });
            }
        }
        next();
    }
}

// security measure: eliminate query params that shouldn't be included
export const filterQuery = (...paramList) => (req, res, next) => {
    req.query = extract(req.query, paramList);
    next();
}

// validators, might be useful someday but commented for now
// export const exists = x => (x ?? null) !== null;
// export const defined = x => x !== undefined;
// export const isString = x => typeof x === "string" || x instanceof String;
// export const isNumber = x => typeof x === "number" || x instanceof Number;
// export const isBoolean = x => (typeof x === "boolean") || x === 0 || x === 1;
// export const isDate = x => (new Date(x) !== "Invalid Date") && !isNaN(new Date(x));

export const restrictTo = (level) => async (req, res, next) => {
    // TODO implement authentication
    if (permissionLevels?.[req?.headers?.backdoor] >= permissionLevels[level]) {
        next();
    }
    else next({
        status: 401,
        message: 'Access Denied'
    });
}
