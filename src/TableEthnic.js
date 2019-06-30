import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'

import Spinner from './Spinner'
import ModalEthnic from './ModalEthnic';
import SnackBar from './SnackBar'


class TableEthnic extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      loading: false,
      columns: [
        { title: 'name', field: 'name' },
        { title: 'province', field: 'refProvince'}
      ],
      data: [],
      modal: {
        open: false,
        mode: '',
      },
      snackbar: {
        open: false,
        success: false,
        message: '',
      },
      onSelect: null,
      baseProvince: []
    }
    this.closeBtn = this.closeBtn.bind(this);
    this.getData = this.getData.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
  }

  
  async componentDidMount() {
    this.setState({
      loading: true
    })
    // window.addEventListener('scroll', this.onScroll);
    const urlProvince = '/jamu/api/province/getlist'
    const resProvince = await Axios.get(urlProvince);
    const baseProvince = await resProvince.data.data.map(dt => {
      return {label:dt.province_name,value:dt._id}
    });

    this.setState({
      baseProvince: baseProvince
    })
    
    await this.getData();
  }

  async getData(){
    const url = '/jamu/api/ethnic';
    
    const res = await Axios.get(url);
    
    const { data } = await res;
    this.setState({
      data: data.data,
      loading: false
    })
  }

  closeBtn() {
    this.setState({
      onSelect: null,
      modal: {
        open: false,
        mode: ''
      },
      snackbar: {
        open: false,
        success: false,
        message: '',
      }
    })
  }

  async afterUpdate (success, message){
    this.getData();
    this.setState({
      modal: {
        open: false,
        mode: '',
      },
      snackbar: {
        open: true,
        success: success,
        message: message,
      }
    })
  }

  render(){
    return (
      <div>
        {this.state.loading ? <Spinner />
        :
        <MaterialTable
            style={{
              widht:"95%"
            }}
            title="Ethnic Management Table"
            columns={this.state.columns}
            data={this.state.data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save Company',
                onClick: (event, rowData) => {
                  this.setState({
                    onSelect: rowData,
                    modal: {
                      open: true,
                      mode: 'update'
                    }
                  })
                }
              },{
                icon: 'delete',
                tooltip: 'Delete Company',
                onClick: (event, rowData) => {
                  this.setState({
                    onSelect: rowData,
                    modal: {
                      open: true,
                      mode: 'delete'
                    }
                  })
                }
              },
              {
                icon: 'add',
                tooltip: 'Add Company',
                isFreeAction: true,
                onClick: (event, rowData) => {
                  this.setState({
                    modal: {
                      open: true,
                      mode: 'add'
                    }
                  })
                }
              }
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
      }
      
      {this.state.modal.open === true ? <ModalEthnic baseProvince={this.state.baseProvince} afterUpdate={this.afterUpdate} data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
      : 
      null
      }

      {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
      : 
      null
      }
      </div> 
    );
  }
}

export default TableEthnic;