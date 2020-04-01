exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    let isAdmin = !!request.headers.host.find(h => h.value.indexOf('admin.dacast.com') !== -1)
    console.log('request:', JSON.stringify(request))
    console.log('isAdmin', isAdmin)
    if(isAdmin && (request.uri === '/' || request.uri.startsWith('/#!'))){
        console.log('redirecting to /admin.html')
        request.uri = '/admin.html'
    }
    callback(null, request);
};