exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;

    let code = parseInt(response.status)
    if(isNaN(code)){
        return callback(null, response);
    }
    if(code >= 200 && code < 400){
        return callback(null, response);
    }
    let redirectTo = '/#!' + request.uri + '?' + request.querystring
    response.status = '302'
    response.statusDescription = 'Found'
    response.body = ''
    response.headers['location'] = [{ key: 'Location', value: redirectTo }];
    callback(null, response);
};