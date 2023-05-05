import { Button } from "antd";
import {useCourseContext} from "../../../Context";

const NewCourseButton = () => {
	const {onAdd}=useCourseContext();

	const onClick = () => {
		onAdd();
	};
    
	return(
		<>
			<Button 
				type='primary'
				onClick={onClick}
			>New </Button>
		</>
	);
};

export default NewCourseButton;