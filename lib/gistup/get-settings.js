var fs = require("fs"),
    path = require("path"),
    child = require("child_process"),
    readline = require("readline");

var open = process.platform === "linux" ? "xdg-open" : "open";

module.exports = function(callback) {
  var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
      settingsPath = path.join(home, ".gistup.json"),
      settings;

  fs.readFile(settingsPath, "utf8", function(error, settings) {
    if (!error) {
      try {
        settings = JSON.parse(settings);
      } catch (e) {
        error = e;
      }
    }

    if (error) {
      console.log("Welcome to GISTUP!");
      console.log("");
      console.log("Since this is your first time using gistup, we need to create a");
      console.log("GitHub \033[93mpersonal access token\033[0m to grant gistup permission to create");
      console.log("gists on your behalf. You’ll only have to do this once, and you");
      console.log("can easily revoke this token in the future if desired.");
      console.log("");
      console.log("When you press any key to continue, your web browser will open.");
      console.log("Please login (if needed) and fill out the resulting form to create");
      console.log("an access token. When you’re done, copy the access token to the");
      console.log("clipboard and paste it back into the terminal.");
      console.log("");
      process.stdout.write("Press any key to open GitHub… ");

      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.once("data", function() {
        child.exec(open + " 'https://github.com/settings/tokens/new?scopes=gist'", function(error) {
          if (error) {
            console.log("");
            console.log("Oops, unable to open your web browser! Please visit this URL:");
            console.log("");
            console.log("https://github.com/settings/tokens/new?scopes=gist");
            console.log("");
          }

          var readin = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });

          readin.question("Enter personal access token: ", function(token) {
            readin.close();
            token = token.trim().toLowerCase();
            if (!/^[0-9a-f]{40}$/.test(token)) return void callback(new UserError("The access token \"" + token + "\" is invalid." + os.EOL + os.EOL + "Did you copy and paste the access token correctly? It should be a" + os.EOL + "forty-character hexadecimal string. Please fix and try again."));
            settings = {token: token, open: error ? null : open};
            fs.writeFile(settingsPath, JSON.stringify(settings, null, 2), {mode: parseInt("0600", 8)}, function(error) {
              callback(error, error ? null : settings);
            });
          });
        });
      });

      return;
    }

    if (!("open" in settings)) settings.open = open;
    callback(null, settings);
  });
};
