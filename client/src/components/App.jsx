import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Nav from '../components/Nav';

const customTheme = {
  palette: {
    primary1Color: "#8D7965",
    primary2Color: "#8D7965",
    primary3Color: "#8D7965"
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedIn: false,
      user: "",
      userInstruments: [ ],
    };
    this.logIn=this.logIn.bind(this);
    this.logOut=this.logOut.bind(this);
    this.updateUserInstrument=this.updateUserInstrument.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(customTheme) };
  }

  updateUserInstrument(totalInstruments) {
    this.setState({
      userInstruments: totalInstruments,
    });
  }

  logIn(userName, userInstruments) {
    this.setState({
      loggedIn: true,
      user: userName,
      userInstruments: userInstruments,
    });
  }

  logOut() {
    console.log('Main logout being called');
    this.setState({
      loggedIn: false,
      user: "",
    });
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        loggedIn: this.state.loggedIn,
        logIn: this.logIn,
        logOut: this.logOut,
        user: this.state.user,
        userInstruments: this.state.userInstruments,
        updateUserInstrument: this.updateUserInstrument,
      });
    });
    return (
      <div>
        <Nav user={this.state.user} logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn} title={'tbd'} />
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
