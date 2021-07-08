<template>
	<div class="view chat">
		<header>
			<button class="logout" v-on:click="logout">Logout</button>
			<h1 class="username">Welcome, {{ state.username }}</h1>
		</header>
		<div class="chat-box">
			<div
				v-for="message in state.messages"
				:key="message.id"
				:class="(message.username == state.username ? 'message current-user' : 'message')"
			>
				<div class="message-inner">
					<div class="username">{{ message.username }}</div>
					<div class="content">{{ message.content }}</div>
				</div>
			</div>
			<div class="scroll-top" :style="state.messages.length < 10 ? 'display: none' : 'display: inline-block'">
				<div v-on:click="scrollToTop">
					<img alt="scroll to top" src="../../../public/arrow-down-sign-to-navigate.png" />
				</div>
			</div>
		</div>
		<footer>
			<form v-on:submit.prevent="sendMessage">
				<input
					type="text"
					v-model="inputMessage"
					placeholder="Write a message..."
				>
				<input type="submit" value="Send">
			</form>
		</footer>
	</div>
</template>

<script>
import db from "@/db";
import "./Chat.scss";

export default {
	name: "Chat",
	props: ['state'],
	data() {
		return {
			inputMessage: "",
			newSate: this.state,
		};
	},
	methods: {
		sendMessage() {
			const messagesRef = db.database().ref("messages");

			if (this.inputMessage === "") return null;

			const message = {
				username: this.newSate.username,
				content: this.inputMessage,
			};

			messagesRef.push(message);
			this.inputMessage = "";
		},
		logout() {
			this.newSate.username = "";
		},
		scrollToTop() {
			window.scrollTo(0, 0);
		}
	},
	mounted() {
		const messagesRef = db.database().ref("messages");

		messagesRef.on('value', snapshot => {
			const data = snapshot.val();

			this.newSate.messages = Object.keys(data).map(key => {
				return {
					id: key,
					username: data[key].username,
					content: data[key].content,
				};
			});

			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight);
			}, 100);
		});
	}
}
</script>

<style scoped>

</style>