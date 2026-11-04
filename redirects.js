// Old URLs that moved, for @docusaurus/plugin-client-redirects.
// Each entry keeps an old link working after a page or category was renamed.
// Add an entry whenever you rename or move a page.

/** @type {{from: string, to: string}[]} */
module.exports = [
  // Page paths with spaces, "&", capitals, "_" or typos.
  {from: '/docs/Widgets & Quick Info/how-to-cotribute', to: '/docs/widgets-quick-info/how-to-contribute'},
  {from: '/docs/Widgets & Quick Info/quick-info-2packs', to: '/docs/widgets-quick-info/quick-info-2packs'},
  {from: '/docs/basic-functional/business_partner', to: '/docs/basic-functional/business-partner'},
  {from: '/docs/basic-functional/menue_overview', to: '/docs/basic-functional/menu-overview'},
  {from: '/docs/basic-functional/window_handling', to: '/docs/basic-functional/window-handling'},
  {from: '/docs/new-features/in-development/Report-Source-for-Report-Column', to: '/docs/new-features/in-development/report-source-for-report-column'},
  {from: '/docs/new-features/v14/BPartner-Account-Column-in-Statement-of-Account', to: '/docs/new-features/v14/bpartner-account-column-in-statement-of-account'},

  // Pages moved into the OSGi folder of the plug-in guides.
  {from: '/docs/basic-development/plugin-development/plugin-development-background', to: '/docs/basic-development/plugin-development/osgi/osgi-background'},

  // Duplicate pages merged into one.
  {from: '/docs/new-features/v12/copy-or-move-tenant', to: '/docs/new-features/v6.2/copy-or-move-tenant'},

  // Category pages moved from /docs/category/<label> to their folder path.
  // v1.0 and v10 both had the label slug "v10", so some got -1, -2, -3.
  {from: '/docs/category/basic-installation', to: '/docs/basic-installation'},
  {from: '/docs/category/installing-for-execution', to: '/docs/basic-installation/installing-for-execution'},
  {from: '/docs/category/installing-for-development', to: '/docs/basic-installation/installing-for-development'},
  {from: '/docs/category/manual-install', to: '/docs/basic-installation/installing-for-development/manual-install'},
  {from: '/docs/category/basic-development', to: '/docs/basic-development'},
  {from: '/docs/category/contributing-to-core', to: '/docs/basic-development/contributing-to-core'},
  {from: '/docs/category/developing-plug-ins', to: '/docs/basic-development/plugin-development'},
  {from: '/docs/category/new-features', to: '/docs/new-features'},
  {from: '/docs/category/in-development', to: '/docs/new-features/in-development'},
  {from: '/docs/category/v14', to: '/docs/new-features/v14'},
  {from: '/docs/category/v13', to: '/docs/new-features/v13'},
  {from: '/docs/category/v12', to: '/docs/new-features/v12'},
  {from: '/docs/category/v11', to: '/docs/new-features/v11'},
  {from: '/docs/category/v10', to: '/docs/new-features/v10'},
  {from: '/docs/category/v9', to: '/docs/new-features/v9'},
  {from: '/docs/category/v82', to: '/docs/new-features/v8-2'},
  {from: '/docs/category/v71', to: '/docs/new-features/v7-1'},
  {from: '/docs/category/v62', to: '/docs/new-features/v6-2'},
  {from: '/docs/category/v51', to: '/docs/new-features/v5-1'},
  {from: '/docs/category/v41', to: '/docs/new-features/v4-1'},
  {from: '/docs/category/v30', to: '/docs/new-features/v3-0'},
  {from: '/docs/category/v21', to: '/docs/new-features/v2-1'},
  {from: '/docs/category/v20', to: '/docs/new-features/v2-0'},
  {from: '/docs/category/v10-1', to: '/docs/new-features/v1-0'},
  {from: '/docs/category/release-changelogs', to: '/docs/release-changelogs'},
  {from: '/docs/category/migration-notes', to: '/docs/migration-notes'},
  {from: '/docs/category/v14-1', to: '/docs/migration-notes/v14'},
  {from: '/docs/category/v13-1', to: '/docs/migration-notes/v13'},
  {from: '/docs/category/v12-1', to: '/docs/migration-notes/v12'},
  {from: '/docs/category/v11-1', to: '/docs/migration-notes/v11'},
  {from: '/docs/category/v10-2', to: '/docs/migration-notes/v10'},
  {from: '/docs/category/v9-1', to: '/docs/migration-notes/v9'},
  {from: '/docs/category/v82-1', to: '/docs/migration-notes/v8-2'},
  {from: '/docs/category/v71-1', to: '/docs/migration-notes/v7-1'},
  {from: '/docs/category/v31', to: '/docs/migration-notes/v3-1'},
  {from: '/docs/category/legacy-adempiere-migration', to: '/docs/migration-notes/legacy-adempiere'},
  {from: '/docs/category/v10-3', to: '/docs/migration-notes/v1-0'},
  {from: '/docs/category/available-plugins', to: '/docs/available-plugins'},
  {from: '/docs/category/widgets--quick-info', to: '/docs/widgets-quick-info'},
  {from: '/docs/category/basic-functional', to: '/docs/basic-functional'},
];
