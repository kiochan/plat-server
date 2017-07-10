export default class Time {
    public static dateToStr(t: number, y?: string): string {
        y = y ? y : 'yyyy-MM-dd hh:mm:ss';
        const x: Date = new Date(t);
        const z: Object = {
            y: x.getFullYear(),
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
            return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
        });
    }
}