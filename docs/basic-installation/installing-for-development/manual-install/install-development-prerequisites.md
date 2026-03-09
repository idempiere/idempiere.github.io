---
sidebar_position: 1
---

# Install Development Prerequisites

These prerequisites apply both for release 13 and for development.

The examples on this guide are using the following versions:

- **Ubuntu 24.04** 64 bits
- **PostgreSQL 17** (used for this guide, you can use any postgres >=14)
- **git Client**
- **OpenJDK 17**
- **Eclipse IDE for Enterprise Java Developers 2025-12** (older versions are also supported)

:::info Other Operating Systems

This guide can be used in other systems (even Windows) taking care of installing the corresponding packages and using corresponding commands. However, for Windows it is easier to follow [these video How-To](https://www.youtube.com/playlist?list=PL-yzcOCOKCBN6k6z2aHetk91yYAxQZmZ-) - just take care of using the requisites versions mentioned here as the video is for an older version but still applicable.

:::

:::tip Git on Windows

Installing git on Windows installs a git bash command which is capable of executing all the scripts same as in Linux.

:::

## Install Ubuntu

Please refer to [http://www.ubuntu.com/download](http://www.ubuntu.com/download)

## Install PostgreSQL 17

:::note Database Compatibility

iDempiere can also run with Oracle 23ai and later, and also with any PostgreSQL >= 14. For this How-To we use PostgreSQL 17.

See [PostgreSQL Downloads for Ubuntu](http://www.postgresql.org/download/linux/ubuntu/) for details.

:::

```bash
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
. /etc/os-release
sudo sh -c "echo 'deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $VERSION_CODENAME-pgdg main' > /etc/apt/sources.list.d/pgdg.list"
sudo apt update
sudo apt-get install postgresql-17
```

### Configure pg_hba.conf

After installing postgres you must check the correct configuration of `/etc/postgresql/17/main/pg_hba.conf`

The following line requires change of the authentication method:

```
local   all             all                                     peer
```

Change to:

```
local   all             all                                     scram-sha-256
```

:::warning Security Note

Some guides suggest configuring `trust` instead of `scram-sha-256` - but that creates a security issue on your postgres.

:::

And then reload the configuration:

```bash
sudo service postgresql reload
```

## Install git Client

```bash
sudo apt-get install git
```

## Install OpenJDK 17

```bash
sudo apt-get install openjdk-17-jdk
```

## Install Eclipse

Download the corresponding version for your operating system from [Eclipse IDE for Enterprise Java and Web Developers](https://www.eclipse.org/downloads/packages/release/2025-12/r/eclipse-ide-enterprise-java-and-web-developers). On this example we are installing the version 2025-12.

On Ubuntu, you just uncompress it and it is ready for use. You could move the folder somewhere sensible, but this is optional. For the purposes of this How-To, let's suppose you uncompressed Eclipse in a folder pointed with the variable `$ECLIPSE_HOME`.

The first time you run Eclipse it will ask you for the workspace folder. You can use the default workspace because you will change it later.

Now you have your prerequisites ready to receive the iDempiere sources, eclipse can be restarted now.

---

*This How-To is brought to you by Carlos Ruiz from [BX Service GmbH](https://www.bx-service.com/). Feel free to improve directly or suggest using the Discussion tab.*
