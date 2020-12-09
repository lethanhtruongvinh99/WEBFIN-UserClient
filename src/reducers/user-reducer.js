import { USER_LOGIN, ONLINE_USERS_CHANGED } from "../constants/action-types";

const initialState = {
	token: "",
	onlineUsers: [],
};

const userReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case USER_LOGIN: {
			const token = action.payload;
			const newState = {
				...state,
				token: token,
			};
			return newState;
		}
		case ONLINE_USERS_CHANGED: {
			const newState = {
				...state,
				onlineUsers: action.payload,
			}
			return newState;
		}
		default: {
			break;
		}
	}
	return state;
};

export default userReducer;
