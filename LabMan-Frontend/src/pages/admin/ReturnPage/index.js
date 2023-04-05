import ReturnRecordProvider from "./Components/Context/ReturnRecordContext";
import ReturnPageContent from "./ReturnPageContent";

function ReturnPage() {
	return (
		<ReturnRecordProvider>
			<ReturnPageContent />
		</ReturnRecordProvider>
	);
}

export default ReturnPage;
