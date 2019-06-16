import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'


import ModalEthnic from './ModalEthnic';


class TableEthnic extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      columns: [
        { title: 'name', field: 'name' },
        { title: 'province', field: 'province'}
      ],
      data: [],
      modal: {
        open: false,
        mode: '',
      },
      onSelect: null,
      baseProvince: []
    }
    this.closeBtn = this.closeBtn.bind(this);
  }

  
  async componentDidMount() {
    // window.addEventListener('scroll', this.onScroll);
    this.getData();
  }

  async getData(){
    const url = '/jamu/api/ethnic';
    const urlProvince = '/jamu/api/province/getlist'
    const res = await Axios.get(url);
    const resProvince = await Axios.get(urlProvince);
    const { data } = await res;
    const baseProvince = await resProvince.data.data.map(dt => {
      return {label:dt.province_name,value:dt._id}
    });
    console.log(baseProvince)
    let newData = this.state.data.concat(data.data);
    this.setState({
      data: newData,
      baseProvince: baseProvince, 
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
      {this.state.modal.open === true ? <ModalEthnic baseProvince={this.state.baseProvince} data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
      : 
      null
      }
      </div> 
    );
  }
}

export default TableEthnic;