---
sidebar_position: 4
---

# Running iDempiere from Installers

## Manual running

Once installed and configured the iDempiere server you can start it with:

```shell
su - idempiere  # not necessary if you're already as user idempiere
```

```shell
cd /opt/idempiere-server
```

```shell
sh idempiere-server.sh
```

## Installing as service

iDempiere can be registered as a service in linux, in order to do that you can copy the provided scripts to `/etc/init.d` folder like this:

```shell
sudo su -    # this must be executed as root
```

```shell
cp /opt/idempiere-server/utils/unix/idempiere_Debian.sh /etc/init.d/idempiere
```

```shell
systemctl daemon-reload
```

```shell
update-rc.d idempiere defaults
```

After iDempiere is registered as a service, it will be started automatically on server reboots, also it can be started / stopped / restarted / checked as usual with:

```shell
systemctl status idempiere     # to check the status of the app
systemctl restart idempiere    # to restart the iDempiere app
systemctl stop idempiere       # to stop the iDempiere app
systemctl start idempiere      # to start the iDempiere app when stopped
```

Note the above instructions are specific for Ubuntu or Debian, in folder `/opt/idempiere-server/utils/unix` there are also scripts for RedHat and Suse, but installation on those system can be a bit different.

## Troubleshooting

### Error when running idempiere-server.sh on mac os

If you try to run the script and encounter the following error: 

```
===================================
Starting iDempiere Server
===================================
readlink: illegal option -- f
usage: readlink [-n] [file ...]
usage: dirname path
Error: Unable to access jarfile /plugins/org.eclipse.equinox.launcher_1.*.jar
```

You have to get coreutils package which contains the GNU command line tools. If you have package manager such as brew, you can get the coreutils via it.

After that, add the bin to the path of your terminal (bash or zsh or etc).

```shell
export PATH="/usr/local/opt/coreutils/libexec/gnubin:$PATH"
```