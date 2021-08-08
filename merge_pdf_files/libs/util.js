import path from 'path'
import seedrandom  from 'seedrandom';
import dotenv from 'dotenv'

dotenv.config( { path : '.env'} )

const FILENAME1 = process.env.FILENAME1
const FILENAME2 = process.env.FILENAME2
const mergedPrefix = process.env.OUTPUT_FILE_PREFIX

const __dirname = path.dirname('./');
const randomSeedValue = process.env.ADD_ENTROPY_SEED

function getfileNames(){
    const file1 = path.join(__dirname, FILENAME1)
    const file2 = path.join(__dirname, FILENAME2)

  return {file1, file2}
}

function between(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start
}

function addSeed(seed) {
    const rng = seedrandom(seed, { entropy: true });
    return rng.int32();
}

function addRandomSuffixGen(filename) {
    const suffix = between(1, 9999)
    return addSeed(filename) + '_' + suffix + '.pdf'
}

function getMergedFileName() {
    return mergedPrefix + addRandomSuffixGen(randomSeedValue)
}

export { getMergedFileName, getfileNames }