import { PDFDocument } from 'pdf-lib'
import {syncReadFile, writeToFile } from './file.js'
import {getMergedFileName, getfileNames } from '../util.js'
import {setMetaData} from './metaData.js'

async function loadAndMergeFiles(file, mergedPdf) {
    var pdfA = await PDFDocument.load(syncReadFile(file));
    var copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());

    copiedPagesA.forEach((page) => mergedPdf.addPage(page));
    return mergedPdf;
}

async function mergepdf() {
    const obj = getfileNames()
    const mergedPdf = await PDFDocument.create();
    
    for (let value in obj) {
        await loadAndMergeFiles(obj[value], mergedPdf);
    }
    
    setMetaData(mergedPdf)
    
    const mergedPdfFile = await mergedPdf.save();
    return {mergedPdfFile};
}

async function writeMergedFile() {
    const {mergedPdfFile} = await mergepdf()
    const MERGED_FILENAME = getMergedFileName()
    writeToFile(MERGED_FILENAME, mergedPdfFile)
}

export {
    writeMergedFile
}