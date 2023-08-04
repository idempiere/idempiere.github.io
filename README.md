# iDempiere Documentation 

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Github Editing

You are welcome to perform basic edits using the htts://github.com web interface.

### Installation

If you wish to make and test local edits, the following instructions

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
