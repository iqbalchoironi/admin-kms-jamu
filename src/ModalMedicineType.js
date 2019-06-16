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

class ModalMedType extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          _id: '',
          idtype:'',
          medname: ''
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){           
           this.setState({
                _id: this.props.data._id,
                idtype: this.props.data.idtype,
                medname: this.props.data.medname
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
            
        let url = '/jamu/api/medtype/update/' + this.state.idtype

      Axios.patch( url,{
        medname: this.state.medname
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
            
        let url = '/jamu/api/medtype/add'
      Axios.post( url, {
        idtype: this.state.idtype,
        medname: this.state.medname
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
            
        let url = '/jamu/api/medtype/delete/' + this.state.idtype
      Axios.delete( url,axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
            window.location.href = '/medtype';
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
              label="Name Herbal Medicine Type"
              name="medname"
              type="text"
              value={this.state.medname}
              fullWidth
              onChange={this.valueChange}
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
              margin="dense"
              id="idtype"
              label="ID Type of Herbal Medicine"
              name="idtype"
              type="text"
              value={this.state.idtype}
              fullWidth
              onChange={this.valueChange}
            />
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Herbal Medicine Type"
              name="medname"
              type="text"
              value={this.state.medname}
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

export default ModalMedType;
