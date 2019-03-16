import React from 'react';
import RenderCourses from "../renderCourses";

const Approved = props => (
  <RenderCourses { ...props } status='Approved' />
);

export default Approved;