module.exports = (_field = 'query', addQuery = []) => {
  return (req, res, next) => {
    req[_field].type = req[_field].type || '';
    req[_field].field = req[_field].field || 'id';
    req[_field].search = req[_field].search || '';
    req[_field].sort = req[_field].sort || 'desc';
    req[_field].page = req[_field].page || 1;
    req[_field].status = req[_field].status || '';
    req[_field].binit = req[_field].binit || '';
    for (let value of addQuery) {
      let k = Object.keys(value);
      let [v] = Object.values(value);
      req[_field][k] = req[_field][k] || v;
    }
    for (let [k, v] of Object.entries(req[_field])) res.locals[k] = v;

    let goPath = `/${res.locals.currents[0]}/${res.locals.currents[1]}`;
    let goQuery = '';
    if (res.locals.currents[1] === 'board') {
      goQuery += `&boardId=${req[_field].boardId}`;
      goQuery += `&boardType=${req[_field].boardType}`;
    }
    if (req[_field].field && req[_field].search) {
      goQuery += `&field=${req[_field].field}`;
      goQuery += `&search=${req[_field].search}`;
    }
    if (req[_field].sort) {
      goQuery += `&sort=${req[_field].sort}`;
    }

    res.locals.goPager = goPath + '?' + goQuery;
    res.locals.goList = goPath + '?' + goQuery + `&page=${req[_field].page}`;
    res.locals.goPath = goPath; // ejs 용
    res.locals.goQuery = goQuery + `&page=${req[_field].page}`; // ejs 용

    res.locals.goLists = [
      { key: 'page', value: req[_field].page },
      { key: 'field', value: req[_field].field },
      { key: 'search', value: req[_field].search },
      { key: 'sort', value: req[_field].sort },
    ];
    if (res.locals.currents[1] === 'board') {
      res.locals.goLists.push({ key: 'boardId', value: req[_field].boardId });
      res.locals.goLists.push({ key: 'boardType', value: req[_field].boardType });
    }
    next();
  };
};

/* 
goPath : /admin/board
goQuery : &boardId=1&boardType=default&sort=desc
goList : /admin/board?&boardId=1&boardType=default&sort=desc&page=1
goLists : [
  {
  "key": "page",
  "value": 1
  }, {
  "key": "field",
  "value": "id"
  }, {
  "key": "search",
  "value": ""
  }, {
  "key": "sort",
  "value": "desc"
  }, {
  "key": "boardId",
  "value": 1
  }, {
  "key": "boardType",
  "value": "default"
  }
]
*/
