export const permissionLevels = Object.freeze({
    'guest': -1,
    'student': 0,
    'operator': 1,
    'owner': 2,
});

// this will flip the keys and values (-1: guest, 0: student, etc)
export const permissionEnumConversion = Object.freeze(Object.fromEntries(Object.entries(permissionLevels).map(entry => entry.reverse())));

const extract = (obj, paramList) => {
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

// security measure: eliminate query params that shouldn't be included
export const filterQuery = (...paramList) => (req, res, next) => {
    req.query = extract(req.query, paramList);
    next();
}

// require that query or body be non-empty
const requireParams = (which, paramList) => {
    if (paramList.length <= 0) return (req, res, next) => {
        const obj = req?.[which];
        if (Object.keys(obj).length <= 0) next({
            status: 400,
            message: `Must specify ${which} params!`
        })
        else {
            next();
        }
    };
    // if parameter list is specified
    return (req, res, next) => {
        const obj = req?.[which];
        let good = true;
        for (const param of paramList) {
            // check exists
            if (!(param in obj)) {
                good = false;
                next({
                    status: 400,
                    message: `Parameter '${param}' is required.`
                });
            }
        }
        if (good) {
            next();
        }
    }
}

// validation: reject if the body does not contain required params
export const requireBody = (...paramList) => {
    return requireParams('body', paramList);
}

// validation: reject if the query does not contain required params
export const requireQuery = (...paramList) => {
    return requireParams('query', paramList);
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
    const role = permissionEnumConversion?.[req?.user?.permissions] ?? 'guest';
    if (permissionLevels?.[role] >= permissionLevels[level]) {
        next();
    }
    else next({
        status: 401,
        message: `Access Denied: Role '${role}' is not allowed ${req.method} on ${req.originalUrl}`
    });
}
