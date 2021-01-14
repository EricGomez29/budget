const { Router } = require('express');
// import all routers;
const operationsRouter = require('./operations');


var router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use('/operations', operationsRouter)    

module.exports = router;