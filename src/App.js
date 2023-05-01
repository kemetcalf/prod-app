import { useEffect, useReducer, useMemo, useContext } from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";
import { Context } from "./context";
import "./App.css";

// Presentation
function App() {
	const { dispatch, state } = useContext(Context);

	// 3.3: conditional rendering state toggler fn
	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });

	// 3.4: form state handlers handleOnChange and handleOnSubmit
	// 3.5: handleOnChange given conditional state updating based on field name attr (e.target.name)- see input.name in UploadForm
	const handleOnChange = (e) =>
		dispatch({ type: "setInputs", payload: { value: e } });

	const handleOnSubmit = (e) => {
		e.preventDefault();
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
				{state.items.map((item, index) => (
					<Card key={index} {...item} />
				))}
			</div>
		</Layout>
	);
}

export default App;
