import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Axios from 'axios'

class ModalDclass extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          _id: '',
          idclass:'',
          class: '',
          description:'',
          diseases: '',
          ref: ''
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onChange = this.onChange.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
            this.setState({
                _id: this.props.data._id,
                idclass:this.props.data.idclass,
                class: this.props.data.class,
                description: this.props.data.description,
                diseases: this.props.data.diseases,
                ref: this.props.data.ref
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
            
        let url = '/jamu/api/dclass/update/' + this.state.idclass

      Axios.patch( url,{
        class: this.state.class,
        description: this.state.description,
        diseases: this.state.diseases,
        ref: this.state.ref
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
            
        let url = '/jamu/api/dclass/add'
      Axios.post( url, {
        idclass: this.state.idclass,
        class_name: this.state.class,
        description: this.state.description,
        diseases: this.state.diseases,
        ref: this.state.ref
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
            
        let url = '/jamu/api/dclass/delete/' + this.state.idclass
      Axios.delete( url,axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
            window.location.href = '/dclass';
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
          <DialogTitle id="form-dialog-title">You update herbal medicine with id {this.state.idclass}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="class"
              label="dclass Name"
              name="class"
              type="text"
              value={this.state.class}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="description"
              label="description"
              name="description"
              type="text"
              value={this.state.description}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="diseases"
              label="diseases"
              name="diseases"
              type="text"
              value={this.state.diseases}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="ref"
              name="ref"
              type="text"
              value={this.state.ref}
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
              autoFocus
              margin="dense"
              id="idclass"
              label="ID dclass"
              name="idclass"
              type="text"
              value={this.state.idclass}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="class"
              label="dclass Name"
              name="class"
              type="text"
              value={this.state.class}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="description"
              label="description"
              name="description"
              type="text"
              value={this.state.description}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="diseases"
              label="diseases"
              name="diseases"
              type="text"
              value={this.state.diseases}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="ref"
              name="ref"
              type="text"
              value={this.state.ref}
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

export default ModalDclass;
