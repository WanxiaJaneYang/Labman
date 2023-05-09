import { Outlet, useParams } from "react-router-dom";
import { Breadcrumb, Row } from "antd";
import { Link } from "react-router-dom";

const IndividualCoursePage = () => {
	const { course_id } = useParams();

	const breadcrumbItems = [
		{
			title: "Course",
			path: "/admin/course",
			children: [
				{
					title: course_id,
					path: `/admin/course/${course_id}`,
					children: [
						{
							title: "Student List",
							path: `/admin/course/${course_id}/student_list`,
						},
						{
							title: "Package List",
							path: `/admin/course/${course_id}/package_list`,
						},
					],
				},
			],
		},
	];

	const renderBreadcrumb = (items) => {
		return items.map((item, index) => (
			<>
				<Breadcrumb.Item key={index}>
					<Link to={item.path}>{item.title}</Link>
				</Breadcrumb.Item>
				{item.children && (
					<>
						<Breadcrumb.Separator>/</Breadcrumb.Separator>
						{renderBreadcrumb(item.children)}
					</>
				)}
			</>
		));
	};

	return (
		<>
			<Row>
				<Breadcrumb>{renderBreadcrumb(breadcrumbItems)}</Breadcrumb>
			</Row>
			<Outlet />
		</>
	);
};

export default IndividualCoursePage;
