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
    glob.sync(this.options.pages).map( (e) => {
      if(e == this.options.layout){
        return
      }
      const page = this.options.pagesPath + path.basename(e);
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
