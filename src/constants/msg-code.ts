export default class MsgCode {
    public static readonly OK: string = 'OK';

    public static readonly HTTP_INVALID_PARAM: string = 'HTTP_INVALID_PARAM';

    public static readonly EMAIL_REQUIRED: string = 'EMAIL_REQUIRED';
    public static readonly USERNAME_REQUIRED: string = 'USERNAME_REQUIRED';
    public static readonly PASSWORD_REQUIRED: string = 'PASSWORD_REQUIRED';

    public static readonly EMAIL_INVALID: string = 'EMAIL_INVALID';
    public static readonly USERNAME_INVALID: string = 'USERNAME_INVALID';
    public static readonly PASSWORD_INVALID: string = 'PASSWORD_INVALID';

    public static readonly EMAIL_OCCUPIED: string = 'EMAIL_OCCUPIED';
    public static readonly USERNAME_OCCUPIED: string = 'USERNAME_OCCUPIED';

    public static readonly EMAIL_NOT_FOUND: string = 'EMAIL_NOT_FOUND';
    public static readonly USERNAME_NOT_FOUND: string = 'USERNAME_NOT_FOUND';
    public static readonly PASSWORD_INCORRECT: string = 'PASSWORD_INCORRECT';

    public static readonly DB_FAILED: string = 'DB_FAILED';

}