import {SettingOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";

const PackageSettingButton = () => {
	return(
		<>
			<Tooltip title={"Setting the packages of the course"}>
				<SettingOutlined
					style={{fontSize: "20px"}}
				/>
			</Tooltip>
		</>
	);
};

export default PackageSettingButton;