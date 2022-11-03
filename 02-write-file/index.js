const { createWriteStream } = require("fs");
const os = require("os");
const path = require("path");
const process = require("process");
const {stdout, stdin} = process;
const file = path.resolve("02-write-file/text.txt");
stdout.write("Hello Student! You can enter a message right below" + os.EOL);
const input = createWriteStream(file);
stdin.on("data", data => {
    if(Buffer.from(data).toString().slice(0, 4) == "exit") {
        stdout.write("Until then, all the best!");
        process.exit(0);
    }
    input.write(data)
});
process.on('SIGINT', () => {
    stdout.write("Until then, all the best!");
    process.exit(0);
});

