import { useEffect, useReducer, useMemo } from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";

import "./App.css";

const photos = [];

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

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	// 3.3: conditional rendering state toggler fn
	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });

	// 3.4: form state handlers handleOnChange and handleOnSubmit
	// 3.5: handleOnChange given conditional state updating based on field name attr (e.target.name)- see input.name in UploadForm
	const handleOnChange = (e) =>
		dispatch({ type: "setInputs", payload: { value: e } });
	const handleOnSubmit = (e) => {
		e.preventDefault();
		// 3.5 inputs.path adds the specific path to access img, instead of just inputs obj (will not display image)

		dispatch({ type: "setItem" });

		toggle(!state.isCollapsed);
	};

	useEffect(() => {}, [state.items]);

	const count = useMemo(() => {
		return `You have ${state.items.length} image${
			state.items.length > 1 ? "s" : ""
		}`;
	}, [state.items]);

	return (
		<Layout
			state={state}
			onChange={handleOnChange}
			onSubmit={handleOnSubmit}
			toggle={toggle}
		>
			<h1 className="text-center">Gallery</h1>
			{count}
			<div className="row">
				{state.items.map((photo, index) => (
					<Card key={index} src={photo.path} />
				))}
			</div>
		</Layout>
	);
}

export default App;
