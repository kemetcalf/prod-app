import { useEffect, useState, useReducer } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import UploadForm from "./components/UploadForm";
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

	const [count, setCount] = useState();

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

	// TODO: Hard-coded photos not rendering; new image rendering, but not affecting state count; state below goofy
	useEffect(() => {}, [state.items]);

	// takes callback fn and list of dependencies
	useEffect(() => {
		setCount(
			`You have ${state.items.length} image${state.items.length > 1 ? "s" : ""}`
		);
	}, [state.items]);

	return (
		<>
			<Navbar />
			<div className="container text-center mt-5">
				{/* 3.3: conditional rendering state toggler button */}
				<button
					className="btn btn-success float-end"
					onClick={() => toggle(!state.isCollapsed)}
				>
					{state.isCollapsed ? "Close" : "+ Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm
					// 3.7: pass the inputs arr to form
					inputs={state.inputs}
					// 3.3: conditional rendering prop/fn
					isVisible={state.isCollapsed}
					// 3.4: form state handlers passed to form
					onChange={handleOnChange}
					onSubmit={handleOnSubmit}
				/>
				<h1>Gallery</h1>
				{count}
				<div className="row">
					{state.items.map((photo, index) => (
						<Card key={index} src={photo.path} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
