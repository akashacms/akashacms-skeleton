
import akasha from 'akasharender';

const __dirname = import.meta.dirname;

const config = new akasha.Configuration();

import { ThemeBootstrapPlugin } from '@akashacms/theme-bootstrap';
import { BasePlugin } from '@akashacms/plugins-base';
import { BreadcrumbsPlugin } from '@akashacms/plugins-breadcrumbs';
import { BooknavPlugin } from '@akashacms/plugins-booknav';
import { EmbeddablesPlugin } from '@akashacms/plugins-embeddables';
import { TaggedContentPlugin } from '@akashacms/plugins-tagged-content';

// Fill this with the URL of your site
config.rootURL("https://skeleton.akashacms.com");

config
    .addAssetsDir('assets')
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
    .addLayoutsDir('layouts')
    .addDocumentsDir('documents')
    .addPartialsDir('partials');

config
    .use(ThemeBootstrapPlugin)
    .use(BasePlugin)
    .use(BreadcrumbsPlugin)
    .use(BooknavPlugin)
    .use(EmbeddablesPlugin)
    .use(TaggedContentPlugin);

config.plugin("@akashacms/plugins-base").generateSitemap(config, true);

// Add any stylesheets or JavaScript here
// The /vendor/jquery and /vendor/bootstrap files come from the corresponding
// modules under node_modules.  The last comes from the assets directory.
//
// If you wish to use LESS, you instead add css/style.css.less under
// the documents directory.  Remember that files in the assets directory
// are copied as-is, while files in the documents directory may be processed
// depending on the file extension.  The .css.less extension invokes the
// LESS compiler.
config
    .addFooterJavaScript({ href: "/vendor/jquery/jquery.min.js" })
    .addFooterJavaScript({ href: "/vendor/bootstrap/js/bootstrap.min.js"  })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap.min.css" })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap-theme.min.css" })
    .addStylesheet({       href: "/css/style.css" });

config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true,
    decodeEntities: true
});

config.plugin("@akashacms/plugins-tagged-content")
    .sortBy('title')
    .headerTemplate("---\ntitle: @title@\nlayout: tagpage.html.ejs\n---\n<p>Pages with tag @tagName@</p>")
    .tagsDirectory('/tags/');

config.prepare();

export default config;
