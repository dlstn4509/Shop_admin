const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const { name, router: childRouter } = require(path.join(__dirname, file));
    router.use(name, childRouter);
  });

router.get('/', (req, res, next) => {
  res.redirect('/admin/main');
});

module.exports = router;

/* 
name: /board
router:
[Function: router] {
  params: {},    
  _params: [],
  caseSensitive: undefined,
  mergeParams: undefined,
  strict: undefined,
  stack: [
    Layer {
      handle: [Function],
      name: 'router',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/auth\/?(?=\/|$)/i,
      route: undefined
    },
    Layer {
      handle: [Function (anonymous)],
      name: '<anonymous>',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/?(?=\/|$)/i,
      route: undefined
    }
  ]
}
*/
