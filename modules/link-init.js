module.exports = {
  admin: {
    index: [],
    main: [
      { path: '/admin/main', link: '/admin/main', src: 'b0' },
      { path: '/admin/user', link: '/admin/user', src: 'b1' },
      { path: ['/admin/prd', '/admin/cate'], link: '/admin/prd', src: 'b2' },
      { path: '/admin/order', link: '/admin/order', src: 'b3' },
      { path: ['/admin/board', '/admin/binit'], link: '/admin/binit', src: 'b4' },
      // { path: '/admin/system', link: '/admin/system', src: 'b6' },
      {
        path: '//analytics.google.com',
        link: '//analytics.google.com',
        src: 'b9',
        target: '_blank',
      },
    ],
    user: [{ path: '/admin/user', name: '회원 관리' }],
    order: [{ path: '/admin/order', name: '주문 관리' }],
    prd: [
      { path: '/admin/prd', name: '상품 관리' },
      { path: '/admin/cate', name: '카테고리 관리' },
    ],
    cate: [
      { path: '/admin/prd', name: '상품 관리' },
      { path: '/admin/cate', name: '카테고리 관리' },
    ],
    binit: [
      { path: '/admin/binit', name: '게시판 관리' },
      { path: '/admin/board', name: '게시물 관리' },
    ],
    board: [
      { path: '/admin/binit', name: '게시판 관리' },
      { path: '/admin/board', name: '게시물 관리' },
    ],
  },
};
