const path = require('path');
const fs = require('fs-extra');

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
const absPath = (file) =>
  path.join(__dirname, `../storages/${file.split('_')[0]}/${file}`);
const moveFile = async (file) => {
  try {
    let savePath = path.join(__dirname, '../storages-remove', file.split('_')[0]);
    let oldPath = absPath(file);
    await fs.ensureDir(savePath); // D:\ ~ /210909
    savePath = path.join(savePath, file); // D:\ ~ /210909/210909_fjk2134-askdf2103.jpg
    await fs.move(oldPath, savePath);
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

const generateUser = (_users) => {
  const users = _users.map((v) => {
    v.tel = v.tel1 && v.tel2 && v.tel3 ? v.tel1 + '-' + v.tel2 + '-' + v.tel3 : '';
    v.addr1 =
      v.addrPost && v.addrRoad
        ? `[${v.addrPost}] 
        ${v.addrRoad || ''} 
        ${v.addrComment || ''}
        ${v.addrDetail || ''}`
        : '';
    v.addr2 =
      v.addrPost && v.addrJibun
        ? `[${v.addrPost}] 
        ${v.addrJibun}
        ${v.addrDetail || ''}`
        : '';
    v.level = '';
    switch (v.status) {
      case '0':
        v.level = '탈퇴회원';
        break;
      case '1':
        v.level = '유휴회원';
        break;
      case '2':
        v.level = '일반회원';
        break;
      case '8':
        v.level = '관리자';
        break;
      case '9':
        v.level = '최고관리자';
        break;
      default:
        v.level = '회원';
        break;
    }
    return v;
  });
  return users;
};

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
  generateUser,
};
