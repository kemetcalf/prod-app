import Navbar from "./Navbar";
import UploadForm from "./UploadForm";
import { Context } from "../context/FirestoreContext";
import { useContext } from "react";

function Layout({ children }) {
	const { dispatch, state } = useContext(Context);
	const { isOpen: isVisible, inputs } = state; // destructuring the current state
	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });
	return (
		<>
			<Navbar />
			<div className="container mt-5">
				{/* 3.3: conditional rendering state toggler button */}
				<button
					className="btn btn-success float-end"
					onClick={() => toggle(!isVisible)}
				>
					{isVisible ? "Close" : "+ Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm inputs={inputs} isVisible={isVisible} />
				{children}
			</div>
		</>
	);
}

export default Layout;
