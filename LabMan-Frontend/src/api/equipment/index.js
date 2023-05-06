import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_EQUIPMENT=API_URL+"/equipment";

export const getEquipmentData=async ()=>{
	try{
		const response = await axios.get(API_URL_EQUIPMENT);
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error(response.error);
		}
	}catch(error){
		throw new Error("Unknown error while fetching equipment data");
	}
};

export const postEquipment=async (values)=>{
	try{
		const response = await axios.post(API_URL_EQUIPMENT,values);
		if(response.status === 201){
			return;
		}else{
			throw new Error(response.error);
		}
	}catch(error){
		throw new Error("Unknown error while adding equipment data");
	}
};

export const deleteEquipment=async (id)=>{
	try{
		const response = await axios.delete(API_URL_EQUIPMENT+"/"+id);
		if(response.status === 200){
			return;
		}else{
			throw new Error(response.error);
		}
	}catch(error){
		throw new Error("Unknown error while deleting equipment data");
	}
};

export const getEquipmentByTypename=async (type_name)=>{
	const urlParmas=new URLSearchParams();
	urlParmas.append("type_name",type_name);
	try{
		const response = await axios.get(API_URL_EQUIPMENT+"?"+urlParmas.toString());
		if(response.status === 200){
			return response.data;
		}else{
			throw new Error(response.error);
		}
	}catch(error){
		throw new Error("Unknown error while fetching equipment data");
	}
};

export const editEquipment=async (id,values)=>{
	try{
		const response = await axios.put(API_URL_EQUIPMENT+"/"+id,values);
		if(response.status === 200){
			return;
		}else{
			throw new Error(response.error);
		}
	}catch(error){
		throw new Error("Unknown error while editing equipment data");
	}
};