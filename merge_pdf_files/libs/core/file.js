import fs from 'fs'

// work in progress
function asyncReadFile(filename) {
    reader = fs.createReadStream(filename, {
        flag: 'a+',
        encoding: 'UTF-8',
        start: 5,
        end: 64,
        highWaterMark: 16
    });
    reader.on('data', function (chunk) {
        console.log(chunk);
    });
    reader.on('end', function () {
        console.log('end');
    });
}

function syncReadFile(filename) {
    try {
        return fs.readFileSync(filename);
    } catch (e) {
            console.log(e);
        return
    }
}

function writeToFile(MERGED_FILENAME, mergedPdfFile) {
    // Write to file
    fs.writeFile(MERGED_FILENAME, mergedPdfFile , function(err, data) {
        if(err) {
            return console.error(err)
        }
        console.log("File saved");
    });    
}    

// Todo
function writeToStream() {
    // Todo stream the file to the client - TODO
    // await mergedPdfFile.pipe(fs.createWriteStream('merged.pdf'));
}

export {syncReadFile, writeToFile};
