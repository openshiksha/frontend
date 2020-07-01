import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import getAPI from './common/middlewares/getAPI';


function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={() => {
            getAPI ('/deal/');
          }
        }
        >
          Call API
        </a>
      </header>
    </div>
  );
}
const mapStateToProps = ({ sphinx }) => {
  return {
    sphinx,
  }
}

export default connect(
  mapStateToProps, {} 
)(App);
