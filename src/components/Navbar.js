import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LogIn = () => {
	const { login, currentUser } = useAuthContext();
	return (
		!currentUser && (
			<button type="button" className="btn btn-warning" onClick={login}>
				Login
			</button>
		)
	);
};

const LogOut = () => {
	const { logout, currentUser } = useAuthContext();
	return (
		!!currentUser && (
			<button type="button" className="btn btn-danger" onClick={logout}>
				LogOut
			</button>
		)
	);
};

function Dropdown() {
	const { currentUser } = useAuthContext();

	const username = useMemo(() => {
		return currentUser?.displayName || "Profile";
	}, [currentUser]);

	const avatar = useMemo(() => {
		return !!currentUser ? (
			<img
				className="avatar"
				src={currentUser?.photoURL}
				alt={currentUser?.displayName}
				width="34"
				height="34"
			/>
		) : (
			"Login"
		);
	}, [currentUser]);

	return (
		<ul className="navbar-nav mb-2 mb-lg-0">
			{" "}
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle"
					href="#"
					id="navbarDropdown"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{avatar}
				</a>
				<ul
					className="dropdown-menu dropdown-menu-end"
					aria-labelledby="navbarDropdown"
				>
					<li>
						<a className="dropdown-item text-center" href="#">
							{currentUser && <Link to="/profile">{username}</Link>}
						</a>
						<hr className="dropdown divider" />
					</li>
					<div className="d-flex justify-content-center">
						<LogIn />
						<LogOut />
					</div>
				</ul>
			</li>
		</ul>
	);
}

function Navigation() {
	const { currentUser } = useAuthContext();
	return (
		<ul className="navbar-nav me-auto mb-2 mb-lg-0">
			{/* remove all links except HOME */}
			<li className="nav-item">
				<Link className="nav-link active" aria-current="page" to="/">
					Home
				</Link>
			</li>
			<li>
				{currentUser && (
					<Link
						className="nav-link active"
						aria-current="page"
						to="/stockimages"
					>
						My Stock Images
					</Link>
				)}
			</li>
		</ul>
	);
}

function Search() {
	return (
		<form className="d-flex">
			<input
				className="form-control me-2"
				type="search"
				placeholder="Search"
				aria-label="Search"
			/>
			<button className="btn btn-outline-success" type="submit">
				Search
			</button>
		</form>
	);
}

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
					<Navigation />
					<Search />
					<Dropdown />
				</div>
			</div>
		</nav>
	);
}
export default Navbar;
