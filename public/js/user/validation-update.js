$('form[name="userForm"]').submit(onSubmitUserForm);

function onSubmitUserForm(e) {
  e.preventDefault();
  var f = this;
  var usernameEl = f.username;
  var username = usernameEl.value.trim();
  var emailEl = f.email;
  var email = emailEl.value.trim();
  if (username === '') {
    alert('이름을 입력하세요');
    username.focus();
    return false;
  }
  if (validator.isEmail(email)) {
    f.submit();
  } else {
    alert('이메일을 형식에 맞게 입력하세요');
    emailEl.focus();
    return false;
  }
}
