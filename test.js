var Paste = require('./pasteall.js');
paste = new Paste();

paste.paste("function(foo,bar,quux){\n  console.log('foothousandone');\n}","javascript",function(err,url){
	if (!err) {
		console.log("resulting url of paste:",url);
	} else {
		console.log("pasteall errored: ",err);
	}
});