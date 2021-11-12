const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const port = '8009';
const path = require('path');
const fs = require('fs');

app.use(fileUpload());

// post request: upload files.
app.post('/upload', (req, res) => {

  if(req.files === null) {
    return res.status(400).json({ msg: 'no file uploaded'});
  }

  const file = req.files.file;

  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if(err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({fileName: file.name, filePath: `/uploads/${file.name}`, status: 200});
  })
})

// get: get files.
app.get('/filelist', (req, res) => {
  //passsing directoryPath and callback function
  fs.readdir(`${__dirname}/uploads/`, (err, files) => {
    //handling error
    if (err) {
      console.error(err);
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    const tempFileArr = [];
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      tempFileArr.push({ fileName: file, filePath: `/uploads/${file}`});
    });
    res.json({data: tempFileArr, status: 200});
  });
})


app.listen(port, () => console.log('Server started...'))