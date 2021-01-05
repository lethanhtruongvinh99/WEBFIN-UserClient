import { ROOM_JOINED, ROOM_LEFT } from "../constants/action-types";

const initialState = {
    roomJoined: false,
    joinedUsers: []
};

const HeaderReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case ROOM_JOINED: {
            return { ...state, roomJoined: true, joinedUsers: action.payload };
        }

        case ROOM_LEFT: {
            return { ...state, roomJoined: false }
        }

        default: {
            return state;
        }
    }
};

export default HeaderReducer;