import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';

import Axios from 'axios'

class ModalEthnic extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          _id: '',
          name:'',
          province: '',
          refPlantethnic: [],
          baseProvince: []
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
          let province = ''  
          if (this.props.data.refProvince){
              province = this.props.baseProvince.find(p => p.value === this.props.data.refProvince )
            } else {
              province = this.props.baseProvince.find(p => p.value === this.props.data.province )
            }
            this.setState({
                _id: this.props.data._id,
                name: this.props.data.name,
                province: province !== undefined ? province : null ,
                refPlantethnic: this.props.data.refPlantethnic,
                baseProvince: this.props.baseProvince
            })

           
        }
      }

      valueChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      
      handleChange = name => value => {
        this.setState({
          [name]: value,
        });
        console.log(this.state)
      };

      onChange(e) {
        this.setState({url:e.target.files[0]})
      }

      handleSubmitUpdate = event => {
        console.log(this.state)
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/ethnic/update/' + this.state._id

      Axios.patch( url,{
        name: this.state.name,
        address: this.state.address,
        province: this.state.province.value,
        refPlantethnic: this.refPlantethnic
        } ,axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
            event.preventDefault();
    }

    handleSubmitAdd = event => {
        console.log(this.state)
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/ethnic/add'
      Axios.post( url, {
        name: this.state.name,
        address: this.state.address,
        province: this.state.province,
        refPlantethnic: this.refPlantethnic
        },axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        });
            event.preventDefault();
    }

    handleSubmitDelete = event => {
        console.log(this.state)
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/ethnic/delete/' + this.state._id
      Axios.delete( url,axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
            window.location.href = '/ethnic';
        })
        .catch(err => {
            console.log(err)
        });
            event.preventDefault();
    }

render() {
  if(this.props.modal.mode === 'update'){
    return (
      <div>
        <Dialog open={this.props.modal.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">You update herbal medicine with id {this.state.idcompany}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ethnic Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
            <Select
              value={this.state.province}
              onChange={this.handleChange('province')}
              options={this.state.baseProvince}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }else if(this.props.modal.mode === 'delete') {
    return (
      <Dialog
        open={this.props.modal.open}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            NO
          </Button>
          <Button onClick={this.handleSubmitDelete} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    )
  }else if(this.props.modal.mode === 'detail') {

  }else if(this.props.modal.mode === 'add') {
    return (
      <Dialog open={this.props.modal.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ethnic Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="province"
              label="Province"
              name="province"
              type="text"
              value={this.state.province}
              fullWidth
              onChange={this.valueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitAdd} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
    }
}

export default ModalEthnic;
