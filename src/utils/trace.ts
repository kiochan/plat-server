import Config from '../config'
import Time from './time'

export default class Trace {

    public static info(msg: any): void {
        console.log(Trace.genMsg(msg));
    }

    public static warn(msg: any): void {
        if (Config.debug) {
            console.warn(Trace.genMsg(msg));
        }
    }

    public static error(msg: any): void {
        if (Config.debug) {
            console.error(Trace.genMsg(msg));
        }
    }

    private static genMsg(msg: any): string {
        return `[${Time.dateToStr(new Date().getTime())}] ${msg}`;
    }

}