module.exports = function UserError(message) {
  var error = new Error(message);
  error.type = UserError;
  return error;
};
