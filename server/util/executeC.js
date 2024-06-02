const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const output = path.join(__dirname, 'outputs');

if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
}

const outputC = path.join(output, 'cOutputs');

if (!fs.existsSync(outputC)) {
    fs.mkdirSync(outputC, { recursive: true });
}

module.exports.executeC = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const outputCfilename = `${jobId}.exe`;
    const outCPath = path.join(outputC, outputCfilename);
    
    return new Promise((resolve, reject) => {
        exec(
            `gcc "${filePath}" -o "${outCPath}" && cd "${outputC}" && .\\${outputCfilename}`,
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
