# MultipageHtmlWebpackPlugin

This webpack plugin is a simple wrapper around [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) that allows you to genereate many pages from html partials included within one or more layouts.


You may find it useful when you want to focus on creating and share UI/UX elements or a quick frontend prototype withtout any SPA or routing framework considerations.

Webpack dev server will reload your work when you edit your assets as well as your html partials / layouts !

**DISCLAMER**: This is a very beta.

## Installation
`npm i multipage-html-webpack-plugin --save-dev`

## Get started

### 1) Create a layout, say `src/layout.html`
(you can change the path with the 'layout' option)
In order to get partial inclusions, be sure this line is present :

```<%= require(`html-loader!./${page}`) %>```

This may look a bit ugly at the first sight, but other attempts requiring fully parameterized / interpolated filename don't work very well.


### 2) Create html partials in a sub directory
One per page (e.g. pages/ page1.html page2.html)


### 3) Edit your `webpack.config.js`

Add Multpage instance(s) to the Webpack plugin list

```js
  const MultipageHtmlWebpackPlugin = require('multipage-html-webpack-plugin')

  module.exports = {
    // ...
    plugins: [
      new MultipageHtmlWebpackPlugin({
        pages: './src/pages/*.html', // How to find each page on the local filesystem
        // pages: ['page1.html', 'page2.html'] // filenames within pagesPath directory
  	// pages: [{ filename: 'page1.html'}, {filename: 'page2.html'}]
        pagesPath: 'pages/',         // Page partials directory, relative to the
                                     // layout, used both for partial inclusion
                                     // and document url location
        htmlWebpackPluginOptions: {  // Every HtmlWebpackPlugin options are optional
          meta: {                    // and available
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
          }
        }
      })
    ],
    // ...
  }

```

This will publish as many pages as there are in the filesystem src/pages directory (injecting main Webpack entry as the HtmlWebpackPlugin usually does).

Note that, in this exemple, you won't get an index file, add one by adding another instance of the plugin, where `pagePath` would be set to `''` (a blank string, see full example in this repository).

Every HtmlWebpackPlugin option is available. In this example, HtmlWebpackPlugin will inject the viewport meta tag in every page.


### 4) Run !
Start the Webpack dev server : `npm run start`

### 5) Share
Build the entire project under dist directory (Webpack default's) : `npm run build`

## Options and defaults
```
new MultipageHtmlWebpackPlugin({
      layout: './src/layout.html',    	// Optional
      pages: './src/*.html',		// Optional, how to find pages on the local filesystem, using glob patterns
                                      	// It can also take an array of string or
                                      	// an array of objects (with a filename key)
      pagesPath: 'pages/',            	// Optional
      htmlWebpackPluginOptions: {}    	// Optional
})
```

## Know issues, to do :
- Not even one test !
- Slash after pagesPath is  mandatory
- Pages have to be in the same or a sub directory of the layout
- When a hash is passed to `pages` option, the plugin should be able to set title or any page-specific options.
- You have to restart the dev server when you add or remove a layout / html partial from the filesystem. However, live reloading is working both on assets and html partials / layouts when you are editing them.
