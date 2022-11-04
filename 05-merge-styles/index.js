const fs = require("fs");
const path = require("path");
const bundle = path.join(__dirname, "project-dist", "bundle.css");
const styles = path.join(__dirname, "styles")
fs.writeFile(bundle, "", err => {
    if (err) throw err;
})
fs.readdir(styles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        const type = path.extname(file.name.toString())
        if(file.isDirectory() || type != ".css") {
            return
        }
        const stream = fs.createReadStream(`${styles}/${file.name}`, "utf8");
        stream.on("data", chunk => {
            fs.appendFile(bundle, chunk, err => {
                if(err) throw err;
            })
        });
    })
})