import { Card, Divider, message, Space } from "antd";
import { getRequestListByStudentId } from "../../../../api/request";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/date";
import {useNavigate} from "react-router-dom";

const RequestCard = () => {
	const [requestList, setRequestList] = useState([]);
	const navigate = useNavigate();

	const getRequests = async () => {
		try {
			const response = await getRequestListByStudentId();
			setRequestList(response);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				message.info("No requests found");
			}else{
				message.error(error.message);
			}
		}
	};

	useEffect(() => {
		getRequests();
	}, []);

	return(
		<>
			<div>
				{requestList.map((request) => {
					return(
						<>
							<Card key={request.request_id}
								type="inner"
								title={request.type_name}
								style={{ width: "auto" }} 
								extra={
									<Space>
										<a onClick={
											() => {
												navigate("/homepage/request/edit-request/"+request.request_id);
											}
										}>edit</a>
										<a onClick={
											() => {
												navigate("/homepage/request/cancel-request/"+request.request_id);
											}
										}>cancel</a>
									</Space>
								}
							>
								<p>Request Date: {formatDate(request.request_time)}</p>
								<p>Borrow Amount :{request.borrow_amount}</p>
								<p>Due Date:{formatDate(request.due_date)}</p>
							</Card>
							<Divider key={request.request_id}/>
						</>
					);
				}
				)}
			</div>
		</>
		
	);
};

export default RequestCard;
