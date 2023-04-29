import { useEffect, useState } from "react";
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
	const [count, setCount] = useState();
	// 3.4: form state
	// 3.5: inputs obj given title, file, path
	const [inputs, setInputs] = useState({ title: null, file: null, path: null });
	const [items, setItems] = useState(photos);
	// 3.3: conditional rendering prop/fn
	const [isCollapsed, collapse] = useState(false);
	// 3.3: conditional rendering state toggler fn
	const toggle = () => collapse(!isCollapsed);

	// 3.4: form state handlers handleOnChange and handleOnSubmit
	// 3.5: handleOnChange given conditional state updating based on field name attr (e.target.name)- see input.name in UploadForm
	const handleOnChange = (e) => {
		if (e.target.name === "file") {
			setInputs({
				...inputs,
				file: e.target.files[0],
				path: URL.createObjectURL(e.target.files[0]),
			});
		} else {
			setInputs({ ...inputs, title: e.target.value });
		}
	};
	const handleOnSubmit = (e) => {
		e.preventDefault();
		// 3.5 inputs.path adds the specific path to access img, instead of just inputs obj (will not display image)
		setItems([inputs.path, ...items]);
	};

	// takes callback fn and list of dependencies
	useEffect(() => {
		setCount(`You have ${items.length} image${items.length > 1 ? "s" : ""}`);
	}, [items]);

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
					// 3.7: pass the inputs arr to form
					inputs={inputs}
					// 3.3: conditional rendering prop/fn
					isVisible={isCollapsed}
					// 3.4: form state handlers passed to form
					onChange={handleOnChange}
					onSubmit={handleOnSubmit}
				/>
				{count}
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
