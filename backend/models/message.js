const { pool } = require("../config/database");

const Message = {
    create: async (name, email, message) => {
        const query = `
      INSERT INTO messages (name, email, message)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, message, timestamp;
    `;
        const result = await pool.query(query, [
            name.trim(),
            email.trim().toLowerCase(),
            message.trim(),
        ]);
        return result.rows[0];
    },

    findAll: async (limit = 50, offset = 0) => {
        const countResult = await pool.query("SELECT COUNT(*) FROM messages;");
        const total = parseInt(countResult.rows[0].count);

        const query = `
      SELECT id, name, email, message, timestamp
      FROM messages
      ORDER BY timestamp DESC
      LIMIT $1 OFFSET $2;
    `;
        const result = await pool.query(query, [limit, offset]);

        return {
            data: result.rows,
            total,
            hasMore: offset + limit < total,
        };
    },

    findById: async (id) => {
        const query = "SELECT * FROM messages WHERE id = $1;";
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    },

    deleteById: async (id) => {
        const query = "DELETE FROM messages WHERE id = $1 RETURNING id;";
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    },
};

module.exports = Message;
