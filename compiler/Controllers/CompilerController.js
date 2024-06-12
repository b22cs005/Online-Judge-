const {generateFile} = require('../util/generateFile');
const {generateInputFile} = require('../util/generateInputFile');
const {executeCpp} = require('../util/executeCpp');
const {executePython} = require('../util/executePython');
const {executeC} = require('../util/executeC');
const Problem = require('../models/problemsModel');

exports.Compiler = async (req,res) => {
    const {language='cpp',code,input} = req.body;
    console.log(input);
    errors={};
    if(code===undefined){
        errors.message = "Empty code body!";
        return res.status(400).json({ errors });
    }
    try{
        const filePath = generateFile(language,code);
        const inputFilePath = generateInputFile(input);
        let output;
        switch(language){
            case 'cpp':
                output = await executeCpp(filePath,inputFilePath);
                break;
            case 'c':
                output = await executeC(filePath,inputFilePath);
                break;
            case 'py':
                output = await executePython(filePath,inputFilePath);
                break;
            default:
                throw new Error('Unsupported language');
        }
        res.json({filePath,inputFilePath,output});
    }
    catch(error){
        console.error(error);
        if(error.message.includes('g++')){
            return res.status(400).json({message:error.message});
          }
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.PassVerdict = async (req,res) => {
    const {language="cpp",code}=req.body;
    let errors={};
    if(code===undefined){
        errors.message = "Empty code body!";
        return res.status(400).json({ errors });
    }
    try{
       const filePath = generateFile(language,code);
       const id = req.params.id;
       const problem = await Problem.findById(id);
       const testCases = language === 'cpp' || language === 'c' ? problem.testCasesCpp : problem.testCasesPy;

       for (const testCase of testCases) { 
        const inputFilePath = generateInputFile(testCase.Input);
        let output;

        switch (language) {
            case 'cpp':
                output = await executeCpp(filePath, inputFilePath);
                break;
            case 'c':
                output = await executeC(filePath, inputFilePath);
                break;
            case 'py':
                output = await executePython(filePath, inputFilePath);
                output=output.trim();
                break;
            default:
                throw new Error('Unsupported language');
        }
        
        if(output!==testCase.Output){
            return res.status(200).json({ success: false, output, expectedOutput: testCase.Output }); 
        }
    }
    return res.status(200).json({success:true});
    }
    catch(error){
      console.error(error);
      if(error.message.includes('g++')){
        return res.status(400).json({message:error.message});
      }
      return res.status(500).json({ message: "Internal server error" });
    }
}