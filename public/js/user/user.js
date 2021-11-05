// 카카오 우편번호 모듈
$('#btPostcode').click(openPostcode);
function openPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      var f = document.userForm;
      var road = data.address;
      var jibun = data.jibunAddress || data.autoJibunAddress;
      var post = data.zonecode;
      f.addrPost.value = post;
      f.addrRoad.value = road;
      f.addrJibun.value = jibun;

      var extraRoadAddr = ''; // 참고 항목 변수
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr +=
          extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }
      if (data.address !== '') {
        f.addrComment.value = extraRoadAddr;
      } else {
        f.addrComment.value = '';
      }
    },
  }).open();
}

$('form[name="userDeleteForm"]').submit(onUserDelete);
function onUserDelete(e) {
  e.preventDefault();
  if (confirm('정말로 삭제하시겠습니까?')) {
    this.submit();
  }
}
