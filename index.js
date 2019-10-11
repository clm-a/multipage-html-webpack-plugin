const HtmlWebpackPlugin = require('html-webpack-plugin')

const glob = require("glob")
const path = require("path")
const fs = require("fs")

module.exports = class MultipageHtmlWebpackPlugin{
  constructor(userOptions = {}){
    const defaultOptions = {
      layout: './src/layout.html',
      pages: './src/*.html',
      pagesPath: '',
      htmlWebpackPluginOptions: {}
    };
    this.options = Object.assign(defaultOptions, userOptions);
  }
  apply(compiler){
    let files = null;
    switch(typeof this.options.pages){
      case "string":
        files = glob.sync(this.options.pages)
        break;
      case "object":
        if(Array.isArray(this.options.pages))
          files = this.options.pages
        else{
          console.log("Unsupported 'pages' options")
          process.exit(0)
        }
      break;
      default:
        console.log("Unsupported 'pages' options")
        process.exit(0)
    }


    files.map( (e) => {
      if(e == this.options.layout)
        return
      let filename = typeof e == 'object' ? e.filename : path.basename(e)

      const page = this.options.pagesPath + filename;
      console.log("MultipageHtmlWebpackPlugin preparing "+page)
      const htmlWebpackPluginOptionsForPage = {
        templateParameters: {
          'page': page
        },
        filename: page,
        template: this.options.layout
      }
      const adequateHtmlWebpackPluginOptions = Object.assign(
          this.options.htmlWebpackPluginOptions,
          htmlWebpackPluginOptionsForPage )

      new HtmlWebpackPlugin(adequateHtmlWebpackPluginOptions).apply(compiler)
    })
  }
}
