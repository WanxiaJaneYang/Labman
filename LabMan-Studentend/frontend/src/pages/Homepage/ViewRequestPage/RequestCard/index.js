import { Card, Empty, message, Space } from "antd";
import { getRequestListByStudentId } from "../../../../api/request";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../utils/date";
import { useNavigate } from "react-router-dom";
import React from "react";

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
			} else {
				message.error(error.message);
			}
		}
	};

	useEffect(() => {
		getRequests();
	}, []);

	return (
		<>
			<div>
				{requestList.map((request) => {
					return (
						<div key={request.request_id + "parent"} style={{ margin: "10px 0" }}>
							<Card key={request.request_id + "card"}
								type="inner"
								title={request.type_name}
								style={{ width: "auto" }}
								extra={
									<Space>
										<a onClick={
											() => {
												navigate("/homepage/request/edit-request/" + request.request_id);
											}
										}>Edit</a>
										<a onClick={
											() => {
												navigate("/homepage/request/cancel-request/" + request.request_id);
											}
										}>Cancel</a>
									</Space>
								}
							>
								<p>Request Date: {formatDate(request.request_time)}</p>
								<p>Due Date:{formatDate(request.return_date)}</p>
								<p>Borrow Amount :{request.borrow_amount}</p>
							</Card>
						</div>
					);
				}
				)}
				{requestList.length === 0 && <Empty
					description={
						<span>
							No request found
						</span>
					}
				/>}
			</div>
		</>

	);
};

export default RequestCard;
