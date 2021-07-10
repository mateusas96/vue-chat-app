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
			state: {
				username: "",
				chatRoom: "",
				messages: [],
			},
		};
	},
	methods: {
		retrieveData(data) {
			// retrieve data from child component and set
			this.state.username = data.username;
			this.state.chatRoom = data.chatRoom;
		}
	}
}
</script>
