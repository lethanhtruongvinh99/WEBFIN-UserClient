import { USER_LOGIN, ONLINE_USERS_CHANGED, LOG_OUT } from '../constants/action-types';

export const login = (payload) =>
{
    return { type: USER_LOGIN, payload: payload };
}

export const onlineUsersChanged = (payload) =>
{
    return { type: ONLINE_USERS_CHANGED, payload: payload };
}

export const logout = (payload) =>
{
    return { type: LOG_OUT, payload: payload };
}