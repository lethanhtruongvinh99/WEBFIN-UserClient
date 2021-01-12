import { ROOM_JOINED, ROOM_LEFT, PAGE_SWITCHED } from "../constants/action-types";

const initialState = {
    roomJoined: false,
    joinedUsers: [],
    isHost: false,
    isAvailable: false,
};

const HeaderReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case ROOM_JOINED: {
            return { ...state, roomJoined: true, isHost: action.payload.isHost, isAvailable: action.payload.isAvailable };
        }

        case ROOM_LEFT: {
            return { ...state, roomJoined: false }
        }

        case PAGE_SWITCHED: {
            return { ...state, header: action.payload }
        }

        default: {
            return state;
        }
    }
};

export default HeaderReducer;