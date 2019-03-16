import { GraphQlDevURI, GraphQlMutate } from "../../helpers/axiosCalls";
import { message } from "antd";

export const call = async (context, status) => {
  try {
    await context.setState({ isFetching: true });
    const courses = await GraphQlMutate(GraphQlDevURI, `
      {
        courseByStatus(status: "${ status }") {
          title
          _id
          date
          creator {
            name
            _id
          }
        }
      }
    `);
    context.setState({ [`currentCourses${ status }`]: courses.data.data.courseByStatus, isFetching: false });
  } catch (e) {
    console.error(e);
    message.error('An unexpected error occurred')
  }
};