# Gistup

Create a gist from the command line! Then just use git to update it.

## Installation

```bash
npm install -g gistup
```

The first time you run gistup, you’ll be prompted to create a GitHub *personal access token*. You can revoke the token in the future from your GitHub [application settings](https://github.com/settings/applications).

## Usage

```bash
gistup
```

This will upload all files in the current directory to your new gist. If you just want to create a gist from a single file, try this instead:

```bash
gistup index.html
```

If you any specify options, such as a private gist, you must separate files from options with a double-dash (--) like this:

```bash
gistup --private -- index.html
```

If you want to update your gist later, just use git:

```bash
edit index.html
git commit -m 'Made some awesome changes.'
git push
```

Gistup works with binary files, too!

Arguments:

* --description, m - provide an optional description
* --private, --no-public - make a secret gist
* --no-open - don’t open the created gist in your web browser when done
* --help - show some help

## Troubleshooting

If you see the following error:

```
Error: Command failed: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights and the repository exists.
```

You probably need to [generate your SSH keys](https://help.github.com/articles/generating-ssh-keys) for GitHub. These keys give you permission to git push to your repositories, including Gists.

If you’re unable to follow the first-time setup to create a personal access token, you can [create a new access token](https://github.com/settings/tokens/new) by hand. The only required permission is "gist". You can then create a .gistup.json file in your home directory, with the following contents:

```json
{
  "token": "0123456789012345678901234567890123456789"
}
```

Replace the numbers 0123456789… with your access token and save.
