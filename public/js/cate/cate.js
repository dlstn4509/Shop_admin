var core = {};
var plugins = ['contextmenu', 'dnd', 'search', 'state', 'types', 'wholerow'];
// contextmenu: 우클릭, wholerow: 한줄 클릭 가능
var types = {
  default: {
    max_depth: 3,
  },
};

core.check_callback = true;
core.themes = { variant: 'large', striped: true };
core.search = {
  show_only_matches: true,
  show_only_matches_children: true,
};
core.data = {
  // get방식으로 요청
  url: function (node) {
    return '/api/tree';
  },
  data: function (node) {
    return { id: node.id };
  },
};

$('#jstreeWrap')
  .jstree({ core: core, plugins: plugins, types: types })
  .on('create_node.jstree', onCreateTree) // 구조, 테이블 둘 다 바꿈
  .on('rename_node.jstree', onUpdateTree) // 구조만 바꿈
  .on('move_node.jstree', onUpdateTree) // 구조만 바꿈
  .on('delete_node.jstree', onDeleteTree); // 구조, 테이블 둘 다 바꿈

function onCreateTree(e, data) {
  axios
    .post('/api/tree', { id: data.node.id })
    .then()
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

$('input[name="search"]').keyup(function () {
  // 검색창
  console.log(this);
  var searchString = this.value.trim();
  $('#jstreeWrap').jstree('search', searchString);
});
