$('.board-container.list-page.gallery-type .list').click(onBoardListClick)
function onBoardListClick() {
  console.log(this)
  location.href = $(this).data('link') + '?boardType=gallery'
}
