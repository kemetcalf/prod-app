import { useMemo, useContext, useEffect } from "react";
import { Context } from "./context";
import Firestore from "./handlers/firestore.js";
import Layout from "./components/Layout";
import Card from "./components/Card";
import "./App.css";

const { readDocs } = Firestore;

// Presentation
function App() {
	const { state } = useContext(Context);

	const count = useMemo(() => {
		return `You have ${state.items.length} image${
			state.items.length > 1 ? "s" : ""
		}`;
	}, [state.items]);

	useEffect(() => {
		readDocs().then(console.log);
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
