module.exports = function() {

	var querystring = require('querystring');
	var http = require('http');
	var async = require('async');

	this.paste = function(codestring,language_name,callback) {

		var language_id = -1;

		// Language id is option, so if it comes as a function, it's the callback
		switch (typeof language_name) {
			case "function":
				callback = language_name;
			case "undefined":
				language_id = 0;
				break;
		}

		async.series({
			language: function(callback){
				// If we don't have a language_id, look it up, by language.
				if (language_id < 0) {
					// Let's try a lookup.
					this.getLanguageId(language_name,function(err,id){
						callback(err,id);
					});
				} else {
					// It's default
					callback(null,0);
				}
			}.bind(this),
		},function(err,result){

			if (!err) {

				var post_data = querystring.stringify({
					'action' : 'savepaste',
					'parent_id': '0',
					'language_id': result.language,
					'code' : codestring
				});

				var post_options = {
					host: 'www.pasteall.org',
					port: '80',
					path: '/index.php',
					method: 'POST',
					headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': post_data.length
					}
				};

				/*

				-------------------

				SAMPLE RETURNED HEADER.

				res.headers:  { date: 'Tue, 14 Oct 2014 17:23:23 GMT',
				  server: 'Apache/2.2.22',
				  'x-powered-by': 'PHP/5.3.29',
				  expires: 'Thu, 19 Nov 1981 08:52:00 GMT',
				  'cache-control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				  pragma: 'no-cache',
				  'set-cookie': [ 'PHPSESSID=48fe4f98f6f946948945d9c0b712dce0; path=/' ],
				  location: 'http://www.pasteall.org/54555',
				  vary: 'User-Agent,Accept-Encoding',
				  'content-length': '0',
				  'keep-alive': 'timeout=5, max=100',
				  connection: 'Keep-Alive',
				  'content-type': 'text/html' }

				---------------------

				SAMPLE CURL REQUEST

				[doug@localhost ~]$ 
					curl 'http://www.pasteall.org/index.php' -H 'Cookie: PHPSESSID=a63b42898d5740f42bfdac0308bdb9f7' \
					-H 'Origin: http://www.pasteall.org' \
					-H 'Accept-Encoding: gzip,deflate' \
					-H 'Accept-Language: en-US,en;q=0.8' \
					-H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36' \
					-H 'Content-Type: application/x-www-form-urlencoded' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp;q=0.8' \
					-H 'Cache-Control: max-age=0' \
					-H 'Referer: http://www.pasteall.org/' \
					-H 'Connection: keep-alive' \
					--data 'action=savepaste&parent_id=0&code=this.cheese+%3D+function%28foo%2Cquux%2Cbar%29+%7B%0D%0A+console.log%28%22foo%22%29%3B%0D%0A%7D%0D%0A&language_id=0' \
					 --compressed -v

				*/

				// Set up the request
				var post_req = http.request(post_options, function(res) {
					// console.log("!trace res.headers: ",res.headers);
					// console.log("!trace res.statusCode: ",res.statusCode);
					if (res.statusCode == 302) {
						// That's good.
						if (res.headers['location']) {
							// Great, location looks good, I think we can call it back.
							callback(null,res.headers['location']);
						} else {
							callback("Error, location returned from pasteall doesn't look good");
						}
					} else {
						callback("Error, status code not 302 from pasteall, received: " + res.statusCode);
					}
				});

				// Handle protocol level errors
				post_req.on('error', function(e) {
					callback(e.message);
				});


				// post the data
				post_req.write(post_data);
				post_req.end();

			} else {

				callback(err);

			}

		}.bind(this));

	}

	// The list of supported languages.

	var language = [];
	language[0] = "";
	language[1] = "abap";
	language[2] = "actionscript";
	language[3] = "ada";
	language[4] = "apache";
	language[5] = "applescript";
	language[6] = "asm";
	language[7] = "asp";
	language[8] = "autoit";
	language[9] = "bash";
	language[10] = "blitzbasic";
	language[11] = "bnf";
	language[12] = "c";
	language[13] = "c_mac";
	language[14] = "caddcl";
	language[15] = "cadlisp";
	language[16] = "cfdg";
	language[17] = "cfm";
	language[18] = "cpp";
	language[19] = "cpp-qt";
	language[20] = "csharp";
	language[21] = "css";
	language[22] = "d";
	language[23] = "delphi";
	language[24] = "diff";
	language[25] = "div";
	language[26] = "dos";
	language[27] = "eiffel";
	language[28] = "fortran";
	language[29] = "freebasic";
	language[30] = "genero";
	language[31] = "gml";
	language[32] = "groovy";
	language[33] = "haskell";
	language[34] = "html4strict";
	language[35] = "idl";
	language[36] = "ini";
	language[37] = "inno";
	language[38] = "io";
	language[39] = "java5";
	language[40] = "java";
	language[41] = "javascript";
	language[42] = "latex";
	language[43] = "lisp";
	language[44] = "lua";
	language[45] = "m68k";
	language[48] = "mpasm";
	language[49] = "mysql";
	language[50] = "nsis";
	language[51] = "objc";
	language[52] = "ocaml";
	language[53] = "ocaml-brief";
	language[55] = "oracle8";
	language[56] = "pascal";
	language[57] = "per";
	language[58] = "perl";
	language[59] = "php";
	language[60] = "php-brief";
	language[61] = "plsql";
	language[62] = "python";
	language[63] = "qbasic";
	language[64] = "rails";
	language[65] = "reg";
	language[66] = "robots";
	language[67] = "ruby";
	language[68] = "sas";
	language[69] = "scheme";
	language[70] = "sdlbasic";
	language[71] = "smalltalk";
	language[72] = "sql";
	language[73] = "tcl";
	language[74] = "text";
	language[75] = "thinbasic";
	language[76] = "tsql";
	language[77] = "vb";
	language[78] = "vbnet";
	language[79] = "vhdl";
	language[80] = "visualfoxpro";
	language[81] = "winbatch";
	language[82] = "xml";
	language[83] = "xpp";
	language[84] = "z80";

	this.getLanguageId = function(language_name,callback) {

		var found = false;

		for (var i = 0; i < language.length; i++) {
			if (language_name == language[i]) {
				found = true;
				callback(null,i);
			}
		}

		if (!found) {
			callback("Language '" + language_name + "' is an unknown language");
		}

	}

}