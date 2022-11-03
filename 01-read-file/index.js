const fs = require("fs");
const path = require("path");
const { stdout } = process;

const file = path.resolve("01-read-file/text.txt");
let data = ""
const stream = fs.createReadStream(file, "utf8");
stream.on("data", chunk => data += chunk);
stream.on("end", () => stdout.write(data));
