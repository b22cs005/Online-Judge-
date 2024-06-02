const {generateFile} = require('../util/generateFile');
const {executeCpp} = require('../util/executeCpp');
const {executePython} = require('../util/executePython');
const {executeC} = require('../util/executeC');

exports.Compiler = async (req,res) => {
    const {language='cpp',code} = req.body;
    errors={};
    if(code===undefined){
        errors.message = "Empty code body!";
        return res.status(400).json({ errors });
    }
    try{
        const filePath = generateFile(language,code);
        let output;
        switch(language){
            case 'cpp':
                output = await executeCpp(filePath);
                break;
            case 'c':
                output = await executeC(filePath);
                break;
            case 'py':
                output = await executePython(filePath);
                break;
            default:
                throw new Error('Unsupported language');
        }
        res.json({filePath,output});
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}