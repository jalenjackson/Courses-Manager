import React from 'react';
import RenderCourses from "../renderCourses";

const Reviewing = props => (
  <RenderCourses { ...props } status='Reviewing' />
);

export default Reviewing;