import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';


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
          onClick={async () => {
            const response  = await fetch('/sphinx/deal/', {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'same-origin', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            });
            console.log(response);
            console.log(props);
          }}
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
