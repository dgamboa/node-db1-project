const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({ id }).first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account, ['id']);
  return getById(id);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  const accountToDelete = await getById(id);
  await db('accounts').where({ id }).del();
  return accountToDelete;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
