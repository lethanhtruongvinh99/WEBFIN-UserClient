import { ROOM_JOINED, ROOM_LEFT } from '../constants/action-types';

export const roomJoined = (payload) =>
{
    return { type: ROOM_JOINED, payload: payload };
}

export const roomLeft = (payload) =>
{
    return { type: ROOM_LEFT };
}