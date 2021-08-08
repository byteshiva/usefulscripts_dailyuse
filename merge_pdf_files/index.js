import { PDFDocument, StandardFonts, rgb, addRandomSuffix } from 'pdf-lib'
import fs from 'fs'
import {getMergedFileName, getfileNames} from './libs/util.js'

async function mergepdf() {
    const {file1, file2} = getfileNames()
    const mergedPdf = await PDFDocument.create();

    const pdfA = await PDFDocument.load(fs.readFileSync(file1));
    const pdfB = await PDFDocument.load(fs.readFileSync(file2));

    const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
    copiedPagesA.forEach((page) => mergedPdf.addPage(page));

    const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
    copiedPagesB.forEach((page) => mergedPdf.addPage(page));

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
