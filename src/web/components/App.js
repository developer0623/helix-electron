// This component handles the App template used on every page.
import ReactGA from 'react-ga'; // https://github.com/react-ga/react-ga
import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import routes from '../routes';

class App extends React.Component {
  constructor() {
    super();

    // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
    ReactGA.initialize(process.env.GA_TRACKING_ID);

    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
  }
  render() {
    return (
      <div>
        <Header
        />
        {routes}
        <Footer
          />
      </div>
    );
  }
}

export default App;
