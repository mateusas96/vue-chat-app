<template>
	<Login
		v-if="state.username === ''"
		@retrieveData="retrieveData($event)"
	/>
	<Chat
		v-else
		:state="state"
	/>
</template>

<script>
import "./App.scss";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

export default {
	name: 'App',
	components: {
		Login,
		Chat
	},
	data() {
		return {
			inputUsername: "",
			state: {
				username: "",
				messages: [],
			},
		};
	},
	methods: {
		retrieveData(username) {
			// retrieve data from child component and set
			this.inputUsername = username;
			this.state.username = username;
		}
	}
}
</script>
