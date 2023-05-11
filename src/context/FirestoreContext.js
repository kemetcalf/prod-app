import { createContext, useReducer, useContext } from "react";
import Firestore from "../handlers/firestore";

const { readDocs } = Firestore;

// logic
export const Context = createContext();

const photos = [];

// isCollapsed showing false in dev tools when collapsed b/c it's set as value for isVisible attr in Layout; badly phrased/confusing
// TODO: Change isCollapsed to isOpen?
const initialState = {
	items: photos,
	placeholders: photos,
	count: photos.length,
	inputs: { title: null, file: null, path: null },
	isCollapsed: false,
};

// 3.4: form state handlers handleOnChange and handleOnSubmit
// 3.5: handleOnChange given conditional state updating based on field name attr (e.target.name)- see input.name in UploadForm
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
				placeholders: [state.inputs, ...state.items],
				count: state.items.length + 1,
				inputs: { title: null, file: null, path: null },
			};
		case "filterItems":
			return {
				...state,
				items: action.payload.results,
				placeholders: action.payload.results,
			};
		case "setItems":
			return {
				...state,
				items: action.payload.items,
				placeholders: action.payload.items,
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
	const read = async () => {
		const items = await readDocs("stocks");
		dispatch({ type: "setItems", payload: { items } });
	};
	const filterItems = (input) => {
		if (input === "" || !!input) {
			dispatch({ type: "setItems", payload: { items: state.placeholders } });
		}
		let list = state.placeholders.flat();
		let results = list.filter((item) => {
			const name = item.title.toLowerCase();
			const searchInput = input.toLowerCase();
			return name.indexOf(searchInput) > -1;
		});

		dispatch({ type: "filterItems", payload: { results } });
	};
	return (
		<Context.Provider value={{ state, dispatch, read }}>
			{children}
		</Context.Provider>
	);
};

export const useFirestoreContext = () => {
	return useContext(Context);
};

export default Provider;
