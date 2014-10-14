## Pasteall (for node.js)

A little interface to [pasteall.org](http://www.pasteall.org/) -- the world's best pastebin.

## Installation

Just install with NPM, it's that easy.

    npm install stegosaurus

## Example

It'll (hopefully) be the simplest thing you use today. You pass in the code/text you want to paste, and optionally, a language.

    var pasteall = require("pasteall");
    var code = "function(foo,bar,quux){\n  console.log('foothousandthree');\n}";
    var language = "javascript";
    pasteall.paste(code,language,function(err,url){
        if (!err) {
            console.log("resulting url of paste:",url);
        } else {
            console.log("pasteall errored: ",err);
        }
    });

Or, without a language specified.

    var pasteall = require("pasteall");
    var code = "function(foo,bar,quux){\n  console.log('foothousandthree');\n}";
    pasteall.paste(code,function(err,url){
        if (!err) {
            console.log("resulting url of paste:",url);
        } else {
            console.log("pasteall errored: ",err);
        }
    });

## Detailed Usage

#### pasteall.paste(code_or_text, language, [callback(err,resulting_url)])

* `code_or_text` is the path to your source image file (in PNG format)
* `language` Is the language you'd like this highlighted as [optional]
* `callback` when finished encoding, returns if there was an error (as boolean)

Regarding the list of languages, here's some common ones:

* `javascript`
* `php`
* `mysql`
* `ruby`
* `haskell`
* `cpp`

You can check out [pasteall.org](http://www.pasteall.org/) and view the drop-down for a long list. Or, checkout `pasteall.js` herein.