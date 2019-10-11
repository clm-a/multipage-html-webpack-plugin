// From a Webpack default configuration, only highlighting what matters here

const MultipageHtmlWebpackPlugin = require('multipage-html-webpack-plugin')

module.exports = {

	entry: './src/index.js', 						// All entries will be added to pages
																			// as it's done by HtmlWebpackPlugin
																			// by default
	// .....
	plugins: [
    // .....
    new MultipageHtmlWebpackPlugin(), // * Defaults serves src/index.html within
                                      //   src/layout.html
    new MultipageHtmlWebpackPlugin({
      pages: './src/pages/*.html',		// * How to find pages on the local filesystem
			// pages: ['page1.html', 'page2.html']
			// pages: [{ filename: 'page1.html'}, {filename: 'page2.html'}]
      pagesPath: 'pages/',            // * Page partials directory, relative to the
      																//   layout, used both for partial inclusion
  		  															//   and document url location
			htmlWebpackPluginOptions: {     // * Pass any option to HtmlWebpackPlugin
				meta: {
					viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
				}
			}
		})
  ],
  // .....
};
