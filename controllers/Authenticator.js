export const permissionLevels = Object.freeze({
    'student': 0,
    'operator': 1,
    'owner': 2,
});

const extract = (obj, ...params) => {
    const extracted = {};
    for (const param of params) {
        if (obj[param] ?? null !== null) {
            extracted[param] = obj[param];
        }
    }
    return extracted;
}

export const filterBody = (...params) => (req, res, next) => {
    req.body = extract(req.body, params);
    next();
}

export const requireBody = (...params) => (req, res, next) => {
    for (const param of params) {
        if (!(param in req.body)) {
            next({
                status: 400,
                message: `Parameter '${param}' is required.`
            });
        }
    }
    next();
}

export const filterQuery = (...params) => (req, res, next) => {
    req.query = extract(req.query, params);
    next();
}

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
