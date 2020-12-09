import { USER_LOGIN, ONLINE_USERS_CHANGED } from '../constants/action-types';

export const login = (payload) =>
{
    return { type: USER_LOGIN, payload: payload };
}

export const onlineUsersChanged = (payload) => {
    return { type: ONLINE_USERS_CHANGED, payload: payload };
}