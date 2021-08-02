import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // const app = express();
  // app.use(bodyParser.json());
  // app.use(cors());

  // aws.config.update({
  //     secretAccessKey: 'a5JICmPidT2YSRgmzl/gOxIm6nuGvj2s5XH4WE1A',
  //     accessKeyId: 'ASIA4GZ6YP6NVYYNEHFG',
  //     region: 'us-east-1',
  // });

  // const s3 = new aws.S3();
  // const upload = multer({
  //     fileFilter: (req: any, file: any, cb: any)  => {
  //         if (file.mimetype === 'application/octet-stream' || file.mimetype === 'video/mp4'
  //             || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //             cb(null, true);
  //         } else {
  //             cb(new Error('Invalid file type'), false);
  //         }
  //     },
  //     storage: multerS3({
  //         acl: 'public-read',
  //         s3,
  //         bucket: 'YOUR BUCKET-NAME',
  //         key: function (req: any, file: any, cb: any) {
  //             req.file = Date.now() + file.originalname;
  //             cb(null, Date.now() + file.originalname);
  //         }
  //     })
  // });


  // app.post('/api/upload', upload.array('file', 1), (req: any, res: any) => {
  //     res.send({ file: req.file });
  // });
