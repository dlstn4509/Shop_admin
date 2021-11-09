$('form[name="loginForm"]').submit(onLoginSubmit);
function onLoginSubmit(e) {
  e.preventDefault();
  var userid = this.userid.value.trim();
  var userpw = this.userpw.value.trim();
  if (userid === '') {
    this.userid.focus();
    return false;
  }
  if (userpw === '') {
    this.userpw.focus();
    return false;
  }
  this.submit();
}
