import { Container } from 'unstated';
import { Methods } from './containerMethods';

class ViewCourseContainer extends Container {
  state = {
    'currentCoursesUnpublished': false,
    'currentCoursesReviewing': false,
    'currentCoursesPublished': false,
    isFetching: false
  };
  
  updateState = (state, value) => Methods.updateState.call(this, state, value);
  setCourseStatus = (course, status) => Methods.setCourseStatus.call(this, course, status);
  getCoursesByStatus = (status) => Methods.getCoursesByStatus.call(this, status);
}

export default ViewCourseContainer;
