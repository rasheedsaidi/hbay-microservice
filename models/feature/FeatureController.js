let bcrypt = require('bcryptjs');
let config = require('../../config');
let jwt = require('jsonwebtoken');
let request = require('request');
var validUrl = require('valid-url');
const fs = require('fs');
var sharp = require('sharp');
var jsonpatch = require('fast-json-patch');
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [new transports.Console()]
});


let create = (req, res) => {
    let json_patch = req.body.json_patch;
    let json_object = req.body.json_object;

    if(!json_patch || !json_object) {
        return res.json({error: true, reply: "Json patch and Json object are required"});
    }

    var errors = jsonpatch.validate(json_patch, json_object);
    
    if (errors && errors.length != 0) { 
      logger.info(json_patch, errors);
      return res.status(403).json({error: true, reply: errors.name});
    }

    patch_object = jsonpatch.applyPatch(json_object, json_patch).newDocument;

    res.json({error: false, reply: "JSON Object was patched successfully!", patch: patch_object});       
}

let thumbnail = (req, res) => {    
    let url = req.body.image_url;

    if (!validUrl.isUri(url)){
        return res.status(403).json({error: true, reply: "Image url is required"});
    }

    let base = __dirname + '/thumbnails/';
    let file = getFilename(url);
    let filename = require('path').resolve(base + '../../../thumbnails/temp/' + file);
    let dest = require('path').resolve(base + '../../../thumbnails/' + file);
    
    download(url, filename, () => {
        sharp(filename)
        .resize(50, 50)
        .toFile(dest, function(err) {
          if(err) throw err;

          return res.json({error: false, reply: "Image converted successfully", thumbnail: dest});
        });        
    });
}

let download = (uri, filename, callback) => {
    request.head(uri, function(err, res, body){  
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

let getFilename = (url) => {
    let link = url.split('.');
    let ext = link[link.length - 1];
    let timestamp = Date.now();

    return timestamp + '.' + ext;
}


module.exports = { create, thumbnail };