import { Typography, Modal, message } from "antd";
import { useEffect, useState } from "react";
const { Paragraph } = Typography;
const { confirm } = Modal;
import { useCourseDetailContext } from "../../../Context";

const CoordinatorName = () => {
	const { course, changeCoordinatorName } = useCourseDetailContext();
	const [coordinatorName, setCoordinatorName] = useState(course?.coordinator_name);

	const onEnd = () => {
		if(coordinatorName!== course.coordinator_name){
			if(coordinatorName === ""){
				message.warning("Course name cannot be empty.");
				setCoordinatorName(course.coordinator_name);
			}else{
				showConfirm();
			}
		}
	};

	useEffect(() => {
		onEnd();
	}, [coordinatorName]);

	const showConfirm = () => {
		confirm({
			title: "Do you want to submit the changes?",
			content: "This action cannot be undone.",
			onOk() {
				changeCoordinatorName(coordinatorName);
			},
			onCancel() {
				setCoordinatorName(course.coordinator_name);
			},
		});
	};

	return(
		<>
			<Paragraph editable={
				{
					onChange: setCoordinatorName,
					onEnd: onEnd,
				}
			}>
				{coordinatorName}
			</Paragraph>
		</>
	);
};

export default CoordinatorName;