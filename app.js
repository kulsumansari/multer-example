const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path')

let maxSize = 1 * 1024 * 1024;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
var upload = multer({
    storage: storage ,
    fileFilter: (req, file, cb) => {
        if (
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg" ||
          file.mimetype == "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
      },
      limits: { fileSize: maxSize },
    });

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.post('/single', upload.single('file'), (req, res) => {
    try {
      res.send(req.file);
    }catch(err) {
      res.status(400).json({
          message : 'Could not upload file',
      });
    }
  });

const port = 3000;
app.listen(port, () => {
    console.log(`listening to the port: ` + port);
});