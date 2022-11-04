const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "secret-folder");
let arr = [];
main();
function main() {
    
    fs.readdir(folder, {withFileTypes: true}, (err, files) => {
        if(err) {
            throw err
        }
        files.forEach(file => {
            let arr = [];
            let filePath = path.join(__dirname, "secret-folder", file.name)
            arr = file.name.split(".");
            fs.stat(filePath, (err, stats) => {
                if(err) {
                    throw err
                }
                if(stats.isDirectory()) {
                    return;
                }
                arr.push(stats.size);
                console.log(arr.join(" - ") + " byte");
                arr = [];
            })
        })
    })
    
}
const { stdout } = process;
