import { USER_LOGIN } from "../constants/action-types";

const initialState = {
	token: "",
};

const userReducer = (state = initialState, action) =>
{
	switch (action.type)
	{
		case USER_LOGIN: {
			const token = action.payload;
			const newState = {
				...initialState,
				token: token,
			};
			return newState;
		}
		default: {
			break;
		}
	}
	return state;
};

export default userReducer;
