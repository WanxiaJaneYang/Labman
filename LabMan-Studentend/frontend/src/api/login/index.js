import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const USER_URL=API_URL+"/users";

export const login = async (username, password) => {
	try{
		const response = await axios.get(USER_URL+"/"+username);
		if(response.data){
			console.log("password",password);
			document.cookie = "username="+username;
			console.log("cookies:",document.cookie);
			return;
		}
		else{
			throw new Error("Wrong password");
		}
	}catch(error){
		if(error.response){
			throw new Error(error.response.data.error);
		}else{
			throw new Error(error.message);
		}
	}
};
