# iDempiere Documentation 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Github Editing

There are two ways to edit this site:
1. Through the github interface.
2. Through the source code.

Since most users cannot directly commit to the repository, you will need to perform a pull request to perform edits. This process is quite easy when editing pages directly from the github web interface. Below is a description of how the process works in github.

If you wish to download and modify the source code, you will need to fork, modify and create a pull request. This process is discussed below.

## Github Interface

You are welcome to perform basic edits using the htts://github.com web interface. Here is a quick summary:
- Navigate to any given page (example: https://idempiere.github.io/docs/introduction)
- Click on the 'edit this page' link at the bottom of the page.
- Since most users cannot directly commit to the repository, github will guide you through

## Source Code Installation

If you wish to make and test local edits, use the following instructions:

```
sudo apt update
sudo apt install git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm list-remote
nvm install v18.16.0
git clone https://github.com/idempiere/idempiere.github.io
cd idempiere.github.io/
npm install
npm install @giscus/react
npm run build
npm run serve
```

## Internationalization and Translation
The purpose of this section is to offer a cheatsheet for adding an new locale and translations. Here are the details:
- Start with the [docusaurus internationalization introduction and 3 sub-pages](https://docusaurus.io/docs/i18n/introduction).
- Quick notes:
  - Modify docusaurus.config.js to include your [desired locale](https://saimana.com/list-of-country-locale-code/) (example: locales: ['en', 'fr', 'fa'],)
  - Run the command to write the translation details
    - npm run write-translations -- --locale es
  -  Assuming you are manually translating your document (not using Crowdin), execute the mkdir/copy statements from here:
    -  https://docusaurus.io/docs/i18n/git
  -  Start translating...
  -  Note: copying over the files to be translated is essentially like forking the documentation. It is recommended that you wait until the English docs are near-complete before copying over the content to minimize syncing efforts for future edits.
