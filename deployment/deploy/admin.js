exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    let isAdmin = !!request.headers.host.find(h => h.value.indexOf('admin.dacast.com') !== -1)
    if(isAdmin && (request.uri === '/' || request.uri.startsWith('/#!'))){
        request.uri = '/admin.html'
    }
    callback(null, request);
};