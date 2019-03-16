import React from 'react';
import { Divider, Tabs } from 'antd'
import { Subscribe } from "unstated";
import CoursesReviewContainer from './container';
import Unpublished from './courseStates/unpublished';
import Approved from './courseStates/approved';
import Reviewing from './courseStates/reviewing';
import {BarLoader} from "react-spinners";

const TabPane = Tabs.TabPane;

export default class CoursesInReview extends React.Component {
  state = {
    loaded: false
  };
  
  async componentDidMount() {
    setTimeout(async () => {
      this.setState({ loaded: true });
    }, 600);
  }
  
  render() {
    return (
      <Subscribe to={[CoursesReviewContainer]}>
        { container => (
          <div>
            { this.state.loaded
              ? <div style={{ width: '80%', display: 'block', margin: '0 auto' }}>
                  <h1 style={{ marginTop: 50 }}>Courses In Review</h1>
                  <Divider dashed />
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Unpublished" key="1">
                      <Unpublished container={ container } { ...this.props } />
                    </TabPane>
                    <TabPane tab="Reviewing" key="2">
                      <Reviewing container={ container } { ...this.props }  />
                    </TabPane>
                    <TabPane tab="Approved" key="3">
                      <Approved container={ container } { ...this.props }  />
                    </TabPane>
                  </Tabs>
                </div>
              : <div style={ loaderStyles }>
                  <BarLoader color={'#43A5FF'} />
                </div>
            }
          </div>
        )}
      </Subscribe>
    )
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