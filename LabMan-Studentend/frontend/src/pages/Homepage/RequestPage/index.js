import { Breadcrumb, Button, Divider, Form, message } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RequestForm from "./RequestForm";
import { getID } from "../../../utils";
import { postRequest } from "../../../api/request";

const RequestPage = () => {
	const {course_id} = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const onClick = async() => {
		const student_id=getID();
		const values = await form.validateFields();
		try{
			await Promise.all(values.request_items.map(async (item) => {
				const request_values = {
					"student_id": student_id,
					"package_id": values.package_id,
					"type_id": item.type_id,
					"type_name": item.type_name,
					"borrow_amount": item.borrow_amount,
				};
				await postRequest(request_values);
			}));
			message.success("Request successfully!");
			navigate("/homepage/request");
		}catch(error){
			message.error(error.response.data.error);
		}
	};
		
	return(
		<div>
			<Breadcrumb items={[
				{
					title: "Homepage",
				},
				{
					title: "Request",
					onClick:(e)=>{
						e.preventDefault();
						navigate("/homepage/request");
					}
				},
				{
					title: course_id,
				},
			]}/>
			<Divider/>
			<RequestForm form={form}/>
			<Button type="primary" 
				justify="start"
				onClick={onClick}> Apply</Button>
		</div>
	);
};

export default RequestPage;