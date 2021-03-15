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
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch(err) { next(err) }
})

router.put('/:id', checkAccountId, checkAccountNameUnique, (req, res, next) => {
  try {
    res.json({ msg: "put" })
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
