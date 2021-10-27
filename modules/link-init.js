module.exports = {
  admin: {
    index: [],
    main: [
      { path: '/admin', path2: '/admin', src: 'b0' },
      { path: '/admin/user', path2: '/admin/user', src: 'b1' },
      { path: '/admin/prd', path2: '/admin/prd', src: 'b2' },
      { path: '/admin/order', path2: '/admin/order', src: 'b3' },
      { path: '/admin/board/init', path2: '/admin/board', src: 'b4' },
      { path: '/admin/system', path2: '/admin/system', src: 'b6' },
      {
        path: '//analytics.google.com',
        path2: '/admin/analytics',
        src: 'b9',
        target: '_blank',
      },
    ],
    user: [{ path: '', name: '회원 관리' }],
    order: [{ path: '', name: '주문 관리' }],
    prd: [
      { path: '', name: '상품 관리' },
      { path: 'cate', name: '카테고리 관리' },
    ],
    board: [
      { path: 'init', name: '게시판 관리' },
      { path: '', name: '게시물 관리' },
    ],
  },
};
