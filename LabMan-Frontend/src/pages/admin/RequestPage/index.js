import RequestRecordProvider from "./Components/Context/RequestRecordContext";
import RequestPageContent from "./RequestPageContent";

function RequestPage() {
	return (
		<RequestRecordProvider>
			<RequestPageContent />
		</RequestRecordProvider>
	);
}

export default RequestPage;
