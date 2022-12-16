const express =require('express');
const multer  = require('multer');
const path = require('path');
const mergepdfs=require('./routes/pdf-merger');
const upload = multer({ dest: 'uploads/' })
const app=express();
app.use('/static', express.static('public'))

app.use(express.json());
app.use(express.static('./public'))


app.post('/merge', upload.array('pdfs', 12), async(req, res, next) =>{
    try {
        let d=await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
        res.status(201).json({data:d,message:"success"});
    } catch (error) {
        console.log(error);
    }
})
const port=3000;

app.listen(port,()=>{
    console.log(`app listening on port http://localhost:${port}/`);
})