const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');

const location = (src) => path.join(__dirname, '../', src);

const cutTail = (str, len = 12) => (str.length > len ? str.substr(0, len) + ' ...' : str);

const telNumber = [
  '010',
  '011',
  '016',
  '017',
  '018',
  '019',
  '02',
  '031',
  '032',
  '051',
  '052',
  '053',
  '054',
  '055',
  '033',
  '041',
  '042',
  '043',
  '061',
  '062',
  '063',
  '064',
];

const chgStatus = (status) => {
  switch (status) {
    case '1':
      return '판매중';
    case '2':
      return '발행예정';
    case '3':
      return '절판';
    default:
      return '기타';
  }
};

const imgExt = ['jpg', 'jpeg', 'gif', 'png'];
const mediaExt = ['mp3', 'mp4'];
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'pdf'];
const zipExt = ['zip', 'alz'];
const exts = { imgExt, mediaExt, docExt, zipExt };

const relPath = (file) => `/uploads/${file.split('_')[0]}/${file}`;

const relThumbPath = (file) => `/uploads/${file.split('_')[0]}/thumb/${file}`;

const absPath = (file) =>
  path.join(__dirname, `../storages/${file.split('_')[0]}/${file}`);

const absThumbPath = (file) =>
  path.join(__dirname, `../storages/${file.split('_')[0]}/thumb/${file}`);

const moveFile = async (file) => {
  try {
    // 원본 옮기기
    let savePath = path.join(__dirname, '../storages-remove', file.split('_')[0]);
    let oldPath = absPath(file);
    await fs.ensureDir(savePath); // D:\ ~ /210909
    savePath = path.join(savePath, file); // D:\ ~ /210909/210909_fjk2134-askdf2103.jpg
    await fs.move(oldPath, savePath);

    // thumb 옮기기
    if (await fs.pathExists(absThumbPath(file))) {
      let saveThumbPath = path.join(
        __dirname,
        '../storages-remove',
        file.split('_')[0],
        'thumb'
      );
      let oldThumbPath = absThumbPath(file);
      await fs.ensureDir(saveThumbPath);
      saveThumbPath = path.join(saveThumbPath, file);
      await fs.move(oldThumbPath, saveThumbPath);
    }
    return true;
  } catch (err) {
    return err;
  }
};

const getIcon = (file) => {
  const ext = path.extname(file).substr(1);
  if (imgExt.includes(ext)) return '/img/icons/img.png';
  if (mediaExt.includes(ext)) return '/img/icons/video.png';
  if (docExt.includes(ext)) return '/img/icons/doc.png';
  if (zipExt.includes(ext)) return '/img/icons/zip.png';
  return '';
};

const isImg = (file) => (imgExt.includes(path.extname(file).substr(1)) ? true : false);

const alert = (msg, loc = '/') => {
  return `<script>
		alert('${msg}');
		location.href = '${loc}';
	</script>`;
};

// 배열을 쪼개서 문자로
const getSeparateString = (arr, division) => {
  return arr.includes('') || arr.includes(undefined) ? '' : arr.join(division);
};

// 문자를 합쳐서 배열로
const getSeparateArray = (str, division = '-') => {
  return str.includes(division) ? str.split(division) : [];
};

const dateFormat = (_date = new Date(), _type = 'D') => {
  /* 
  D : 2021-11-04
  KD : 2021년11월04일
  H : 2021-11-04 13:11:04
  KH : 2021년11월04일 13시 11분 4초
  */
  let type = '';
  switch (_type) {
    case 'D':
      type = 'YYYY-MM-DD';
      break;
    case 'KD':
      type = 'YYYY년 M월 D일';
      break;
    case 'H':
      type = 'YYYY-MM-DD HH:mm:ss';
      break;
    case 'KH':
      type = 'YYYY년 M월 D일 H시m분s초';
      break;
  }
  return moment(_date).format(type);
};

// _obj에서 id에 해당하는 객체를 찾는순간 멈추는 재귀함수
function findObj(_obj, id) {
  let a = null;
  function findInner(_obj, id) {
    if (_obj.id !== id) {
      if (_obj.children) {
        for (let v of _obj.children) {
          findInner(v, id);
        }
      }
    } else {
      a = _obj;
    }
    return a;
  }
  return findInner(_obj, id);
}

// _obj의 자식의 id를 리턴하는 재귀함수
function findChildId(_obj) {
  const arr = [];
  if (_obj.children) {
    for (let v of _obj.children) {
      arr.push(v);
    }
  }
  return arr;
}

// _obj의 자손들중 endPoint(최말단) id를 리턴하는 재귀함수
function findLastId(_obj, arr) {
  if (_obj.children.length) {
    for (let v of _obj.children) {
      findLastId(v, arr);
    }
  } else {
    arr.push(_obj.id);
  }
  return arr;
}

// _obj의 자식들의 id를 리턴하는 재귀함수
function findAllId(_obj, arr) {
  if (_obj.children) {
    for (let v of _obj.children) {
      findAllId(v, arr);
    }
  }
  arr.push(_obj.id);
  return arr;
}

module.exports = {
  location,
  cutTail,
  chgStatus,
  exts,
  relPath,
  absPath,
  getIcon,
  isImg,
  moveFile,
  alert,
  telNumber,
  getSeparateString,
  getSeparateArray,
  dateFormat,
  findChildId,
  findObj,
  findLastId,
  findAllId,
  absThumbPath,
  relThumbPath,
};
