import { createContext, useReducer } from "react";

// 5.3 Challenge: Subscribe every component to global states to apply side effects and allow UI changes accordingly
// e.g allow UploadForm to subscribe to context changes instead of passing from App to Layout to UploadForm

// logic
export const Context = createContext();

const photos = [];

// isCollapsed showing false in dev tools when collapsed b/c it's set as value for isVisible attr in Layout; badly phrased/confusing
// TODO: Change isCollapsed to isOpen?
const initialState = {
	items: photos,
	count: photos.length,
	inputs: { title: null, file: null, path: null },
	isCollapsed: false,
};

const handleOnChange = (state, e) => {
	if (e.target.name === "file") {
		return {
			...state.inputs,
			file: e.target.files[0],
			path: URL.createObjectURL(e.target.files[0]),
		};
	} else {
		return { ...state.inputs, title: e.target.value };
	}
};

function reducer(state, action) {
	switch (action.type) {
		case "setItem":
			return {
				...state,
				items: [state.inputs, ...state.items],
				count: state.items.length + 1,
				inputs: { title: null, file: null, path: null },
			};
		case "setInputs":
			return {
				...state,
				inputs: handleOnChange(state, action.payload.value),
			};
		case "collapse":
			return {
				...state,
				isCollapsed: action.payload.bool,
			};
		default:
			return state;
	}
}

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
	);
};
export default Provider;
