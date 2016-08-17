import React, { Component } from 'react';

// for future material ui use
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Nav from '../components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: false
    };
    this.logIn=this.logIn.bind(this);
    this.logOut=this.logOut.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  logIn() {
    this.setState({
      loggedIn: true
    });
  }
  logOut() {
    this.setState({
      loggedIn: false
    });
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        loggedIn: this.state.loggedIn,
        logIn: this.logIn,
        logOut: this.logOut,
      });
    });
    return (
      <div>
        <Nav logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn} title={'tbd'} />
        {
          this.props.children ?
            <section className="child">
              {children}
            </section> :
            null
        }

      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

// For material ui
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
