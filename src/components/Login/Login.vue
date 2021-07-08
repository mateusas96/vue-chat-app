<template>
	<div class="view login">
		<form class="login-form" v-on:submit.prevent="login">
			<div class="form-inner">
				<h1>Login to chat</h1>
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
			username: '',
		};
	},
	methods: {
		login() {
			if (this.username !== "") {
				this.$emit("retrieveData", this.username);
			}
		},
	},
}
</script>

<style scoped>

</style>