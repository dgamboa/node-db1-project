const router = require('express').Router()
const Account = require('./accounts-model');
const { checkAccountPayload, 
        checkAccountNameUnique,
        checkAccountId } = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch(err) { next(err) }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  try {
    res.json(req.account);
  } catch(err) { next(err) }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const accountClean = {
    budget: parseInt(req.body.budget),
    name: req.body.name.trim()
  }

  try {
    const newAccount = await Account.create(accountClean);
    res.status(201).json(newAccount);
  } catch(err) { next(err) }
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await Account.updateById(req.params.id, req.body);
    res.json(account);
  } catch(err) { next(err) }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const accountDeleted = await Account.deleteById(req.params.id);
    res.json(accountDeleted);
  } catch(err) { next(err) }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
