const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticket.controller");

router.post('/', controller.createTicket);
router.put('/:id/take', controller.takeTicket);
router.put('/:id/complete', controller.completeTicket);
router.put('/:id/cancel', controller.cancelTicket);
router.get('/', controller.getTickets);
router.put('/cancel-all-in-progress', controller.cancelAllInProgress);

module.exports = router;
