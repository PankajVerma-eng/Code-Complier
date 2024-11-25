const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.18", express.static("C:/Users/Pankaj/Desktop/Compiler/codemirror-5.65.18"))
app.get("/" , function(req , res){
    // flush function is used to delete the file  which is present in the temp 
    // compiler.flush(function(){
    //     console.log("deleted")
    // })
    res.sendFile("C:/Users/Pankaj/Desktop/Compiler/index.html")
})
app.post("/compile" , function(req,res){
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++" , options:{timeout:10000} }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++" , options:{timeout:10000}}; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.error("Compiler Error:" , data.error);
                        res.send({ output:"Compilation Error" , error : data.error});
                    }
                });
            }
        }
    }
    catch (e) {
        console.log(e.message)
    }

})
app.listen(8000)