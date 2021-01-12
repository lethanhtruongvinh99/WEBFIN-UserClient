import { ROOM_JOINED, ROOM_LEFT, PAGE_SWITCHED } from '../constants/action-types';

export const roomJoined = (payload) =>
{
    return { type: ROOM_JOINED, payload: payload };
}

export const roomLeft = (payload) =>
{
    return { type: ROOM_LEFT };
}

export const pageSwitched = (payload) =>
{
    return { type: PAGE_SWITCHED, payload };
}