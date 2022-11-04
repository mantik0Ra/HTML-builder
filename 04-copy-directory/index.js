const fs = require("fs");
const path = require("path");
const newFile = path.join(__dirname, "file-copy");
const oldFile = path.join(__dirname, "files");
let pathFiles = path.join(__dirname);
removeFiles("/file-copy");
addFiles();

function removeFiles(way) {
    pathFiles += way;
    fs.readdir(newFile, {withFileTypes: true}, (err, files) => {
        if(err) {
            return;
        }
        files.forEach(file => {
            fs.unlink(`${pathFiles}/${file.name}`, err => {
                if(err) throw err
            })
        })
        
    })
}

function addFiles() {
    fs.mkdir(newFile, { recursive: true }, err => {
        if(err) throw err;
    })
    fs.readdir(oldFile, {withFileTypes: true}, (err, files) => {
        if(err) throw err;
        files.forEach(file => {
            fs.copyFile(`04-copy-directory/files/${file.name}`, `04-copy-directory/file-copy/${file.name}`, err => {
                if(err) throw err;
            })
        })
    })
}


