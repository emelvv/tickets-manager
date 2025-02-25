const { Op } = require("sequelize");
const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.takeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).send();
    if (ticket.status !== "new")
      return res.status(400).json({ error: "Invalid status transition" });

    ticket.status = "in_progress";
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.completeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).send();
    if (ticket.status !== "in_progress")
      return res.status(400).json({ error: "Invalid status transition" });

    ticket.set({
      status: "completed",
      resolution: req.body.resolution,
    });
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).send();
    if (ticket.status === "completed")
      return res.status(400).json({ error: "Cannot cancel completed ticket" });

    ticket.set({
      status: "cancelled",
      cancellationReason: req.body.cancellationReason,
    });
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const where = {};
    const { date, startDate, endDate } = req.query;

    if (date) {
      where.createdAt = {
        [Op.between]: [
          new Date(date + "T00:00:00"),
          new Date(date + "T23:59:59"),
        ],
      };
    } else if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = new Date(startDate);
      if (endDate) where.createdAt[Op.lte] = new Date(endDate + "T23:59:59");
    }

    const tickets = await Ticket.findAll({ where });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelAllInProgress = async (req, res) => {
  try {
    const result = await Ticket.update(
      {
        status: "cancelled",
        cancellationReason: req.body.cancellationReason,
      },
      {
        where: { status: "in_progress" },
      }
    );

    res.json({ affectedCount: result[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
