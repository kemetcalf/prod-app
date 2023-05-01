// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDsF4rJrn5rKh6sAJL3dfNnn0Mj-huB3Vo",
	authDomain: "firestock-8d347.firebaseapp.com",
	projectId: "firestock-8d347",
	storageBucket: "firestock-8d347.appspot.com",
	messagingSenderId: "560633765277",
	appId: "1:560633765277:web:8962bd99ed8eba474aa374",
};

// Initialize Firebase
// test to check for required firebase config by looking for missing config obj or apiKey, returns firebase object initialized
const app = () => {
	if (!firebaseConfig || !firebaseConfig.apiKey) {
		throw new Error(
			"No Firebase configuration object provided." +
				"\n" +
				"Add your web app's configuration object to firebase-config.js"
		);
	} else {
		console.log("Firebase initialized");
	}
	return initializeApp(firebaseConfig);
};

export default app;
