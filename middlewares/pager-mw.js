const createPager = require('../modules/pager-init');

module.exports = (model, _listCnt = 5, _pagerCnt = 3) => {
  return async (req, res, next) => {
    const page = req.query.page || 1;
    const totalRecord = await model.count();
    const pager = createPager(page, totalRecord, _listCnt, _pagerCnt);
    req.pager = pager;
    next();
  };
};
