# Migration notes - iDempiere 12 (functional)

> Functional migration notes for upgrading to iDempiere 12.

## Promotions functionality moved from core to a plugin

With ticket [IDEMPIERE-2826](https://idempiere.atlassian.net/browse/IDEMPIERE-2826), the Promotions functionality was moved out of core into a plugin.

:::warning
If you use this functionality, you must install the plugin when migrating to release-12.
:::

See the "Plugin: Promotions" wiki page for plugin documentation.

## Theme

The default theme was changed from `breeze` to `iceblue_c`.

To reflect that, the `ZK_THEME` SysConfig has been forced to `iceblue_c`.

:::note
Once your customized theme is updated (as it will probably require some adaptation), you can update the SysConfig to use it.
:::
