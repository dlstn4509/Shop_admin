$('form[name="binitForm"]').submit(onInitBoard); // 생성
$('.binit-update-form').submit(onInitBoard); // 수정, 리스트

function onInitBoard(e) {
  e.preventDefault();
  console.log(this);
  var f = this;
  var title = f.title;
  var titleValue = title.value.trim();
  if (titleValue === '') {
    alert('제목은 필수입니다.');
    title.focus();
    return false;
  }
  f.submit();
}

function onChangeBoard(_method, el) {
  el.form._method.value = _method;
  el.form.submit();
}

// var el = f.elements;
// var validation = true;
// for (var i = 0; i < el.length; i++) {
//   if($(el[i]).props('required')) {
//     if(el[i].value.trim() === '' && ) {
//       alert(el[i].dateset['title'] + '필수사항 입니다.')
//       el[i].focus()
//       var validation = false;
//       break;
//     }
//   }
// }
// if (validation = true;) this.submit();
