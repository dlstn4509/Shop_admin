var core = {};
var plugins = ['contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'];
var types = {
  default: {
    max_depth: 10,
  },
};

core.check_callback = true;
core.themes = { variant: 'large', striped: true };
core.data = {
  url: function (node) {
    return '/api/tree';
  },
  data: function (node) {
    return { id: node.id };
  },
};

$('#jstreeWrap')
  .jstree({ core: core, plugins: plugins, types })
  .on('create_node.jstree', onCreateTree) // 구조, 테이블 둘 다 바꿈
  .on('rename_node.jstree', onUpdateTree) // 구조만 바꿈
  .on('move_node.jstree', onUpdateTree) // 구조만 바꿈
  .on('delete_node.jstree', onDeleteTree); // 구조, 테이블 둘 다 바꿈

function onCreateTree(e, data) {
  axios
    .post('/api/tree', { id: data.node.id })
    .then(onUpdateTree)
    .catch(function (err) {
      console.log(err);
    });
}
function onUpdateTree(e, data) {
  axios
    .put('/api/tree', { node: $('#jstreeWrap').jstree(true).get_json('#') })
    .then(function (r) {
      $('#jstreeWrap').jstree().refresh();
    })
    .catch(function (err) {
      console.log(err);
    });
}
function onDeleteTree(e, data) {
  axios
    .delete('/api/tree', { data: { id: data.node.id } })
    .then(onUpdateTree)
    .catch(function (err) {
      console.log(err);
    });
}
