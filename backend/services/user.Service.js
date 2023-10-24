const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

let hashPassword = async (password) => {
    let hashPassword = await bcrypt.hashSync(password, salt);

    return hashPassword
}

module.exports = {
    hashPassword: hashPassword,
}