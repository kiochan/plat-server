export default class Mathematic {

    /**
     * get random number between start to end in Integer.
     */
    public static getRandomInt(start: number, end: number): number {
        return Math.round(Math.random() * (end - start)) + start;
    }

}