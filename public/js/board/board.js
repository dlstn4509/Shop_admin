$('.board-container.list-page.gallery-type .list').click(onBoardListClick);
function onBoardListClick() {
  location.href = $(this).data('link') + '?boardType=gallery';
}
