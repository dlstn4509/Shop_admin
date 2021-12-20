const { pool } = require('../../modules/mysql-init');

const findUser = async () => {
  let sql = `SELECT * FROM user `;
  const [user] = await pool.execute(sql);
  return { success: true, user: user };
};

const deleteUser = async () => {
  let sql = `UPDATE user SET status='1' WHERE id='1'`;
  const [user] = await pool.execute(sql);
  return { success: true, user: user };
};

module.exports = { findUser, deleteUser };
