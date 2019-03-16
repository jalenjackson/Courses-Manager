import React from 'react';
import { Divider, Button } from "antd";
import moment from "moment";
import {BarLoader} from "react-spinners";

export default class RenderCourses extends React.Component {
  componentDidMount() {
    this.props.container.getCoursesByStatus(this.props.status);
  }
  
  render() {
    return (
      <div>
        { this.renderCourses() }
        { this.props.container.state.isFetching
          ? <div style={ loaderStyles }>
              <BarLoader color={'#43A5FF'} />
            </div>
          : null
        }
      </div>
    )
  }
  
  renderCourses = () => {
    const currentCourses = this.props.container.state[`currentCourses${ this.props.status }`];
    if (currentCourses && currentCourses.length > 0 && !this.props.container.state.isFetching) {
      return currentCourses.map(course => (
        <div>
          <h3>{ course.title }</h3>
          <p><b>{ course._id }</b></p>
          <p>Created by <b>{ course.creator.name }</b> <b>{ moment(course.date).fromNow() }</b> with id: <b>{ course.creator._id }</b></p>
          { this.props.status === 'Reviewing' || this.props.status === 'Approved'
            ?
              <Button.Group>
                <Button type="primary" onClick={ () => this.props.container.setCourseStatus(course, this.props.status === 'Reviewing' ? 'Approved' : 'Unpublished') }>
                  { this.props.status === 'Reviewing' ? 'Approve Course' : 'Unpublish Course' }
                </Button>
                { this.props.status === 'Reviewing'
                  ? <Button type="danger" onClick={ () => this.props.container.setCourseStatus(course, 'NotApproved') }>
                      Disapprove
                    </Button>
                  : null
                }
              </Button.Group>
            : null
          }
          <Divider dashed />
        </div>
      ))
    } else {
      if (!this.props.container.state.isFetching) {
        return (
          <h3>No courses found with the status <b>{ this.props.status }</b></h3>
        )
      }
    }
  }
}

const loaderStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  borderBottom: '1px solid #e8e8e8',
  boxShadow: 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15)',
  height: '46px',
};