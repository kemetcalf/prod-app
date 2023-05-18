import { useMemo, useContext, useEffect } from "react";
import { Context } from "./context/FirestoreContext";
// import Firestore from "./handlers/firestore.js";
import { useAuthContext } from "./context/AuthContext";
import UploadForm from "./components/UploadForm";
import List from "./components/List";
import "./App.css";

// const { readDocs } = Firestore;

// Presentation
function App() {
	const { dispatch, state, read } = useContext(Context);
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

	const { isOpen: isVisible, inputs } = state; // destructuring the current state
	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });

	return (
		<>
			<button
				className="btn btn-success float-end"
				onClick={() => toggle(!isVisible)}
			>
				{isVisible ? "Close" : "+ Add"}
			</button>
			<div className="clearfix mb-4"></div>
			<UploadForm inputs={inputs} isVisible={isVisible} />
			<h1 className="text-center">Gallery</h1>
			{count}
			<List items={state.items} />
		</>
	);
}

export default App;
