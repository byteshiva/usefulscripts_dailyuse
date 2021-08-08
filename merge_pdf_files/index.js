import { getAuthRules } from './libs/util.js'
import { writeMergedFile } from './libs/core/pdfmerge.js'


function execute() {
    if (getAuthRules().do_not_merge === "true") {
        console.error(" You do not have permission to write:")
    } else {
        writeMergedFile()
    }
}

// execute merge files
execute()
