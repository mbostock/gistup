var https = require("https");

module.exports = function(method, url, token, message, callback) {
  var json = JSON.stringify(message);

  var request = https.request({
    hostname: "api.github.com",
    port: 443,
    path: url,
    method: method,
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": "token " + token,
      "User-Agent": "mbostock/gistup",
      "Content-Type": "application/json;charset=utf8",
      "Content-Length": Buffer.byteLength(json, "utf8")
    }
  }, function(response) {
    var chunks = [];
    response.setEncoding("utf8");
    response.on("data", function(chunk) { chunks.push(chunk); });
    response.on("end", function() {
      var response, id = null, error;
      try { response = JSON.parse(chunks.join("")); }
      catch (e) { error = e; }
      if (!error && !response) error = new Error("empty API response");
      if (error) console.warn(os.EOL + chunks.join(""));
      callback(error, response);
    });
  });

  request.on("error", callback);
  request.write(json);
  request.end();
}
