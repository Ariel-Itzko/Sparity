export const RENDER_BAD_REQUEST = (res, error) => {

    console.log(error);
    if (error.message) {
        res.status(400).json({
            message: error.message
        });
    }
    else {
        console.log('error ==> ', error);
        res.status(500).json({
            message: 'something went wrong, internal server error!'
        });
    }

};

export const CHECK_REQUIRED_PARAMS = (body, req_keys) => {
    let resp = {
        is_missing: false,
        missing_key: ''
    };

    for (let key of req_keys) {
        if (body[key] === undefined || body[key] === '') {
            resp.is_missing = true;
            resp.missing_key = key;
            break;
        }
    }

    return resp;
};
