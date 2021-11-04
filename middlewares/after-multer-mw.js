module.exports = (fields) => {
  // fields = ['img', 'pds']
  return (req, res, next) => {
    const files = [];
    for (let field of fields) {
      if (req.files && req.files[field]) {
        req.files[field].forEach((v) => {
          v.oriName = v.originalname;
          v.saveName = v.filename;
          v.mimeType = v.mimetype;
          v.fileType = field === 'img' ? 'I' : 'F';
          files.push(v);
        });
      }
    }
    req.files = files;
    next();
  };
};
