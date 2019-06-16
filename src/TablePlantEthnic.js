import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'


import ModalPlantEthnic from './ModalPlantEthnic';


class TabelPlantEthnic extends React.Component{
  constructor(props) {
    super(props);
    this.state =  {
      columns: [
        { title: 'Ethnic', field: 'ethnic' },
        { title: 'Disease in Bahasa', field: 'disease_ina' },
        { title: 'Disease in English', field: 'disease_ing' },
        { title: 'Name Plant in Bahasa', field: 'name_ina' },
        { title: 'Species', field: 'species' },
        { title: 'Family', field: 'family' },
        { title: 'Use Section in Bahasa', field: 'section_ina' },
        { title: 'Use Section in English', field: 'section_ing' },
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
    const url = '/jamu/api/plantethnic/';
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
      {this.state.modal.open === true ? <ModalPlantEthnic data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
      : 
      null
      }
      </div> 
    );
  }
}

export default TabelPlantEthnic;