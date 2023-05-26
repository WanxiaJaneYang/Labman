import { createContext, useState,useContext } from "react";
import { checkLoginInfo } from "../../api/login";
import { message } from "antd";

const AuthContext = createContext();

export const useAuth=()=>useContext(AuthContext);

export const AuthProvider=({children})=>{
	const [isAuthenticated,setIsAuthenticated]=useState(false);

	const login=async (student_id, password)=>{
		try{
			const response = await checkLoginInfo(student_id, password);
			if(response){
				setIsAuthenticated(true);
			}
		}catch(error){
			message.error(error.message);
		}
	};

	const logout=()=>{
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{
			isAuthenticated,
			login,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;