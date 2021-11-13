/* ----------------------- quill ------------------------ */
var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
});

$('form[name="prdCreateForm"]').submit(onSubmitPrdCreateForm);
function onSubmitPrdCreateForm(e) {
  e.preventDefault();
  var title = this.title.value.trim();
  if (title === '') {
    this.title.focus();
    return false;
  }
  this.content.value = quill.root.innerHTML; // quill 내용
  this.submit();
}

/* ----------------------- jstree ------------------------ */
var allData = [];
var selData = []; // selectedTree
var core = {};
var plugins = ['wholerow', 'changed', 'checkbox'];

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
  .on('loaded.jstree', onLoadedTree)
  .on('changed.jstree', onChangeTree);

function onLoadedTree(e, data) {
  allData = data.instance._model.data;
}

function onChangeTree(e, data) {
  const selectedTree = [];
  for (var v of data.selected) {
    // 말단만 찾기, data.selected = 선택된 애들의 id값
    if (!allData[v].children.length) selectedTree.push(v);
  }
  selData = selectedTree;
}

$('.modal-wrapper .modal-wrap .bt-modal-close').click(onCloseModal); // 모달 닫기 버튼
function onCloseModal() {
  $('.modal-wrapper').hide();
  var html = '';
  for (var v of selData) {
    html += `<div class="data">${allData[v].text}</div>`;
  }
  $('.prd-wrapper .selected-tree').html(html);
}

$('.prd-wrapper .bt-cate').click(onOpenModal); // 모달 열기 버튼
function onOpenModal() {
  $('.modal-wrapper').show();
}

/* ----------------------- jstree axios 통신 ------------------------ */
$('.form-wrapper .bt-cate').click(onClickCate);
function onClickCate() {
  axios
    .get('/api/cate')
    .then(function (r) {})
    .catch(function (err) {
      console.log(err);
    });
}
