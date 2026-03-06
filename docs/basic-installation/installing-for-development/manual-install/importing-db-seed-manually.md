---
sidebar_position: 4
---

# Importing DB Seed Manually

:::info
This procedure is intended for technical people wanting to configure iDempiere to run in Eclipse. There is an easier mechanism on the installers to create the database.
:::

Let's check the steps to create an iDempiere PostgreSQL database:

## Set a Password for the postgres User

```bash
sudo su - postgres
psql -U postgres -c "ALTER USER postgres PASSWORD 'TheSystemPassword'"
exit
```

:::warning
Of course, 'TheSystemPassword' is insecure. It is recommended that you set up a proper password for this user account. You need this password for the instructions below.
:::

## Run console-setup-alt.sh to Initialize Parameters

```bash
cd $HOME/sources/idempiere/org.idempiere.p2/target/products/org.adempiere.server.product/linux/gtk/x86_64
bash console-setup-alt.sh
```

- Answer all questions from this program. You can choose the database name, etc. Take care of the two passwords:
  - **Database Password [adempiere]:**
    - Answer with your desired password for the adempiere user
  - **Database System User Password []:**
    - Answer with the password you set in the previous step
- At the end, the program must have generated two files. Move them:

```bash
mv idempiere.properties .idpass $HOME/sources/idempiere
```

## Import the Database

```bash
cd $HOME/sources/idempiere
bash RUN_ImportIdempiereDev.sh
```

The last command must import the database and apply all the migration scripts.

---

:::note
See the Discussion tab for additional notes.
:::

*This How-To is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
