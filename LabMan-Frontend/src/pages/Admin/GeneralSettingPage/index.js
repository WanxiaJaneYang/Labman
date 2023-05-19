import React from "react";
import { Collapse, Divider } from "antd";

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const GeneralSettingPage = () => {
	const onChange = (key) => {
		console.log(key);
	};

	const emailNotification = () => {
		return (
			<p>Automatically sending email 8 days earlier before due date</p>
		);
	};

	return (
        <>
            <Divider>
            <Panel header="Email Notification" key="1">
				{emailNotification()}
			</Panel>
            </Divider>
        </>
		<Collapse defaultActiveKey={["1"]} onChange={onChange}>
			<Panel header="Email Notification" key="1">
				{emailNotification()}
			</Panel>
			<Panel header="Announcement" key="2">
				<p>{text}</p>
			</Panel>
		</Collapse>
	);
};

export default GeneralSettingPage;