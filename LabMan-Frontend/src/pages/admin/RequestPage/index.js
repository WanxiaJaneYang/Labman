import RequestRecordProvider from "./Context";
import RequestPageContent from "./RequestPageContent";

function RequestPage() {
	return (
		<RequestRecordProvider>
			<RequestPageContent />
		</RequestRecordProvider>
	);
}

export default RequestPage;
