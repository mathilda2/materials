import sessionStorage from '../storage'

export default{
	saveUser(state,user){
		state.user=user;
		sessionStorage.set("user",user);
	}
}
