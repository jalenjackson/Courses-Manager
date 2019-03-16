import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'unstated';
import '../coursesInReview/application.less';

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps }
  }
  
  render () {
    const { Component, pageProps } = this.props;
    
    return (
      <Container>
        <Provider>
          <Component { ...pageProps } />
        </Provider>
      </Container>
    )
  }
}

