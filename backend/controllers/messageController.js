const Message = require("../models/message");
const { validateMessage } = require("../middleware/validation");

const createMessage = async (req, res) => {
    try {
        const validation = validateMessage(req.body);
        if (!validation.valid) {
            return res
                .status(400)
                .json({ success: false, message: validation.error });
        }

        const { name, email, message } = req.body;
        const newMessage = await Message.create(name, email, message);

        res.status(201).json({
            success: true,
            message: "Message sent",
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating message",
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 50, 100);
        const offset = Math.max(parseInt(req.query.offset) || 0, 0);

        const result = await Message.findAll(limit, offset);

        res.json({
            success: true,
            data: result.data,
            pagination: {
                total: result.total,
                limit,
                offset,
                hasMore: result.hasMore,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching messages",
        });
    }
};

const getMessage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(parseInt(id))) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid ID" });
        }

        const message = await Message.findById(id);
        if (!message) {
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        }

        res.json({ success: true, data: message });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching message",
        });
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!Number.isInteger(parseInt(id))) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid ID" });
        }

        const deleted = await Message.deleteById(id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Not found" });
        }

        res.json({ success: true, message: "Deleted" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting message",
        });
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    deleteMessage,
};
