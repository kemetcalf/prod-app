import {
	createContext,
	useReducer,
	useContext,
	useMemo,
	useCallback,
} from "react";
import Firestore from "../handlers/firestore";

const { readDocs } = Firestore;

// logic
export const Context = createContext();

const photos = [];

const initialState = {
	id: null,
	items: photos,
	placeholders: photos,
	count: photos.length,
	inputs: { title: null, file: null, path: null },
	isOpen: false,
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
	// console.log(action.type);
	// console.log(state.inputs);
	switch (action.type) {
		case "filterItems":
			return {
				...state,
				items: action.payload.results,
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
		case "clearInputs":
			return {
				...state,
				inputs: { title: null, file: null, path: null },
			};
		case "collapse":
			return {
				...state,
				isOpen: action.payload.bool,
			};
		default:
			return state;
	}
}

const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const filterItems = useCallback(
		(input) => {
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
		},
		[state.placeholders]
	);

	const value = useMemo(() => {
		const read = async () => {
			const items = await readDocs("stocks");
			dispatch({ type: "setItems", payload: { items } });
		};
		const collapseForm = () => {
			if (state.isOpen) {
				dispatch({ type: "collapse", payload: false });
			}
		};
		return {
			state,
			dispatch,
			read,
			collapseForm,
			filterItems,
		};
	}, [state, dispatch, filterItems]);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFirestoreContext = () => {
	return useContext(Context);
};

export default Provider;
