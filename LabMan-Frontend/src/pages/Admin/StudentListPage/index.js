import { useParams } from "react-router-dom";
import StudentListProvider from "./Context";
import StudentListTable from "./Components/StudentListTable";
import SearchStudentBar from "./Components/Buttons/SearchStudentBar";
import { Row ,Space, Divider} from "antd";

const StudentListPage = () => {
	const { course_id } = useParams();
	return (
		<>
			<Row justify={"end"} >
				<Space>
					<SearchStudentBar />
				</Space>
			</Row>
			<Divider/>
			<StudentListProvider course_id={course_id}>
				<StudentListTable/>
			</StudentListProvider>
		</>
	);
};

export default StudentListPage;