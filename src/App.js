import { useMemo, useContext, useEffect } from "react";
import { Context } from "./context/FirestoreContext";
// import Firestore from "./handlers/firestore.js";
import { useAuthContext } from "./context/AuthContext";
import Card from "./components/Card";
import "./App.css";

// const { readDocs } = Firestore;

// Presentation
function App() {
	const { state, read } = useContext(Context);
	const { authenticate } = useAuthContext();

	const count = useMemo(() => {
		return `You have ${state.items.length} image${
			state.items.length > 1 ? "s" : ""
		}`;
	}, [state.items]);

	useEffect(() => {
		read();
		authenticate();
	}, []);

	return (
		<>
			<h1 className="text-center">Gallery</h1>
			{count}
			<div className="row">
				{state.items.map((item, index) => (
					<Card key={index} {...item} />
				))}
			</div>
		</>
	);
}

export default App;
