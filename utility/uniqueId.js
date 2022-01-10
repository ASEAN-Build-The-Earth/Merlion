const newuid = function() { // unique id generators
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};  

module.exports.newuid = newuid;