var express = require('express');
var router = express.Router();
var path = require('path');
var jimp = require('jimp');
var randomstring = require('randomstring');
var fs = require('fs');
/* GET home page. */
router.perform = function(req,res) {
	var name = req.query.name;
	jimp.read(path.join(__dirname,'../public','images','flynava.png'),function(err,image){

		if(!err)
		{
			jimp.loadFont(jimp.FONT_SANS_64_BLACK).then(function (font) {
				var newImageName = randomstring.generate(8);
				newImageName = newImageName + ".png";
				image.print(font, 2279, 1302, name).write(path.join(__dirname,'../public','images',newImageName),function(){
					var certificate = fs.readFileSync(path.join(__dirname,'../public','images',newImageName));
					res.end(certificate,'binary');
				});
				
			});
		}
		else
			console.log(err);

	})
};

module.exports = router;
