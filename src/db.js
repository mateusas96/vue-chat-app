import firebase from "firebase/app";
import "firebase/database";

const config = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	databaseURL: "https://vue-chat-app-36ce0-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId
};

const db = firebase.initializeApp(config);
export default db;