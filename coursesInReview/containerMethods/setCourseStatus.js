import axios from 'axios';
import { message } from 'antd';
import { host } from "../../helpers/axiosCalls";

export const call = async (context, course, status) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    
    let body = {
      courseId: course._id,
      status,
      course: course,
      devKey: process.env.devKey
    };
    
    await axios.post(`${ host }/api-routes/change-course-status`,
      JSON.stringify(body),
      { headers });
    message.success('Successfully set course status to ' + status)
  } catch (e) {
    message.error('There was an issue approving this course');
  }
};