import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
