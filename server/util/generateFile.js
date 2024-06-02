const fs = require('fs');
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const cpp_codes = path.join(dirCodes, 'cppCodes');
if (!fs.existsSync(cpp_codes)) {
    fs.mkdirSync(cpp_codes, { recursive: true });
}

const c_codes = path.join(dirCodes, 'cCodes');
if (!fs.existsSync(c_codes)) {
    fs.mkdirSync(c_codes, { recursive: true });
}

const java_codes = path.join(dirCodes, 'javaCodes');
if (!fs.existsSync(java_codes)) {
    fs.mkdirSync(java_codes, { recursive: true });
}

const python_codes = path.join(dirCodes, 'pyCodes');
if (!fs.existsSync(python_codes)) {
    fs.mkdirSync(python_codes, { recursive: true });
}

module.exports.generateFile = (language, code) => {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    let filePath;

    switch (language) {
        case 'cpp':
            filePath = path.join(cpp_codes, filename);
            break;
        case 'java':
            filePath = path.join(java_codes, filename);
            break;
        case 'py':
            filePath = path.join(python_codes, filename);
            break;
        case 'c':
            filePath = path.join(c_codes, filename);
            break;
        default:
            throw new Error('Unsupported language');
    }

    fs.writeFileSync(filePath, code);
    return filePath;
};
