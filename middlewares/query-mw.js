module.exports = (addQuery = []) => {
  return (req, res, next) => {
    req.query.type = req.query.type || '';
    req.query.field = req.query.field || 'id';
    req.query.search = req.query.search || '';
    req.query.sort = req.query.sort || 'desc';
    req.query.page = req.query.page || 1;
    req.query.status = req.query.status || '';
    req.query.binit = req.query.binit || '';
    for (let value of addQuery) {
      let k = Object.keys(value);
      let [v] = Object.values(value);
      req.query[k] = req.query[k] || v;
    }
    for (let [k, v] of Object.entries(req.query)) res.locals[k] = v;
    next();
  };
};
