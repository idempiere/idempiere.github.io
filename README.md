# iDempiere Documentation

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Contributing to Documentation

There are several ways to edit this site:

1. Through the GitHub interface.
2. Through local source code.
3. Through an online service like StackBlitz.

Since most users cannot directly commit to the repository, you will need to open a pull request for your edits.

GitHub Pages does not allow direct editing from rendered site pages.
This process is easy when editing from the GitHub web interface. Below is how it works in GitHub.

If you wish to download and modify the source code, you will need to fork the repository, make your changes, and create a pull request. This process is discussed below.

## GitHub Interface

You are welcome to perform basic edits by following the steps outlined below:

1. Navigate to the documentation home page: https://github.com/idempiere/idempiere.github.io

2. Click the edit button shown in the image below:
<img width="1294" height="330" alt="image" src="https://github.com/user-attachments/assets/1e9e1907-bcdb-4f50-8fa8-b4a47dccde63" />

3. This button creates a fork of the repository linked to your personal GitHub account, and opens the file you indicated you wish to edit.
Add the edits you wish to make to the documentation, and click on the green "Commit changes..." button as shown in the image below:
<img width="1898" height="687" alt="image" src="https://github.com/user-attachments/assets/e3cd544a-b7ba-4b5e-b361-4ca846d51a38" />

4. Copilot will generate a commit message for your edits. Click "Proceed" to accept the edits, and commit them to your forked repository:
<img width="815" height="763" alt="image" src="https://github.com/user-attachments/assets/660740d4-2001-4489-9844-1f7f3b44fa61" />

5. GitHub will display all the changes you have committed. Confirm the changes you are proposing, and click "Create Pull Request".
Provide a name for the pull request, and write down a summary of the pull request and click "Create Pull Request".
<img width="1828" height="451" alt="image" src="https://github.com/user-attachments/assets/c4ba1f97-9349-4676-a4cd-1869460b99c0" />


## Source Code Locally

If you wish to make and test local edits, use the following instructions:

```shell
# setup workspace, just do one time
sudo apt update
sudo apt install git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm list-remote
# If you already manage Node on your machine, you can skip these nvm commands.
nvm install --lts
nvm use --lts
git clone https://github.com/idempiere/idempiere.github.io
cd idempiere.github.io/
npm install
npm start #builds and launches the site locally
```

Want to edit documents on "idempiere.github.io/docs" and see your changes instantly in the browser? Here's how:

1. Run `npm start`.
2. Open the document in your preferred text editor, then edit and save it.

Now, any edits you make will be automatically reflected live in the browser (without needing to press F5).

## Online Service Like StackBlitz

1. To get started, open [StackBlitz](https://stackblitz.com/) and sign in using your GitHub account
2. Visit **repositories** and select 'idempiere.github.io'
   ![stackblitz-loadGithubRespository](static/readme/stackblitz-loadGithubRespository.png)
3. StackBlitz offers a cloud-based Node.js development environment with a Visual Studio Code interface. This allows you to write and run Node.js without installing anything locally (it runs in the browser through [WebContainers](https://blog.stackblitz.com/posts/introducing-webcontainers/)).
4. This feature allows for simultaneous document editing and live preview updates. You can even open the live preview in a separate browser tab
   ![](static/readme/stackblitz-editor.png)
5. The tool also allows you to perform Git operations
   ![](static/readme/stackblitz-githubAction.png)

## Internationalization and Translation

The purpose of this section is to offer a cheatsheet for adding a new locale and translations. Here are the details:

- Start with the [Docusaurus internationalization introduction and 3 sub-pages](https://docusaurus.io/docs/i18n/introduction).
- Quick notes:
   - Modify docusaurus.config.js to include your [desired locale](https://saimana.com/list-of-country-locale-code/) (example: locales: ['en', 'fr', 'fa'],)
  - Run the command to write the translation details
    - npm run write-translations -- --locale es
  - Assuming you are manually translating your document (not using Crowdin), execute the mkdir/copy statements from here:
  - https://docusaurus.io/docs/i18n/git
  - Start translating...
  - Note: copying over the files to be translated is essentially like forking the documentation. It is recommended that you wait until the English docs are near-complete before copying over the content to minimize syncing efforts for future edits.

