const express =require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const mergepdfs=require('./routes/pdf-merger');
const upload = multer({ dest: 'uploads/' });

var folder = './uploads/';  //folder directory

const app=express();


app.use('/static', express.static('public/savedfiles'))   // to redirect to pdf 

app.use(express.json());
app.use(express.static('./public'))  // to serve basic index.html


app.post('/merge', upload.array('pdfs', 12), async(req, res, next) =>{
    try {
        let d=await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
        // To remove files from uploads folder we are using this function to get storage efficiency
        fs.readdir(folder, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlinkSync(folder+file);
            }
        });
        res.status(201).json({data:d,message:"success"});
    } catch (error) {
        console.log(error);
    }
})
const port=3000;

app.listen(port,()=>{
    console.log(`app listening on port http://localhost:${port}/`);
})