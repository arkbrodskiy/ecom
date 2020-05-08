const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
    async create(attrs) {
        attrs.id = this.generateRandomId();
        const salt = crypto.randomBytes(8).toString('hex');
        const buf = await scrypt(attrs.password, salt, 64);
        const records = await this.getAll();
        const record = {
            ...attrs,
            password: `${buf.toString('hex')}.${salt}`
        };
        records.push(record);
        await this.writeAll(records);
        return record;
    }

    async comparePasswords(savedPass, suppliedPass) {
        const [hashed, salt] = savedPass.split('.');
        const hashedSuppliedBuf = await scrypt(suppliedPass, salt, 64);
        return hashed === hashedSuppliedBuf.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');