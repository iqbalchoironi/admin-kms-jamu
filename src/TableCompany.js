import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'


import ModalCompany from './ModalCompany';


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
      onSelect: null
    }
    this.closeBtn = this.closeBtn.bind(this);
  }

  
  async componentDidMount() {
    // window.addEventListener('scroll', this.onScroll);
    this.getData();
  }

  async getData(){
    const url = '/jamu/api/company';
    const res = await Axios.get(url);
    console.log(res)
    const { data } = await res;
    let newData = this.state.data.concat(data.data);
    console.log(newData)
    this.setState({
      data: newData, 
      loading: false
    })
  }

  closeBtn() {
    this.setState({
      onSelect: null,
      modal: {
        open: false,
        mode: ''
      }
    })
  }

  render(){
    return (
      <div>
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
      {this.state.modal.open === true ? <ModalCompany data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
      : 
      null
      }
      </div> 
    );
  }
}

export default MaterialTableDemo;