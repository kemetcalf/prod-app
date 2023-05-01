import { useEffect, useMemo, useContext } from "react";
import Layout from "./components/Layout";
import Card from "./components/Card";
import { Context } from "./context";
import "./App.css";

// Presentation
function App() {
	const { state } = useContext(Context);

	// 3.4: form state handlers handleOnChange and handleOnSubmit
	// 3.5: handleOnChange given conditional state updating based on field name attr (e.target.name)- see input.name in UploadForm

	useEffect(() => {}, [state.items]);

	const count = useMemo(() => {
		return `You have ${state.items.length} image${
			state.items.length > 1 ? "s" : ""
		}`;
	}, [state.items]);

	return (
		<Layout>
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
