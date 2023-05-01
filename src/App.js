import { useEffect, useMemo, useContext } from "react";
import app from "./lib/firebase.config";
import Layout from "./components/Layout";
import Card from "./components/Card";
import { Context } from "./context";
import "./App.css";

// Presentation
function App() {
	const { state } = useContext(Context);

	const count = useMemo(() => {
		return `You have ${state.items.length} image${
			state.items.length > 1 ? "s" : ""
		}`;
	}, [state.items]);

	// test to return firebase object on page render; see firebase.config.js
	useEffect(() => {
		app();
	}, []);

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
