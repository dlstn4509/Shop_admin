const sharp = require('sharp');
const { absPath } = require('./modules/util');
const path = require('path');
const files = [
  '211109_0ddb4908-dc19-4f8f-bfd5-bd272da88d9f.jpg',
  '211109_bf87a265-2245-439c-9698-1e06dea41b04.jpg',
  '211109_e6cf92f6-dcf5-41c0-91bf-b715de00890b.jpg',
  '211110_9c4dd6a3-6e9a-4d56-8077-7ac4ce7f42c0.jpg',
  '211110_81e2a275-6f92-436d-88ac-935581b12028.jpg',
];
async function start() {
  for (let v of files) {
    let loc = path.join(__dirname, 'storages', v.split('_')[0], 'thumb');
    v.thumb = await sharp(absPath(v))
      .resize(200)
      .jpeg({ mozjpeg: true })
      .toFile(path.join(loc, v));
  }
}
start();
