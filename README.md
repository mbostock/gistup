# Gistup

Create a gist from the command line! Then just use git to update it.

Installation:

```bash
npm install -g gistup
```

The first time you run gistup, you’ll be prompted to create a *personal access token*. You can revoke the token in the future from your GitHub [application settings](https://github.com/settings/applications).

Usage:

```bash
gistup
```

This will upload all files in the current directory to your new gist.

If you want to update your gist later, just use git:

```bash
edit index.html
git commit -m 'Made some awesome changes'.
git push
```

Gistup works with binary files, too!

Arguments:

* --description, m - provide an optional description
* --private, --no-public - make a secret gist
* --no-open - don’t open the created gist in your web browser when done
* --help - show some help
