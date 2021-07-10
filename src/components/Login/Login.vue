<template>
	<div class="view login">
		<form class="login-form" v-on:submit.prevent="login">
			<div class="form-inner">
				<h1>Login to chat</h1>
				<label for="chat-room">Chat room</label>
				<input
					id="chat-room"
					v-model="chatRoom"
					type="text"
					placeholder="Please enter your chat room"
				/>
				<label for="username">Username</label>
				<input
					id="username"
					v-model="username"
					type="text"
					placeholder="Please enter your username"
				/>
				<input type="submit" value="Login"/>
			</div>
		</form>
	</div>
</template>

<script>
import "./Login.scss";

export default {
	name: "Login",
	data() {
		return {
			username: "",
			chatRoom: "",
		};
	},
	methods: {
		login() {
			if (this.username !== "" || this.chatRoom !== "") {
				// send data to parent component
				const data = {
					username: this.username,
					chatRoom: this.chatRoom,
				};
				this.$emit("retrieveData", data);
			}
		},
	},
}
</script>