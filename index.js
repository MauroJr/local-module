'use strict';
const fs            = require('fs'),
      debug         = require('debug')('local-module'),
      hiddenFile    = new RegExp('^[.]'),
      upDirs        = '../../',
      modules       = Object.create(null);

module.exports = localModules;

function localModules(args) {
    if (!(args instanceof Array)) args = Array.prototype.slice.call(arguments);
    
    if (args.length > 0) {
        args.forEach(function (dir) {
            let directories;
        
            try {
                directories = fs.readdirSync(`${__dirname}/${upDirs + dir}`);
            } catch (err) {
                debug(err);
            }
            
            directories && directories.forEach(function (mod) {
                let modName;
                
                if (hiddenFile.test(mod)) return; // ignore hidden directories
                
                modName = mod.split('.')[0];
                
                debug(`: loading module ${modName}`);
                modules[modName] = require(`${upDirs + dir}/${modName}`);
            });
            
            module.exports = modules;
        });
    } else {
        debug(`"parameters must be strings or an array of directories names.`);
    }
}