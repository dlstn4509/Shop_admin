function onDeleteFile(id, el) {
  if (confirm('파일을 삭제하시겠습니까?\n삭제하신 파일은 되돌릴 수 없습니다.')) {
    axios
      .delete('/admin/api/file/' + id)
      .then(onSuccess)
      .catch(onError);
  }
  function onSuccess(r) {
    if (r.data.code == 200) {
      var html = `<input type="file" name="${$(el).data(
        'name'
      )}" class="form-control-file mb-2" />`;
      $(el).parent().after(html);
      $(el).parent().remove();
      // $(el).parent().parent().append(html);
      // $(el) = button
      // parent -> file-wrap
    }
  }
  function onError(err) {
    console.log(err);
    console.log(err.response);
  }
}
