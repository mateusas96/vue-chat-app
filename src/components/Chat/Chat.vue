<template>
	<div class="view chat">
		<header>
			<button class="logout" v-on:click="logout">Logout</button>
			<h1 class="username">Welcome, {{ newSate.username }}</h1>
		</header>
		<div class="chat-box" :onscroll="scrollListener">
			<div class="chat-room">
				Chat room: {{ newSate.chatRoom }}
			</div>
			<div
				v-for="message in newSate.messages"
				:key="message.id"
				:class="(message.username == newSate.username ? 'message current-user' : 'message')"
			>
				<div class="message-inner">
					<div class="username">{{ message.username }}</div>
					<div class="content">{{ message.content }}</div>
					<div class="created-at">Sent {{fromNow(message.created_at)}}</div>
				</div>
			</div>
			<div
				class="scroll-to"
				:style="newSate.messages.length < 10 ? 'display: none' : 'display: inline-block'"
				v-on:click="scrollTo"
			>
					<img alt="scroll to top" src="../../../public/arrow-down-sign-to-navigate.png" />
			</div>
		</div>
		<footer>
			<form v-on:submit.prevent="sendMessage">
				<textarea
					v-model="inputMessage"
					placeholder="Write a message..."
					v-on:keydown.enter="(e) => {
						sendMessage();
						// prevent to make a new line
						e.preventDefault();
					}"
				/>
				<input type="submit" value="Send">
			</form>
		</footer>
	</div>
</template>

<script>
import database from "../Database/Database";
import moment from "moment";
import "./Chat.scss";

export default {
	name: "Chat",
	props: ['state'],
	data() {
		return {
			inputMessage: "",
			newSate: this.state,
			chatBoxDiv: "",
			scrollToDiv: "",
		};
	},
	methods: {
		sendMessage() {
			// get "messages" reference from database
			const messagesRef = database.database().ref(`${this.newSate.chatRoom}/messages`);

			// if message is empty do nothing
			if (this.inputMessage === "") return null;

			// set message object
			const message = {
				username: this.newSate.username,
				content: this.inputMessage,
				created_at: Date.now(),
			};

			// save message in database
			messagesRef.push(message);
			// clear message
			this.inputMessage = "";
		},
		logout() {
			/*
			* clear username in state
			* by this auto logout happens
			*/
			this.newSate.username = "";
			this.newSate.chatRoom = "";
			this.newSate.messages = [];
		},
		rotateArrowToLookUp() {
			// set styles for each browser
			this.scrollToDiv.style.transform = "rotate(-180deg)";
			this.scrollToDiv.style.mozTransform = "rotate(-180deg)";
			this.scrollToDiv.style.oTransform = "rotate(-180deg)";
			this.scrollToDiv.style.msTransform = "rotate(-180deg)";
		},
		rotateArrowToLookDown() {
			// set styles for each browser
			this.scrollToDiv.style.transform = "rotate(0deg)";
			this.scrollToDiv.style.mozTransform = "rotate(0deg)";
			this.scrollToDiv.style.oTransform = "rotate(0deg)";
			this.scrollToDiv.style.msTransform = "rotate(0deg)";
		},
		scrollTo() {
			/*
			* scroll to bottom, if current Y coordinate is less than scroll height
			* otherwise scroll to top
			*/
			if (this.chatBoxDiv.scrollTop <= (this.chatBoxDiv.scrollHeight % 2)) {
				this.chatBoxDiv.scrollTo(0, this.chatBoxDiv.scrollHeight);
			} else if (this.chatBoxDiv.scrollTop > (this.chatBoxDiv.scrollHeight % 2)) {
				this.chatBoxDiv.scrollTo(0, 0);
			}
		},
		scrollListener(event) {
			/*
			* if current Y coordinate is less than scroll height, then rotate "scroll to" button arrow to look down
			* otherwise rotate to look up
			*/
			if (event.path[0].scrollTop <= (this.chatBoxDiv.scrollHeight % 2)) {
				this.rotateArrowToLookDown();
			} else if (event.path[0].scrollTop > (this.chatBoxDiv.scrollHeight % 2)) {
				this.rotateArrowToLookUp();
			}
		},
		fromNow(createdAt) {
			return moment(createdAt).fromNow();
		}
	},
	mounted() {
		// get and set "chat-box" div element
		this.chatBoxDiv = document.getElementsByClassName("chat-box")[0];
		// get and set "scroll-to" div element
		this.scrollToDiv = document.getElementsByClassName("scroll-to")[0];
		// get "messages" reference from database
		const messagesRef = database.database().ref(`${this.newSate.chatRoom}/messages`);

		// listen for changes and retrieve data from database
		messagesRef.on('value', snapshot => {
			// check if snapshot "messages" exists
			if (snapshot.exists()) {
				// temporary save data from snapshot
				const data = snapshot.val();

				// save messages data from "data" object
				this.newSate.messages = Object.keys(data).map(key => {
					return {
						id: key,
						username: data[key].username,
						content: data[key].content,
						created_at: data[key].created_at,
					};
				});

				// wait 100ms to load all the data in HTML and automatically scroll to bottom of the chat
				setTimeout(() => {
					this.chatBoxDiv.scrollTo(0, this.chatBoxDiv.scrollHeight);
				}, 100);
			}
		});
	},
}
</script>