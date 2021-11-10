var core = {};
var plugins = ['contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'];

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
  .jstree({ core: core, plugins: plugins })
  // .on('changed.jstree', onChangedTree)
  .on('rename_node.jstree', onUpdateTree)
  .on('move_node.jstree', onUpdateTree)
  .on('delete_node.jstree', onUpdateTree)
  .on('create_node.jstree', onCreateTree)
  .on('delete_node.jstree', onDeleteTree);

function onChangedTree(e, data) {
  var json = $('#jstreeWrap').jstree(true).get_json('#');
  axios.post('/api/tree', { params: { json } });
}
function onUpdateTree(e, data) {
  var json = $('#jstreeWrap').jstree(true).get_json('#');
  axios.post('/api/tree', { params: { json } }).then(function (r) {
    $('#jstreeWrap').jstree().refresh();
  });
}
function onCreateTree(e, data) {
  console.log(e);
  console.log(data);
}
function onDeleteTree(e, data) {
  console.log(e);
  console.log(data);
}
