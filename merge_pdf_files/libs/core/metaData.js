import dotenv from 'dotenv'
dotenv.config( { path : '.env'} )

const TAGS_KEYWORDS = process.env.TAGS_KEYWORDS
const TAGS_KEYWORDS_SPLIT = TAGS_KEYWORDS.split(',')
const AUTHORS = process.env.AUTHOR
const TITLE = process.env.TITLE
const SUBJECT = process.env.SUBJECT
const PRODUCER = process.env.PRODUCER
const CREATOR = process.env.CREATOR

function getPdfMetadata() {
    return {
        keywords: TAGS_KEYWORDS_SPLIT,
        title: TITLE,
        author: AUTHORS,
        subject: SUBJECT,
        producer: PRODUCER,
        creator: CREATOR,
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

export { setMetaData }