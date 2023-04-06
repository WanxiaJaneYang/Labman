import ReturnRecordProvider from "./Components/Context/ReturnRecordContext";
import ReturnPageContent from "./ReturnPageContent";

const ReturnPage = () => {
	return (
		<ReturnRecordProvider>
			<ReturnPageContent />
		</ReturnRecordProvider>
	);
};

export default ReturnPage;
