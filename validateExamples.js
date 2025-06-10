import { 
    getJreBin, 
    getValidatorPath, 
    getExamplesFolder, 
    readSushiConfig, 
    getFshOutputFolder, 
    getDependencies, 
    getValidationOutputPath,
    readValidationResults,
    extractErrorSummary
} from "./utils.js";
import { execa } from 'execa';

const examplesFolder = getExamplesFolder();
const igFolder = getFshOutputFolder();
const java = getJreBin();
const jar = getValidatorPath();
const sushiConfig = readSushiConfig();
const outputPathJson = getValidationOutputPath() + '.ex.json'
const outputPathHtml = getValidationOutputPath() + '.ex.html'

const getFhirVersion = () => {
    return sushiConfig?.fhirVersion;
};

const readResults = async () => {
    const results = readValidationResults(outputPathJson);
    const errorSummary = await extractErrorSummary(results);
    return errorSummary;
}

const runValidate = async () => {
    if (java && jar) {
        const args = ['-Dfile.encoding=UTF-8', '-jar', jar, examplesFolder, '-version', getFhirVersion(), '-jurisdiction', 'global', '-ig', igFolder]
            .concat(getDependencies(sushiConfig))
            .concat(['-output', outputPathJson, '-html-output', outputPathHtml]);
        const subprocess = execa(java, args);
        subprocess.stdout.pipe(process.stdout);
        await subprocess;
        const errors = await readResults();
        const message = `Finished validating examples. Found ${(errors.fatal ?? 0) + (errors.error ?? 0)} errors (${errors.fatal ?? 0} fatal) and ${errors.warning ?? 0} warnings`;
        console.log(message)
        if (errors?.error || errors?.fatal) {
            throw new Error(`Validation failed! See detailed results in: ${outputPathHtml}`)
        } else if (errors?.warning) {
            console.log(`Validation finished with warnings. Please see detailed results in: ${outputPathHtml}`)
        } else {
            console.log('Successful validation!')
        }
        return true
    } else {
        throw new Error('Failed to find JRE :(')
    }
};

runValidate();