exports.single = function(string) {
  return "'" + string.replace(/'/g, "'\\''") + "'";
};

exports.double = function(string) {
  return '"' + string.replace(/(["\s'$`\\])/g, "\\$1") + '"';
};
