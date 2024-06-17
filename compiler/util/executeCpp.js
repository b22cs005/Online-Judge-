const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const output = path.join(__dirname, 'outputs');

if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
}

const outputCpp = path.join(output, 'cppOutputs');

if (!fs.existsSync(outputCpp)) {
    fs.mkdirSync(outputCpp, { recursive: true });
}

module.exports.executeCpp = (filePath,inputFilePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputCppfilename = `${jobId}.exe`;
    const outCppPath = path.join(outputCpp, outputCppfilename);
    
    return new Promise((resolve, reject) => {
        exec(
            `g++ "${filePath}" -o "${outCppPath}" && cd "${outputCpp}" && .\\"${outputCppfilename}" < "${inputFilePath}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};
