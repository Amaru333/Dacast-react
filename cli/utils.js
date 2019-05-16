exports.isValidComponentName = function(str) {
    var numberContain = /\d/.test(str);
    return !numberContain && str[0] === str[0].toUpperCase();
}