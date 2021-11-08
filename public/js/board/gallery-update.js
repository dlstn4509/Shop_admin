function onDeleteFile(id, el) {
  if (confirm('파일을 삭제하시겠습니까?\n삭제하신 파일은 되돌릴 수 없습니다.')) {
    axios
      .delete('/admin/api/file/' + id)
      .then(onSuccess)
      .catch(onError);
  }
  function onSuccess(r) {
    if (r.data.code == 200) $(el.parentNode).empty();
  }
  function onError(err) {
    console.log(err);
    console.log(err.response);
  }
}
