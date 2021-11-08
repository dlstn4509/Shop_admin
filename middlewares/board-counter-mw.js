const { BoardCounter, Board } = require('../models');
module.exports = async (req, res, next) => {
  try {
    const ip = req.ip;
    const referrer = req.get('Referer') || req.get('Referrer') || null;
    const user_id = null;
    await BoardCounter.create({
      ip,
      referrer,
      user_id,
      board_id: req.params.id,
    });
    const count = await BoardCounter.count({
      distinct: true,
      col: 'ip',
      where: { board_id: req.params.id },
    });
    await Board.update({ readCounter: count }, { where: { id: req.params.id } });
    next();
  } catch (err) {
    next(err);
  }
};
