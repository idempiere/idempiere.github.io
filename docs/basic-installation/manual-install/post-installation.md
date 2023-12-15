---
sidebar_position: 5
---

# Post Installation

Now that you have your server configured, it is recommended to follow some security measures.

These are probably not that important if your server is not open to the internet, or if it's a demo/test server. But, if you server contains production data you are warned that iDempiere default configuration is too open and is a MUST to secure it.

## Recommended minimal steps

- When coming from an old version take a look to the [Migration Notes](https://wiki.idempiere.org/en/Migration_Notes)
- Install an http server to be used a proxy for iDempiere - most used are nginx or apache. See [Proxy iDempiere Through Nginx](https://wiki.idempiere.org/en/Proxy_iDempiere_Through_Nginx)
    - Configure your proxy to publish just /webui - iDempiere by default has several other services published, and some publishing security-sensitive information (like DB password)
    - if you plan to use webservices externally you must publish also /ADInterface
    - if you plan to use REST webservices externally you would need to publish also /api/v1, however, in this case is recommended to use an API gateway, like the [example provided with Krakend](https://wiki.idempiere.org/en/Proxy_iDempiere-Rest_Through_KrakenD)
- Close ports on your server using a firewall, it's recommended to open just port https/443, and maybe in a protected way the other ports you may need for administration (i.e. ssh/22)
- Another usual option is to install your server behind a VPN
- [Change the default passwords](https://wiki.idempiere.org/en/Reset_Password_(Form_ID-200001)) for the 5 default users (SuperUser / System / GardenAdmin / GardenUser / WebService)
- [Enable hashed passwords](https://wiki.idempiere.org/en/Convert_passwords_to_hashes_(Process_ID-53259))
- See more recommendation in [Securing iDempiere](https://wiki.idempiere.org/en/Securing_iDempiere#initial_steps)

## Keeping up to date

Most of the time you can keep your iDempiere up to date with three simple instructions.

Please take a backup of iDempiere installation folder before starting, this is useful in case the update process find problems to avoid a full reinstall.

It's also important to take a backup of the database. The RUN_SyncDB process at the end cannot be rolled back.

```shell
# stop the server
cd $IDEMPIERE_HOME   # change to the folder where your iDempiere is installed, usually recommended /opt/idempiere-server
bash update.sh https://jenkins.idempiere.org/job/iDempiere11/ws/org.idempiere.p2/target/repository/
# this URL is for 11 - if you want to keep up to date with master (a.k.a 12 Development Build) then use:
# bash update.sh https://jenkins.idempiere.org/job/iDempiere/ws/org.idempiere.p2/target/repository/
bash sign-database-build-alt.sh
cd utils
bash RUN_SyncDB.sh
# in case of errors, fix the error and execute RUN_SyncDB.sh again until no errors are shown
# at the end start again the server
```

## Font for centos minimal instance

When you run server on a minimal centos instance (like on gcloud) text on your chart or "Performance Measurement Setup" workflow can be break reason by it's generated on server and convert to image to display, and server miss almost font. you can install some font to resolved it

```shell
sudo yum -y install liberation-serif-fonts liberation-sans-fonts liberation-fonts liberation-fonts-common liberation-narrow-fonts liberation-mono-fonts dejavu-lgc-serif-fonts dejavu-serif-fonts dejavu-fonts-common dejavu-lgc-sans-mono-fonts dejavu-sans-fonts dejavu-sans-mono-fonts gnu-free-fonts-common gnu-free-serif-fonts gnu-free-sans-fonts gnu-free-serif-fonts
```