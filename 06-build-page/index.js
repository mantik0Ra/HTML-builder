const fs = require("fs");
const path = require("path");
fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, err => {
    if (err) throw err
})
fs.writeFile(path.join(__dirname, "project-dist", "index.html"), "", err => {
    if (err) throw err
})
fs.writeFile(path.join(__dirname, "project-dist", "style.css"), "", err => {
    if (err) throw err
})
bundleCss();
copyTemplate();
replaceTags();
copyAssets(path.join(__dirname, "project-dist", "assets"), path.join(__dirname, "assets"));
function bundleCss() {
    fs.readdir(path.join(__dirname, "styles"), { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            const type = path.extname(file.name.toString())
            if (file.isDirectory() || type != ".css") {
                return
            }
            const stream = fs.createReadStream(`${path.join(__dirname, "styles")}/${file.name}`, "utf-8");
            stream.on("data", chunk => {
                fs.appendFile(path.join(__dirname, "project-dist", "style.css"), chunk, err => {
                    if (err) throw err;
                })
            })
        })
    })
}

function copyTemplate() {
    const stream = fs.createReadStream(`${path.join(__dirname, "template.html")}`, "utf-8");
    stream.on("data", chunk => {
        fs.appendFile(path.join(__dirname, "project-dist", "index.html"), chunk, err => {
            if (err) throw err
        })
    })
}
function replaceTags() {
    let html = "";
    const stream = new fs.createReadStream(path.join(__dirname, "template.html"), "utf-8");
    stream.on("data", chunk => {
        html += chunk;
    })
    stream.on("end", () => {
        fs.readdir(path.join(__dirname, "components"), { withFileTypes: true }, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                const type = path.extname(file.name.toString())
                if (file.isDirectory() || type != ".html") {
                    return
                }
                let lastIndex = file.name.lastIndexOf(".")
                const fileName = file.name.slice(0, lastIndex);
                if (html.includes(fileName)) {
                    let component = "";
                    const stream = new fs.createReadStream(path.join(__dirname, "components", file.name), "utf-8");
                    stream.on("data", chunk => {
                        component += chunk;
                    })
                    stream.on("end", () => {
                        html = html.replaceAll(`{{${fileName}}}`, component);
                        fs.writeFile(path.join(__dirname, "project-dist", "index.html"), html, err => {
                            if (err) throw err
                        })
                    })
                }
            })
        })
    })
}

function copyAssets(newPath, oldPath) {
    fs.mkdir(newPath, { recursive: true }, err => {
        if (err) throw err;
    })
    fs.readdir(oldPath, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        for (let file of files) {
            if (file.isFile()) {
                fs.copyFile(`${oldPath}/${file.name}`, `${newPath}/${file.name}`, err => {
                    if (err) throw err;
                })
            } else {
                copyAssets(path.join(newPath, `${file.name}`), path.join(oldPath, `${file.name}`));
            }
        }
    })
}


