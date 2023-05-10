import { Outlet, useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Row } from "antd";
import { useMemo } from "react";

const IndividualCoursePage = () => {
	const { course_id } = useParams();
	const location = useLocation();

	const breadcrumbItems = useMemo(() => {
		const items = [
			{
				title: "Course",
				href: "/admin/course",
			},
			{
				title: course_id.toString(),
				href: "/admin/course/" + course_id,
			},
		];

		if (location.pathname === "/admin/course/" + course_id + "/student_list") {
			items.push({
				title: "Student List",
				href: null,
			});
		} else if (
			location.pathname === "/admin/course/" + course_id + "/package_list"
		) {
			items.push({
				title: "Package List",
				href: null,
			});
		}

		return items;
	}, [location.pathname, course_id]);

	return (
		<>
			<Row>
				<Breadcrumb items={breadcrumbItems} />
			</Row>
			<Outlet />
		</>
	);
};

export default IndividualCoursePage;
