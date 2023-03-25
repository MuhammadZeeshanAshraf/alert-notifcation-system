export const DEFAULT_DATABASE_CONNECTION = 'default';
export const PAGER_DATABASE_CONNECTION = 'pager';
export const USER_GROUP_BY_ALERT_TYPE_KEY = 'alertType';

export enum ALERT_TYPE {
    SMS = 'SMS',
    EMAIL = 'email',
  };
  
  export enum LEVEL_TYPE {
    LEVEL_1 = 'level_1',
    LEVEL_2 = 'level_2',
    LEVEL_3 = 'level_3',
  };
export const RESPONSE_MESSAGE = {
    DOES_NOT_EXIST: '%d does not exist!',
    ALREADY_EXIST: '%d already exist!',
    NO_TARGET_USERS: 'No target user found aganist the alert of the monitored service!',
    INTERNAL_SERVER_ERROR:
        "We're sorry, but our server encountered an unexpected error while processing your request. Please try again later, or contact our support team if the problem persists. We apologize for any inconvenience this may have caused",
};
export const NODE_ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};
export const RESPONSE_STATUS = {
    SUCCESS: true,
    FAIL: false,
};