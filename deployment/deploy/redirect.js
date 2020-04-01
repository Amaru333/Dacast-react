exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const response = event.Records[0].cf.response;
    console.log('request', JSON.stringify(request))
    console.log('response', JSON.stringify(response))
    if(response.status == '200'){
        return callback(null, response);
    }
    let redirectTo = '/#!' + request.uri
    response.status = '302'
    response.statusDescription = 'Found'
    response.body = ''
    response.headers['location'] = [{ key: 'Location', value: redirectTo }];
    console.log('returning response', JSON.stringify(response))
    callback(null, response);
};