import StudentProvider from "./Context/StudentContext";
import StudentTable from "./Components/Tables/StudentTable";
import NewStudentButton from "./Components/Buttons/NewStudentButton";
import SearchStudentBar from "./Components/Buttons/SearchStudentBar";
import DeleteStudentButton from "./Components/Buttons/DeleteStudentButton";
import{Row, Col, Space} from "antd";
import ModifyStudentButton from "./Components/Buttons/ModifyStudentButton";
import ShowStudentDetailButton from "./Components/Buttons/ShowStudentDetailButton";

const StudentPage=()=>{
	return(
		<StudentProvider>
			<Row justify="space-between" align="middle">
				<Col>
					<NewStudentButton />
				</Col>
				<Col>
					<SearchStudentBar />
				</Col>
			</Row>

			<StudentTable />
			<Row justify={"start"}>
				<Space>
					<Col>
						<ShowStudentDetailButton/>
					</Col>
					<Col>
						<ModifyStudentButton/>
					</Col>
					<Col>
						<DeleteStudentButton />
					</Col>
				</Space>
			</Row>
		</StudentProvider>
	);  
};

export default StudentPage;