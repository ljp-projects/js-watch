const fs = require('fs');
const TailingReadableStream = require('tailing-stream');

const stream = TailingReadableStream.createReadStream(process.argv[1], { timeout: 0 });

stream.on('data', buffer => {
    fs.readFile(process.argv[2], (err, data) => {
        if (err) {
            console.warn("An error reading the file (to execute it) occured, therefore, your file won't be executed.")
        } else {
            try {
                eval(data.toString())
            } catch (err) {
                console.error("An error Executing the file occured. This means that you code has a bug (or you are using web api's not available on node.js)")
            }
        }
    })
});