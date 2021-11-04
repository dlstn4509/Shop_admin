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
          v.fileType = field === 'img' ? 'I' : 'F';
          delete v.fieldname;
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
