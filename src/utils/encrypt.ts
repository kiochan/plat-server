import Mathematic from './math'
import * as crypto from 'crypto'
import * as uuidv4 from 'uuid/v4'
import * as uuidv5 from 'uuid/v5'

export default class Encrypt {

    public static encryptPassword(raw: string, salt: string): string {
        return crypto.createHash('md5').update(raw + salt, 'utf8').digest('hex');
    }

    public static generateSalt(length: number): string {
        const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        let result = '';
        for (let i = 0; i < length; i++) {
            result += range[Mathematic.getRandomInt(0, range.length)];
        }

        return result;
    }

    public static generateToken(uid: string): string {
        const ns = uuidv4();
        return uuidv5(uid, ns).replace(/-/g, '');
    }

}