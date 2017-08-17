import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


class Table extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'items':[],
      'itemsSeen':{},
      'totalSize:': 0
    };

    this.options = {
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.sizePerPageListChange.bind(this),
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last'
    };

    this.curPage = 0;

  }

  sizePerPageListChange(sizePerPage) {
    console.log(`sizePerPage: ${sizePerPage}`);
  }

  onPageChange(page, sizePerPage) {
    console.log(this.state.itemsSeen);
    if (!this.state.itemsSeen.hasOwnProperty(page) && page != 1) {
        this.fetchData(page);
    } else {
      console.log("Data already loaded");
      console.log(this.state.items);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  createObj() {
    var num = this.curPage;
    console.log("Curr page ", num);
    return {[num]: true};
  }

  fetchData(page=1) {
    // http://swapi.co/api/people/?page=#
    this.curPage = page;

    const ROOT_URL = 'http://swapi.co/api/people/?page=';
    const url = `${ROOT_URL}${page}`;
    const request = axios.get(url)
      .then(result => {
        const items = result.data.results;
        const count = result.data.count;
        const addObj = this.createObj();
        this.setState({
          'itemsSeen': {...this.state.itemsSeen, ...addObj},
          'items': [...this.state.items, ...items],
          'totalSize': count
        });
      }
    )
  }

  render() {
    return (
      <BootstrapTable
        data={this.state.items}
        pagination = { true }
        options = { this.options }
        condensed
        remote
        striped
        hover
        fetchInfo={{dataTotalSize: this.state.totalSize}}
      >
          <TableHeaderColumn
            dataField='name'
            isKey
            dataAlign='center'
          >
            Character
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='gender'
            dataAlign='center'
          >
            Gender
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='height'
            dataAlign='center'
          >
            Height
          </TableHeaderColumn>
      </BootstrapTable>
    );
  }


}

export default Table;
