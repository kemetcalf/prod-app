import Navigation from "./Navigation";
import Search from "./Search";
import Dropdown from "./Dropdown";

function Navbar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					⚡ Firestock
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{/* pages to navigate to */}
					<Navigation />
					{/* Navbar search field */}
					<Search />
					{/* Actual dropdown menu */}
					<Dropdown />
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
