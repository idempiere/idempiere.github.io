---
sidebar_label: Changing the Database
sidebar_position: 9
description: Reserve official IDs and generate migration scripts when your iDempiere core contribution changes the Application Dictionary or the database.
---
# Changing the Database

Read this page before you write code if your core contribution adds or changes Application Dictionary records (tables, columns, windows, messages and so on) or the database schema. It explains how to get official IDs from the central ID server and how iDempiere records your changes as migration scripts for your pull request.

Plug-in changes do not need official IDs. Ship them with [2Pack](/docs/basic-development/2pack/packin-packout-guide) or with migration scripts in the plug-in instead.

## TL;DR

1. Ask for a user name and password for the central ID server in the [forum](https://www.idempiere.org/forums) or on [Mattermost](https://mattermost.idempiere.org/idempiere/channels/support).
2. Set the `DICTIONARY_ID_*` keys in the System Configurator. See [Configure the ID server](./centralized-ids.md#configure-the-id-server).
3. Log in as System Administrator. In **Preference**, turn on **Dictionary Maintenance** and **Log Migration Scripts**, and enter a **Migration Script Comment** with the ticket number. Turn both options on again after every login, because they are not saved.
4. Create or change the dictionary records. New records get IDs below 1,000,000 from the central ID server.
5. Review the generated migration script, remove failed or unrelated statements, and commit it with your code.

## Pages in this section

- [Request centralized IDs](./centralized-ids.md): get official IDs from the central ID server, check the setup, look up and reserve IDs.
- [Generating Migration Scripts](./migration-scripts.md): record your dictionary changes as SQL scripts and review them.
- [Run a project ID server](./project-id-server.md): share IDs across a plug-in team with separate development databases.
