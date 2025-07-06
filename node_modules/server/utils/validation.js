const mongoose = require('mongoose');

const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const sanitizeInput = (input) => {
    // Basic XSS prevention
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

module.exports = {
    validateObjectId,
    validateEmail,
    sanitizeInput
};
