import Mathematic from './math'
import * as crypto from 'crypto'

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

}