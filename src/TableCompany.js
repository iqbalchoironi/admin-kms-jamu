import React from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios'

class MaterialTableDemo extends React.Component{
  state = {
    columns: [
      { title: 'idcompany', field: 'idcompany' },
      { title: 'cname', field: 'cname' },
      { title: 'contact', field: 'contact' , type: 'numeric' },
      { title: 'contact', field: 'contact' },
    ],
    data: []
  };

  
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
  render(){
    return (
      <MaterialTable
        title="Editable Example"
        columns={this.state.columns}
        data={this.state.data}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Save Company',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          },
          rowData => ({
            icon: 'delete',
            tooltip: 'Delete Company',
            onClick: (event, rowData) => alert("You want to delete " + rowData.name),
            disabled: rowData.birthYear < 2000
          }),
          {
            icon: 'add',
            tooltip: 'Add Company',
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row")
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
    );
  }
}

export default MaterialTableDemo;