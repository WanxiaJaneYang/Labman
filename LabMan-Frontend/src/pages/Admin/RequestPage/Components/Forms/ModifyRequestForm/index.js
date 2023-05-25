import { DatePicker, Form, Input, InputNumber } from "antd";
import { useRequestRecordContext } from "../../../Context";
import { useEffect } from "react";
import moment from "moment";

function ModifyRequestForm({ form}) {
	const { modalData,searchStudentID, equipmentTypeList,selectedEquipmentType} = useRequestRecordContext();

	useEffect(() => {
		if (modalData) {
			form.setFieldsValue({
				type_name: modalData.type_name,
				student_id: modalData.student_id,
				borrow_amount: modalData.borrow_amount,
				return_date: moment(modalData.return_date),
				package_id: modalData.package_id,
				upper_bound_amount: modalData.upper_bound_amount,
				type_id: modalData.type_id,
				request_id: modalData.request_id,
			});
		} else {
			form.resetFields();
		}
	}, [modalData, form]);

	//when selected type change, update the type name value
	useEffect(() => {
		form.setFieldsValue({
			type_name: selectedEquipmentType,
		});
	}, [selectedEquipmentType]);

	const validateStudentID = async(_, value) => {
		if (/^a\d{7}$/.test(value) ) {
			const existed =await searchStudentID(value);
			if(existed){
				// setStudentExists(true);
				return Promise.resolve("Student exists");
			}else{
				return Promise.reject(
					new Error("Student ID does not exist")
				);
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};

	const validateAmount = (_, value) => {
		const availableAmount = equipmentTypeList.find((type)=>type.type_name===selectedEquipmentType)?.available_amount;
		if(!availableAmount) return Promise.reject(new Error("Please select equipment type"));
		if (value <= availableAmount) {
			const upper_bound_amount=form.getFieldValue("upper_bound_amount");
			if(value>upper_bound_amount){
				return Promise.reject(
					new Error(`Borrow Amount must be less than or equal to upper bound amount ${upper_bound_amount}`)
				);
			}
			return Promise.resolve();
		} else {
			return Promise.reject(
				new Error(`Borrow Amount must be less than or equal to available amount ${availableAmount}`)
			);
		}
	};

	return (
		<Form 
			form={form} 
			layout="vertical"
		>
			<Form.Item 
				name={"type_id"} hidden/>
			<Form.Item
				name={"request_id"} hidden/>
			<Form.Item label="Equipment Name" 
				name="type_name" 
				hidden={true}
				rules={[{ required: true } ]}/>
			<Form.Item name={"package_id"} hidden/>
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
					{ validator: validateStudentID },
				]}>
				<Input 
					disabled={true}
				/>
			</Form.Item>
			<Form.Item 
				label="Borrow Amount" 
				name="borrow_amount" 
				rules={[
					{ required: true },
					{ type: "number", min: 0, message: "Borrow Amount must be greater than 0" },
					{ validator: validateAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Due Date" name="return_date" rules={[{ required: true }]}>
				<DatePicker	
					allowClear={true}
				/>
			</Form.Item>
			<Form.Item name={"upper_bound_amount"} hidden/>
		</Form>
	);

}

export default ModifyRequestForm;
