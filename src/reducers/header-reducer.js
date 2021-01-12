import { ROOM_JOINED, ROOM_LEFT, PAGE_SWITCHED } from "../constants/action-types";

const initialState = {
    roomJoined: false,
    joinedUsers: [],
    header: {

    }
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

        case PAGE_SWITCHED: {
            return { ...state, header: action.payload }
        }

        default: {
            return state;
        }
    }
};

export default HeaderReducer;