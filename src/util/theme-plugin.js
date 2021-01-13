const path = require('path');
const fs = require('fs');
const util = require('util');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DOMParser, XMLSerializer } = require('xmldom');

const name = 'ThemePlugin';
const expr = /([\w-_]*).js$/;

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

module.exports = class ThemePlugin {
    constructor(directory) {
        this.source = '';
        fs.readdirSync(directory).forEach((file) => {
            const theme = require(path.join(directory, file));
            const props = Object.entries(theme)
                .map((color) => {
                    return `    --${color[0]
                        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                        .toLowerCase()}: ${hexToRgb(color[1])}`;
                })
                .join(';\n');

            this.source += `[theme=${file.match(expr)[1]}] {\n${props}\n}\n`;
        });
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(name, (compilation) => {
            compilation.emitAsset('themes.css', new webpack.sources.RawSource(this.source));
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(name, (data, cb) => {
                const dom = new DOMParser().parseFromString(data.html, 'text/html');
                const head = dom.getElementsByTagName('head')[0] || document.createElement('head');
                const link = dom.createElement('link');
                link.setAttribute('href', path.posix.join(compiler.options.output.publicPath, '/themes.css'));
                link.setAttribute('rel', 'stylesheet');
                head.appendChild(link);
                data.html = new XMLSerializer().serializeToString(dom, true);
                cb(null, data);
            });
        });
    }
};
