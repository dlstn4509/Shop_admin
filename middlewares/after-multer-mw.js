module.exports = (fields) => {
  // fields = ['img', 'pds']
  return (req, res, next) => {
    const files = [];
    for (let field of fields) {
      if (req.files && req.files[field]) {
        // req.files[field] = req.files.img or req.files.pds
        req.files[field].forEach((v) => {
          v.oriName = v.originalname;
          v.saveName = v.filename;
          v.mimeType = v.mimetype;
          v.fieldNum = v.fieldname.split('_')[1];
          v.fileType = v.fieldname.split('_')[0] === 'img' ? 'I' : 'F';
          delete v.originalname;
          delete v.encoding;
          delete v.mimetype;
          delete v.destination;
          delete v.filename;
          delete v.path;
          files.push(v);
        });
      }
    }
    req.files = files;
    next();
  };
};
