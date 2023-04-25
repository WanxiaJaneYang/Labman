import { DatePicker, Form, Input, InputNumber } from "antd";
import { useRequestRecordContext } from "../../../Context";
import { useEffect } from "react";
import moment from "moment";
import EquipmentTypeSelector from "../../Selector/EquipmentTypeSelector";

function ModifyRequestForm({ form }) {
	const { modalData,searchStudentID, equipmentTypeList} = useRequestRecordContext();

	useEffect(() => {
		if (modalData) {
			form.setFieldsValue({
				type_id: modalData.type_id,
				student_id: modalData.student_id,
				borrow_amount: modalData.borrow_amount,
				return_date: moment(modalData.return_date),
			});
		} else {
			form.resetFields();
		}
	}, [modalData, form]);

	const equipmentTypeID=Form.useWatch("type_id",form);

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
		const availableAmount = equipmentTypeList.find((type)=>type.type_id===equipmentTypeID)?.available_amount;
		if (value <= availableAmount) {
			return Promise.resolve();
		} else {
			return Promise.reject(
				new Error("available amount "+availableAmount)
			);
		}
	};

	return (
		<Form 
			form={form} 
			layout="vertical"
		>
			<Form.Item label="Equipment Name" name="type_id" rules={[{ required: true }]}>
				<EquipmentTypeSelector/>
			</Form.Item>
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
					{ validator: validateStudentID },
				]}>
				<Input />
			</Form.Item>
			<Form.Item 
				label="Borrow Amount" 
				name="borrow_amount" 
				rules={[
					{ type: "number", min: 0, message: "Borrow Amount must be greater than 0" },
					{ validator: validateAmount },
				]}
			>
				<InputNumber />
			</Form.Item>
			<Form.Item label="Return Date" name="return_date" rules={[{ required: true }]}>
				<DatePicker	allowClear/>
			</Form.Item>
		</Form>
	);

}

export default ModifyRequestForm;
