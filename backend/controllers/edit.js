const { connection } = require("../database/db_connection");

const updateUser = (req, res) => {
    const { id, name, email, phone } = req.body;

    if (!id || !name || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const updateUserQuery = `UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?`;

    connection.query(updateUserQuery, [name, email, phone, id], (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Error updating user', error });
        }
        res.json({ success: true, message: 'User updated successfully' });
    });
};

module.exports = { updateUser };