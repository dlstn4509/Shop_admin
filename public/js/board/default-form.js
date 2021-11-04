$('form[name="defaultForm"]').submit(onFormSubmit);
function onFormSubmit(e) {
  console.log(this);
  e.preventDefault();
  var f = this;
  var titleEl = f.title;
  var writerEl = f.writer;
  var contentEl = f.content;
  var title = titleEl.value.trim();
  var writer = writerEl.value.trim();
  var content = contentEl.value.trim();
  if (title === '') {
    alert('제목은 필수사항 입니다.');
    titleEl.focus();
    return false;
  }
  if (writer === '') {
    alert('작성자는 필수사항 입니다.');
    titleEl.focus();
    return false;
  }
  if (content === '') {
    alert('내용은 필수사항 입니다.');
    titleEl.focus();
    return false;
  }
  f.submit();
}
