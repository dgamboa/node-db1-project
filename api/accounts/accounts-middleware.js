const Account = require('../accounts/accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing user data"});
  } else if (!req.body.budget || !req.body.name) {
    res.status(400).json({ message: "missing required field"});
  } else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    const checkName = accounts.filter(a => a.name === req.body.name);
    console.log(checkName.length)
    if (checkName.length !== 0) {
      res.status(500).json({ message: "name should be unique" });
    } else {
      next();
    }
  } catch(err) { next(err) }
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await Account.getById(id);
    if (account) {
      req.account = account;
      next();
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) { next(err) }
}