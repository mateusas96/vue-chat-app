<template>
	<div class="view login" v-if="state.username === ''">
		<form class="login-form" v-on:submit.prevent="login">
			<div class="form-inner">
				<h1>Login to chat</h1>
				<label for="username">Username</label>
				<input
					id="username"
					v-model="inputUsername"
					type="text"
					placeholder="Please enter your username"
				/>
				<input type="submit" value="Login"/>
			</div>
		</form>
	</div>
	<div class="view chat" v-else>
		<header>
			<button class="logout" v-on:click="logout">Logout</button>
			<h1 class="username">Welcome, {{ state.username }}</h1>
		</header>
		<div class="scrollable">
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
import {reactive} from 'vue';
import db from './db';
import "./App.scss";

export default {
	name: 'App',
	components: {},
	data() {
		return {
			inputUsername: "",
			inputMessage: "",
			state: reactive({
				username: "",
				messages: [],
			})
		};
	},
	methods: {
		login() {
			if (this.inputUsername !== "" || this.inputUsername !== null) {
				this.state.username = this.inputUsername;
				this.inputUsername = "";
			}
		},
		sendMessage() {
			const messagesRef = db.database().ref("messages");

			if (this.inputMessage === "") return null;

			const message = {
				username: this.state.username,
				content: this.inputMessage,
			};

			messagesRef.push(message);
			this.inputMessage = "";
		},
		logout() {
			this.state.username = "";
		}
	},
	mounted() {
		const messagesRef = db.database().ref("messages");

		messagesRef.on('value', snapshot => {
			const data = snapshot.val();

			this.state.messages = Object.keys(data).map(key => {
				return {
					id: key,
					username: data[key].username,
					content: data[key].content,
				};
			});
		});
	}
}
</script>
