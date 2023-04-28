import { useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import UploadForm from "./components/UploadForm";
import "./App.css";

const photos = [
	"https://picsum.photos/id/1001/200/200",
	"https://picsum.photos/id/1002/200/200",
	"https://picsum.photos/id/1003/200/200",
	"https://picsum.photos/id/1004/200/200",
	"https://picsum.photos/id/1005/200/200",
	"https://picsum.photos/id/1006/200/200",
];

function App() {
	// 3.4: form state
	const [input, setInput] = useState();
	const [items, setItems] = useState(photos);
	// 3.3: conditional rendering prop/fn
	const [isCollapsed, collapse] = useState(false);

	// 3.4: form state handlers
	const handleOnChange = (e) => setInput(e.target.value);
	const handleOnSubmit = (e) => {
		e.preventDefault();
		setItems([input, ...items]);
	};
	// 3.3: conditional rendering state toggler fn
	const toggle = () => collapse(!isCollapsed);
	return (
		<>
			<Navbar />
			<div class="container text-center mt-5">
				{/* 3.3: conditional rendering state toggler button */}
				<button className="btn btn-success float-end" onClick={toggle}>
					{isCollapsed ? "Close" : "+ Add"}
				</button>
				<div className="clearfix mb-4"></div>
				<UploadForm
					// 3.3: conditional rendering prop/fn
					isVisible={isCollapsed}
					// 3.4: form state handlers passed to form
					onChange={handleOnChange}
					onSubmit={handleOnSubmit}
				/>
				<h1>Gallery</h1>
				<div className="row">
					{items.map((photo) => (
						<Card src={photo} />
					))}
				</div>
			</div>
		</>
	);
}

export default App;
