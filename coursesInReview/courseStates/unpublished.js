import React from 'react';
import RenderCourses from "../renderCourses";

const Unpublished = props => (
  <RenderCourses { ...props } status='Unpublished' />
);

export default Unpublished;