---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installing from Installers

## Create user

It is recommended to run the iDempiere server as a user created for such purpose, usually idempiere, instead of running as root.

```shell
adduser idempiere
```

:::caution

DO NOT install idempiere as root.

:::

## Install Server

Unzip the server installer you downloaded or created

```shell
jar xvf idempiereServer10Daily.gtk.linux.x86_64.zip
```

Move the folder to /opt

```shell
mv idempiere.gtk.linux.x86_64/idempiere-server /opt
```

```shell
rmdir idempiere.gtk.linux.x86_64
```

```shell
chown -R idempiere:idempiere /opt/idempiere-server
```

From now on is preferable that you run everything as idempiere user:

```shell
su - idempiere  # not necessary if you're already as user idempiere
```

```shell
cd /opt/idempiere-server
```

<Tabs>
  <TabItem value="graphical" label="Graphical">

You can run:

```shell
sh setup.sh
```
or

```shell
sh setup-alt.sh
```

:::note

Optionally you can add a LOG LEVEL parameter (accepted values are: OFF, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST, ALL). For example `sh setup-alt.sh FINE`

:::

You can fill the parameters as shown in the screenshot, or with your own preferred values, specially you must take care of the following:

- iDempiere Home: This is the repository folder
- Web Port / SSL: be careful to not use a port that is already used by another application, in linux ports below 1000 cannot be used by non-root users. For example port 8080 is used by Oracle-XE
- DB Already Exists: in common installation you must leave this flag unchecked as the database will be created later
- Database Name: here we fill with the name of the database you want to create
- DB Admin Password: must be filled with the postgres password you set up in the [prerequisites](./install-prerequisites.md#assign-a-password-to-user-postgres)
- Database User: this is a user to be created, it is recommended you keep it as the default adempiere
- Database Password: fill here with the password you want to assign to the database

![iDempiere Server Setup](/img/docs/basic-installation/manual-install/Screenshot-iDempiere_Server_Setup.png)

And finally push the Save button, if something fails the Save button will be disabled and the failing option is marked in red, in order to re-enable the Save button you must push the Test button until all errors are gone.

The only *valid error* in red is in front of Database Password field when the database is still not created.

### Differences for Oracle

On oracle some fields must be filled slightly different:

- Database Name: here you must fill the name of the oracle instance (usually xe or orcl)
- DB Admin Password: must be filled with the SYSTEM password you set when installing oracle
- Database User: in oracle you can define your preferred user here
- Database Password: fill here with the password you want to assign to the database


  </TabItem>
  <TabItem value="console" label="Console">

Run

```shell
sh console-setup-alt.sh
```

or

```shell
sh console-setup.sh
```

:::note

Optionally you can add a LOG LEVEL parameter (accepted values are: OFF, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST, ALL). For example `sh console-setup-alt.sh FINE`

:::

This is to be used when you don't have a graphical environment, in this case the parameters are shown in screen and you must fill them directly with the keyboard.

  </TabItem>
  <TabItem value="console-silent" label="Console Silent">

There is another non-graphical non-interactive way to run the setup.

You need to have a previous `idempiereEnv.properties` file that you copied from another server, or you filled manually copying and replacing from the `idempiereEnvTemplate.properties`

After you have a valid idempiereEnv.properties you can execute:

```shell
sh silentsetup-alt.sh
```
or

```shell
sh silent-setup.sh
```

:::note

Optionally you can add a LOG LEVEL parameter (accepted values are: OFF, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST, ALL). For example `sh silent-setup-alt.sh FINE`

:::

This is to be used when you don't have a graphical environment, and is non-interactive, the program read all the values from the file idempiereEnv.properties and configure the system with that.

  </TabItem>
</Tabs>

## Import the Database

This is the default way to import the database for oracle (>=12c) and postgresql (>=10):

After setting up the server (is a prerequisite) you can run:

```shell
su - idempiere  # not necessary if you're already as user idempiere
```

```shell
cd /opt/idempiere-server/utils
```

```shell
sh RUN_ImportIdempiere.sh
```

**Note: In order for the above import script to work, you need to make sure that you have the jar and psql or Oracle executables on your path.**

**Important Note for Oracle: In order to import the seed database it is required to create a directory object pointing to `data/seed`, for this to work properly the dba group needs access to this folder. The script `utisl/oracle/ImportIdempiere.sh` gives this access using `chgrp dba`, this doesn't work unless the idempiere user is member of the dba group, so this instruction is required as a prerequisite for oracle:
`usermod -G dba idempiere`
and the `IDEMPIERE_HOME` folder must be accessible by this group otherwise you'll find errors trying to import**

## Update the Database

In order to keep the database synchronized with the code it is required to run the following script:

```shell
su - idempiere  # not necessary if you're already as user idempiere
```

```shell
cd /opt/idempiere-server/utils
```

```shell
sh RUN_SyncDB.sh
```

## Register version code in database

In order to sign the database with the version code running on the server it is advised (or required depending on configuration) to run the following script:

```shell
su - idempiere  # not necessary if you're already as user idempiere
```

```shell
cd /opt/idempiere-server
```

```shell
sh sign-database-build-alt.sh
```