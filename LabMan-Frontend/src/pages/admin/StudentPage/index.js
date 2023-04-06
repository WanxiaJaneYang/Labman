import StudentProvider from "./Components/Context/StudentContext";
import StudentPageContent from "./StudentPageContent";

const StudentPage=()=>{
	return(
		<StudentProvider>
			<StudentPageContent />
		</StudentProvider>
	);  
};

export default StudentPage;