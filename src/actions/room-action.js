export const joinRoom = (payload) =>
{
    return { type: 'JOIN_ROOM', payload: payload };
}