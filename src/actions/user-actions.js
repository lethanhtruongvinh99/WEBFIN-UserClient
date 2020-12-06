import { USER_LOGIN } from '../constants/action-types';

module.exports = {
    login: (payload) =>
    {
        return { type: USER_LOGIN, payload: payload };
    }
};
