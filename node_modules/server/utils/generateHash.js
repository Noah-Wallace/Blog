const bcrypt = require('bcryptjs');

async function generateHash(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log('Generated password hash:', hash);
        return hash;
    } catch (error) {
        console.error('Error generating hash:', error);
    }
}

// Generate hash for default password 'admin123'
generateHash('admin123');
