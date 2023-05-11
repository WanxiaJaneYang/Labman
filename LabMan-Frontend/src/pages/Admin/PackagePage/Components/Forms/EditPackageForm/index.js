import {Form, Input} from "antd";

const EditPackageForm = ({form}) => {
	return (
		<Form
			form={form}
		>
			<Form.Item label={"Package Name"} name={"package_name"}>
				<Input/>
			</Form.Item>
		</Form>
	);
};

export default EditPackageForm;