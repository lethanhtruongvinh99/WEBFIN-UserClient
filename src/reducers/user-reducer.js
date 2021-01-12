import { USER_LOGIN, ONLINE_USERS_CHANGED, LOG_OUT, ADD_INVITATION, DELETE_INVITATION, SET_INVITATIONS } from "../constants/action-types";

const initialState = {
	token: "",
	onlineUsers: [],
	invitations: [],
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
			const username = localStorage.getItem("username");
			const filteredOnlineUsers = action.payload.filter(item => item.username !== username);
			const newState = {
				...state,
				onlineUsers: filteredOnlineUsers,
			}
			return newState;
		}
		case LOG_OUT: {
			const newState = {
				...state,
				token: '',
			}
			return newState;
		}

		case SET_INVITATIONS: {
			return {
				...state,
				invitations: action.payload,
			}
		}
		default: {
			return state;
		}
	}
};

export default userReducer;
