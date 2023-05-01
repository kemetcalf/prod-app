import Navbar from "./Navbar";
import UploadForm from "./UploadForm";
import { Context } from "../context";
import { useContext } from "react";

function Layout({ children }) {
	const { dispatch, state } = useContext(Context);
	const toggle = (bool) => dispatch({ type: "collapse", payload: { bool } });
	return (
		<>
			<Navbar />
			<div className="container mt-5">
				{/* 3.3: conditional rendering state toggler button */}
				<button
					className="btn btn-success float-end"
					onClick={() => toggle(!state.isCollapsed)}
				>
					{state.isCollapsed ? "Close" : "+ Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm inputs={state.inputs} isVisible={state.isCollapsed} />
				{children}
			</div>
		</>
	);
}

export default Layout;
