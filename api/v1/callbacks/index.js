let path = require("path"),
	normPath = path.join(__dirname); // normalized path

require("fs").readdirSync(normPath).forEach(function(file) {
	let fileExt = path.extname(file),
		fileName = path.basename(file, fileExt); // remove ext from filename
    
	if (fileName != `index`) exports[fileName] = require(`./${file}`);
});