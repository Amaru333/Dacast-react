exports.isValidComponentName = function(str) {
    var numberContain = /\d/.test(str);
    var spaceContain = /\s/.test(str);
    return !spaceContain && !numberContain && str[0] === str[0].toUpperCase();
}