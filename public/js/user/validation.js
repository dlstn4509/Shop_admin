/* 
userid : 6 ~ 24
userid 존재 여부 - ajax
passwd : 6 ~ 24
passwd === passwd2
email 검증
*/
(function initValidation(form) {
  var ERR_API = '에러가 발생했습니다.';

  var f = form || document.userForm;
  var useridEl = f.userid;
  var passwdEl = f.userpw;
  var passwd2El = f.userpw_re;
  var usernameEl = f.username;
  var emailEl = f.email;
  // El 은 입력창
  var useridTxt = document.querySelector('.userid');
  var passwdTxt = document.querySelector('.userpw');
  var passwd2Txt = document.querySelector('.userpw_re');
  var usernameTxt = document.querySelector('.username');
  var emailTxt = document.querySelector('.email');
  // txt 는 밑에 경고창

  f.addEventListener('submit', onSubmit);

  useridEl.addEventListener('blur', verifyUserid);
  if (passwdEl) {
    passwdEl.addEventListener('keyup', verifyPasswd);
    passwdEl.addEventListener('blur', verifyPasswd);
  }
  if (passwd2El) {
    passwd2El.addEventListener('keyup', verifyPasswd2);
    passwd2El.addEventListener('blur', verifyPasswd2);
    passwd2El.addEventListener('blur', verifyPasswdEqual);
  }
  usernameEl.addEventListener('keyup', verifyUsername);
  usernameEl.addEventListener('blur', verifyUsername);
  emailEl.addEventListener('keyup', verifyEmail);
  emailEl.addEventListener('blur', verifyEmail);

  function onSubmit(e) {
    e.preventDefault();

    var isPasswd = verifyPasswd();
    var isPasswd2 = verifyPasswd2();
    var isPasswdEqual = verifyPasswdEqual();
    var isUsername = verifyUsername();

    if (isPasswd && isPasswd2 && isPasswdEqual && isUsername) {
      axios
        .get('/api/verify', {
          params: { key: 'userid', value: useridEl.value.trim() },
        })
        .then(function (r) {
          if (!r.data) return verifyFalse(useridEl, useridTxt, '아이디가 사용중입니다.');
          else {
            verifyTrue(useridEl, useridTxt, '사용할 수 있습니다.');
            axios
              .get('/api/verify', {
                params: { key: 'email', value: emailEl.value.trim() },
              })
              .then(function (r) {
                if (!r.data)
                  return verifyFalse(emailEl, emailTxt, '이메일이 사용중입니다.');
                else {
                  verifyTrue(emailEl, emailTxt);
                  f.submit();
                }
              })
              .catch(function (err) {
                return verifyFalse(useridEl, useridTxt, ERR_API);
              });
          }
        })
        .catch(function (err) {
          return verifyFalse(useridEl, useridTxt, ERR_API);
        });
    }
  }

  function verifyUserid() {
    var userid = useridEl.value.trim();
    verifyReset(useridEl, useridTxt);
    if (userid === '' || userid.length < 6 || userid.length > 24) {
      return verifyFalse(
        useridEl,
        useridTxt,
        userid === '' ? '아이디를 입력하세요.' : '아이디는 6 ~ 24자 입니다.'
      );
    } else if (!validator.isAlphanumeric(userid)) {
      return verifyFalse(useridEl, useridTxt, '아이디 형식이 올바르지 않습니다.');
    } else {
      axios
        .get('/api/verify', { params: { key: 'userid', value: userid } })
        .then(function (r) {
          if (!r.data) return verifyFalse(useridEl, useridTxt, '사용중인 아이디 입니다.');
          // r.data = true or false, verify-router에서 보내줌
          else verifyTrue(useridEl, useridTxt, '사용할 수 있습니다.');
        })
        .catch(function (err) {
          return verifyFalse(useridEl, useridTxt, ERR_API);
        });
    }
  }

  function verifyPasswd() {
    var passwd = passwdEl.value.trim();
    verifyReset(passwdEl, passwdTxt);
    if (passwd === '' || passwd.length < 6 || passwd.length > 24) {
      return verifyFalse(
        passwdEl,
        passwdTxt,
        passwd === '' ? '패스워드를 입력하세요.' : '패스워드는 6 ~ 24자 입니다.'
      );
    } else {
      return verifyTrue(passwdEl, passwdTxt);
    }
  }

  function verifyPasswd2() {
    var passwd2 = passwd2El.value.trim();
    verifyReset(passwd2El, passwd2Txt);
    if (passwd2 === '' || passwd2.length < 6 || passwd2.length > 24) {
      return verifyFalse(
        passwd2El,
        passwd2Txt,
        passwd2 === '' ? '패스워드를 입력하세요.' : '패스워드는 6 ~ 24자 입니다.'
      );
    } else {
      return verifyTrue(passwd2El, passwd2Txt);
    }
  }

  function verifyPasswdEqual() {
    var passwd = passwdEl.value.trim();
    var passwd2 = passwd2El.value.trim();
    if (!(verifyPasswd() && verifyPasswd2())) {
      return false;
    }
    if (passwd !== passwd2) {
      verifyFalse(passwdEl, passwdTxt, '패스워드를 확인하세요.');
      verifyFalse(passwd2El, passwd2Txt, '패스워드를 확인하세요.');
      return false;
    } else {
      verifyTrue(passwdEl, passwdTxt);
      verifyTrue(passwd2El, passwd2Txt);
      return true;
    }
  }

  function verifyUsername() {
    var username = usernameEl.value.trim();
    verifyReset(usernameEl, usernameTxt);
    if (username === '') {
      return verifyFalse(usernameEl, usernameTxt, '이름을 확인하세요');
    } else {
      return verifyTrue(usernameEl, usernameTxt);
    }
  }

  function verifyEmail() {
    var email = emailEl.value.trim();
    verifyReset(emailEl, emailTxt);
    if (email === '') {
      return verifyFalse(emailEl, emailTxt, '이메일을 입력하세요.');
    }
    // else if(!regExp.test(email)) {
    else if (!validator.isEmail(email)) {
      return verifyFalse(emailEl, emailTxt, '이메일 형식이 맞지 않습니다.');
    } else {
      axios
        .get('/api/verify', {
          params: { key: 'email', value: email },
        })
        .then(function (r) {
          if (!r.data) return verifyFalse(emailEl, emailTxt, '사용중인 이메일 입니다.');
          // r.data = true or false, verify-router에서 보내줌
          else verifyTrue(emailEl, emailTxt);
        })
        .catch(function (err) {
          return verifyFalse(emailEl, emailTxt, ERR_API);
        });
      return verifyTrue(emailEl, emailTxt);
    }
  }

  function verifyReset(el, elTxt) {
    el.classList.remove('error');
    el.classList.remove('active');
    elTxt.classList.remove('error');
    elTxt.innerHTML = '';
  }

  function verifyFalse(el, elTxt, msg) {
    el.classList.remove('active');
    el.classList.add('error');
    elTxt.classList.add('error');
    elTxt.innerHTML = msg;
    return false;
  }

  function verifyTrue(el, elTxt, msg) {
    el.classList.add('active');
    el.classList.remove('error');
    elTxt.classList.remove('error');
    elTxt.innerHTML = msg || '';
    return true;
  }
})(document.userForm);
