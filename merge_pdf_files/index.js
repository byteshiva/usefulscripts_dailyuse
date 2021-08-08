import { PDFDocument, StandardFonts, rgb, addRandomSuffix } from 'pdf-lib'
import fs from 'fs'
import {getMergedFileName, getfileNames, getPdfMetadata} from './libs/util.js'

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

function setMetaData(mergedPdf) {
    mergedPdf.setTitle(getPdfMetadata().title)
    mergedPdf.setAuthor(getPdfMetadata().author)
    mergedPdf.setSubject(getPdfMetadata().subject)
    mergedPdf.setKeywords(getPdfMetadata().keywords)
    mergedPdf.setProducer(getPdfMetadata().producer)
    mergedPdf.setCreator(getPdfMetadata().creator)
    mergedPdf.setCreationDate(new Date('2021-08-08T01:58:37.228Z'))
    mergedPdf.setModificationDate(new Date('2021-08-08T07:00:11.000Z'))
}


async function mergepdf() {
    const {file1, file2} = getfileNames()
    const mergedPdf = await PDFDocument.create();

    const pdfA = await PDFDocument.load(syncReadFile(file1));
    const pdfB = await PDFDocument.load(syncReadFile(file2));

    const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page));

    const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page));

    setMetaData(mergedPdf)
    
    const mergedPdfFile = await mergedPdf.save();
    return {mergedPdfFile};
}


async function writeMergedFile() {
    const {mergedPdfFile} = await mergepdf()
    const MERGED_FILENAME = getMergedFileName()

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

function execute() {
    writeMergedFile()
}

// execute merge files
execute()
