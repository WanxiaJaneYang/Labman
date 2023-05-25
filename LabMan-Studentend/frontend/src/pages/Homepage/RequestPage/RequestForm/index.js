import { Form, message,Select, Input, InputNumber,Row, Space } from "antd";
import { getCoursePackageListByCourseId } from "../../../../api/course";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPackageById } from "../../../../api/package";
import {MinusCircleOutlined} from "@ant-design/icons";

const RequestForm = ({form}) => {
	const{course_id} = useParams();
	const [packages, setPackages] = useState([]);
	const package_id=Form.useWatch("package_id", form);

	const getPackageList = async (course_id) => {
		try{
			const response = await getCoursePackageListByCourseId(course_id);
			setPackages(response);
		}catch(error){
			if(error.response.status===404){
				message.error("Course has no package!");
			}else{
				message.error(error.message);
			}
		}
	};

	useEffect(() => {
		getPackageList(course_id);
	}, []);
	useEffect(() => {
		getPackageList;
	}, [course_id]);

	useEffect(() => {
		if(package_id){
			getPackageDetail(package_id);
		}
	}, [package_id]);
    
	const getPackageDetail = async(package_id) => {
		try{
			const response = await getPackageById(package_id);
			form.setFieldsValue({
				"request_items": response
			});
		}catch(error){
			if(error.response.status===404){
				message.error("Package includes no equipment!");
			}else{
				message.error(error.message);
			}
		}
	};
    
	return (
		<Form layout="vertical" form={form} style={{padding:"10px"}}>
			<Form.Item name={"package_id"} label="Package" rules={[{ required: true }]}>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={packages.map((packageList) => ({
						label: packageList.package_name,
						value: packageList.package_id,
					}))}
				/>
			</Form.Item>
			<Form.List name="request_items">
				{(fields, { remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<Row key={key} >
								<Space>
									<Form.Item
										{...restField}
										label="Equipment Type"
										name={[name, "type_name"]}
										style={{display:"none"}}
										key={"type_name"+key}
									>
										<Input/>
									</Form.Item>
									<Form.Item
										{...restField}
										label="Equipment ID"
										name={[name, "type_id"]}
										style={{display:"none"}}
										key={"type_id"+key}
									>
										<Input/>
									</Form.Item>
									<Form.Item
										{...restField}
										label={form.getFieldValue(["request_items", key, "type_name"])+" Amount"}
										name={[name, "borrow_amount"]}
										key={"request_amount"+key}
										rules={[{ required: true, message: "Please input amount!" },
											{validator: async (_, value) => {
												if(value<=0){
													return Promise.reject(new Error("Amount cannot be negative!"));
												}
												else if(value>form.getFieldValue(["request_items", key, "upper_bound_amount"])){
													return Promise.reject(new Error("Amount exceeds upper limit!"));
												}else{
													return Promise.resolve();
												}
											}
											}
										]}>
										<InputNumber />
									</Form.Item>
									<Form.Item
										{...restField}
										label="Upper Limit"
										name={[name, "upper_bound_amount"]}
										key={"upper_bound_amount"+key}
										style={{display:"none"}}
									>
										<InputNumber />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							</Row>
						))}
					</>
				)}
			</Form.List>
		</Form>
	);
};

export default RequestForm;
