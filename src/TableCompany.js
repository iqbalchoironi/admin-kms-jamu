import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'

import ModalCompany from './ModalCompany';
import Spinner from './Spinner'
import SnackBar from './SnackBar'

class MaterialTableDemo extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      columns: [
        { title: 'idcompany', field: 'idcompany' },
        { title: 'cname', field: 'cname' },
        { title: 'contact', field: 'contact' , type: 'numeric' },
        { title: 'city', field: 'city' },
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
      onSelect: null
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
    this.getData();
  }

  async getData(){
    const url = '/jamu/api/company';
    const res = await Axios.get(url);
    console.log(res)
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
        title="Editable Example"
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
      {this.state.modal.open === true ? <ModalCompany data={this.state.onSelect} afterUpdate={this.afterUpdate} modal={this.state.modal} close={this.closeBtn}/>
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

export default MaterialTableDemo;