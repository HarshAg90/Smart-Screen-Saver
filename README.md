# Tooth-paste

## Hosted at

## [Tooth Brush reminder](https://harshag90.github.io/toothBrush-reminder/)

tho GitHub commit feature may still not be visible since auth token can't be in this repo

## About

`Clock screen` with `Github Actions report` of the past week, to keep track of every day commits and remind you if you didn't commit today, with a red alert

## To Come

- Daily Todo
- permanent Todo

## Too Far Fetched Goals

- add a JS function to somehow view history and add a popup to `JUMP IN` to the last tabs
  __[For Browser Home site only]__

## 💻 Languages and Things in use

- Javascript
- GitHub GraphQL API
- HTML
- CSS

`No framework in use`

## ⏬ Setup

1. __github access will require a token, here's how to get them__
[Access token setup](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token "docs.github")
1. *Make a folder* in the `root` directory of a project named `storage`,

   ```bash
    mkdir storage
   ```

    If it already exists,

1. Run

   ```bash
    cd storage
    touch access_key.json
   ```

    this will create a credentials file

1. open the `access_key.json` file add paste the following code

   ```JSON
    {
        "key": "ADD_YOUR_PRIVATE_ACCESS_KEY/TOKEN_HERE",
        "username":"ADD_USERNAME_HERE"
    }
   ```

1. Save it and run `index.html`

⛔ report in the description if it’s not working, or reach out to me
