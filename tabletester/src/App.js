import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}

export default App;
