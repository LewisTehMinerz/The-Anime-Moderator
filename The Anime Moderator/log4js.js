var name = "";
function getTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
}
var log = {
    info: function(str) {
        var time = getTime();
        console.log(`[${time}] [${name}/INFO] ${str}`);
    },
    warn: function(str) {
        var time = getTime();
        console.log(`[${time}] [${name}/WARN] ${str}`);
    },
    err: function(str) {
        var time = getTime();
        console.log(`[${time}] [${name}/ERR] ${str}`);
    }
}
function getRef(str) {
    name = str;
    return log;
}
module.exports = getRef;