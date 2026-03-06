---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install Prerequisites

The examples on this guide are using the following versions:
- Ubuntu 22.04 64 bits
- PostgreSQL 14
- OpenJDK 17

:::note

In order to run iDempiere you need to have a JDK (not JRE) version of java

:::

:::info

iDempiere can also run with Oracle 12C and later, and also with PostgreSQL 11 and later, for this tutorial we use postgresql 14

:::

## Ubuntu

Please refer to http://www.ubuntu.com/download

Downloaded and installed Ubuntu Server 22.04 LTS

## PostgreSQL 14

### Install

Create the file repository configuration:
```shell
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
```

Import the repository signing key:
```shell
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
```

Update the package lists:
```shell
sudo apt-get update
```

Install the version 14 of PostgreSQL.
```shell
sudo apt-get -y install postgresql-14
```

:::note

In other versions of linux you need to additionally install the package postgresql-contrib corresponding to the version you are installing. In ubuntu is included by default, but in other cases is mandatory to install it, otherwise you'll get errors about the generate_uuid() function.
Also, instructions are different for other linux versions, in some you need to create and start the cluster, and also configure the service for auto-start. Please refer to the specific [PostgreSQL](https://www.postgresql.org/download/) instructions for such cases.

:::

### Assign a password to user postgres

In order to create the database the installer needs to know the password of user postgres, by default this user doesn't have a password in ubuntu (windows installer asks for a password).

Please take note of the password you assign here as it will be required in the setup process:

Steps are (replace your_chosen_password by your preferred):
```shell
echo "alter user postgres password 'your_chosen_password'" | sudo su postgres -c "psql -U postgres"
```

### Configure pg_hba.conf

After installing postgres you must check the correct configuration of pg_hba.conf

The following line requires change of the authentication method:

<Tabs>
  <TabItem value="ubuntu" label="Ubuntu">

```shell title="/etc/postgresql/14/main/pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
# highlight-next-line
local   all             all                                     peer
```

Change to:
```shell title="/etc/postgresql/14/main/pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
# highlight-next-line
local   all             all                                     scram-sha-256
```

  </TabItem>
  <TabItem value="windows" label="Windows">

```shell title="C:\Program Files\PostgreSQL\14\data\pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
# highlight-next-line
local   all             all                                     peer
```

Change to:
```shell title="C:\Program Files\PostgreSQL\14\data\pg_hba.conf"
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
# highlight-next-line
local   all             all                                     scram-sha-256
```

  </TabItem>
</Tabs>

:::note

Some guides suggest configuring trust instead of md5 - but that creates a security issue on your postgres server.

:::

And then reload the configuration:
```shell
sudo service postgresql reload
```

## OpenJDK

```shell
sudo apt-get update
```

```shell
sudo apt-get install openjdk-17-jdk-headless
```

:::note

openjdk-17-jdk-headless is for server without GUI, if you plan to use UI programs install openjdk-17-jdk instead. Also note that openjdk-17-jre is not sufficient because it doesn't have the jar command used in some scripts.

:::

:::note

You can install also openjdk > 17, we recommend to use a long term supported like 17.

:::

## Troubleshooting

### No postgres user

In the event that there's no 'postgres' role in your postgres db, you have to create on your own using the following steps:

Connect to your postgres db instance via psql.
```shell
psql
```

Create 'postgres' role
```sql
CREATE USER postgres
```

Alter the role and specify what the role suppose to be.
```sql
ALTER USER postgres SUPERUSER CREATEDB
```

### InvocationTargetException on CentOS

On a CentOS server with minimum version you can get error on home page (by render graph) java.lang.InternalError: java.lang.reflect.InvocationTargetException

Suggested solution:
```shell
sudo apt install fontconfig
```

```shell
sudo yum install fontconfig
```

### Windows

Most installation problems in Windows are caused by not configured environment variables:
- PATH must be configured to make the commands psql and jar accessible
- JAVA_HOME environment variable must be configured
