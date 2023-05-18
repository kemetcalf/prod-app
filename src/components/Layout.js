import Navbar from "./Navbar";
// import UploadForm from "./UploadForm";
import { Context } from "../context/FirestoreContext";
import { useContext } from "react";

function Layout({ children }) {
	const { dispatch, state } = useContext(Context);

	return (
		<>
			<Navbar />
			<div className="container mt-5">
				{/* 3.3: conditional rendering state toggler button */}

				{children}
			</div>
		</>
	);
}

export default Layout;
