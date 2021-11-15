const axios = require('axios');
const titles = [
  '좋은 상품',
  '질 좋고 저렴한 상품',
  '우아한 상품',
  '이쁘게 코디할 수 있는 상품',
  '보통 상품',
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    for (let i = 0; i < posts.length; i++) {
      products.push({
        title: titles[Math.floor(Math.random() * 5)] + '_' + i,
        priceOrigin: Math.floor(Math.random() * 300000) + 30000,
        priceSale: Math.floor(Math.random() * 300000) + 30000,
        summary: posts[i].title,
        content: posts[i].body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('product', products);
    // sequelize db:seed --seed 20211105016100-demo-product.js
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cate', null, {});
  },
};
