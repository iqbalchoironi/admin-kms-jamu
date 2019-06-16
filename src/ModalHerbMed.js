import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Axios from 'axios'

class ModalHerbMed extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          _id: '',
          idherbsmed:'',
          name: '',
          nameloc1: '',
          nameloc2: '',
          efficacy: '',
          efficacyloc: '',
          ref: '',
          idclass: '',
          idcompany: '',
          idtype: '',
          img: '',
          __v: null,
          refMedtype: '',
          refCompany: '',
          refDclass: {},
          refCrude: []
        }
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.valueChange = this.valueChange.bind(this);
        this.onChange = this.onChange.bind(this);
      }

      async componentDidMount() {
        if( this.props.modal.mode === 'update' || this.props.modal.mode === 'detail' || this.props.modal.mode === 'delete'){
            
            let coba = [];
            await this.props.data.refCrude.forEach(item => {
                    coba.push(item._id);
                });
            
            this.setState({
                _id: this.props.data._id,
                idherbsmed:this.props.data.idherbsmed,
                name: this.props.data.name,
                nameloc1: this.props.data.nameloc1,
                nameloc2: this.props.data.nameloc2,
                efficacy: this.props.data.efficacy,
                efficacyloc: this.props.data.efficacyloc,
                ref: this.props.data.ref,
                idclass: this.props.data.idclass,
                idcompany: this.props.data.idcompany,
                idtype: this.props.data.idtype,
                img: this.props.data.img,
                __v: this.props.data.__v,
                refMedtype: this.props.data.refMedtype,
                refCompany: this.props.data.refCompany,
                refDclass: this.props.data.refDclass,
                refCrude: coba
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
        this.setState({img:e.target.files[0]})
      }

      handleSubmitUpdate = event => {
        console.log(this.state)
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        let axiosConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': user.token
                }
            };
            
        let url = '/jamu/api/herbsmed/update/' + this.state.idherbsmed

        const formData = new FormData();
      formData.append('_id',this.state._id);
      formData.append('idherbsmed',this.state.idherbsmed);
      formData.append('name',this.state.name);
      formData.append('nameloc1',this.state.nameloc1);
      formData.append('nameloc2',this.state.nameloc2);
      formData.append('efficacy',this.state.efficacy);
      formData.append('efficacyloc',this.state.efficacyloc);
      formData.append('ref',this.state.ref);
      formData.append('idclass',this.state.idclass);
      formData.append('idcompany',this.state.idcompany);
      formData.append('idtype',this.state.idtype);
      formData.append('img',this.state.img);
      formData.append('refMedtype',this.state.refMedtype);
      formData.append('refCompany',this.state.refCompany);
      formData.append('refDclass',this.state.refDclass._id);
      this.state.refCrude.map(item =>{
        formData.append('refCrude',item);
      })
      Axios.patch( url,formData ,axiosConfig)
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
            
        let url = '/jamu/api/herbsmed/add'
      Axios.post( url, {
        idherb: this.state.idherb,
        idherbsmed: this.state.idherbsmed,
        name: this.state.name,
        nameloc1: this.state.nameloc1,
        nameloc2: this.state.nameloc2,
        efficacy: this.state.efficacy,
        efficacyloc: this.state.efficacyloc,
        ref: this.state.ref,
        idclass: this.state.idclass,
        idcompany: this.state.idcompany,
        idtype: this.state.idtype,
        img: this.state.img,
        __v: this.state.__v,
        refCompany: this.state.refCompany,
        refDclass: this.state.refDclass,
        refCrude: this.state.refCrude,
        },axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
            window.location.href = '/herbmed';
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
            
        let url = '/jamu/api/herbsmed/delete/' + this.state.idherbsmed
      Axios.delete( url,axiosConfig)
        .then(data => {
            const res = data.data;
            console.log(res)
            window.location.href = '/company';
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
          <DialogTitle id="form-dialog-title">You update herbal medicine with id {this.state.idherbsmed}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idherbsmed}
            </DialogContentText> */}
            <Button
              containerElement='imageherbmeds' // <-- Just add me!
              label="herbal medicine image">
              <input type="file" />
            </Button>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc1"
              label="Name Location 1"
              name="nameloc1"
              type="text"
              value={this.state.nameloc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc2"
              label="Name Location 2"
              name="nameloc2"
              type="text"
              value={this.state.nameloc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              multiline rows={10}
              margin="dense"
              id="efficacy"
              label="Efficacy"
              name="efficacy"
              type="text"
              value={this.state.efficacy}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name"
              label="Efficacy Location"
              name="efficacyloc"
              type="text"
              value={this.state.efficacyloc}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idclass"
              label="Id Class"
              name="idclass"
              type="text"
              value={this.state.idclass}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idtype"
              label="Id Ttype"
              name="idtype"
              type="text"
              value={this.state.idtype}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idcompany"
              label="Id Company"
              name="idcompany"
              type="text"
              value={this.state.idcompany}
              fullWidth
              onChange={this.valueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.close} color="primary">
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
          <Button onClick={this.props.close} color="primary" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    )
  }else if(this.props.modal.mode === 'detail') {

  }else if(this.props.modal.mode === 'add') {
    return (
      <Dialog open={this.props.modal.open} onClose={this.props.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">You update herbal medicine with id {this.state.idherbsmed}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idherbsmed}
            </DialogContentText> */}
            <Button
              containerElement='imageherbmeds' // <-- Just add me!
              label="herbal medicine image">
              <input type="file" />
            </Button>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={this.state.name}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc1"
              label="Name Location 1"
              name="nameloc1"
              type="text"
              value={this.state.nameloc1}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="nameloc2"
              label="Name Location 2"
              name="nameloc2"
              type="text"
              value={this.state.nameloc2}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              multiline rows={10}
              margin="dense"
              id="efficacy"
              label="Efficacy"
              name="efficacy"
              type="text"
              value={this.state.efficacy}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="name"
              label="Efficacy Location"
              name="efficacyloc"
              type="text"
              value={this.state.efficacyloc}
              fullWidth
              onChange={this.valueChange}
            />
             <TextField
              margin="dense"
              id="ref"
              label="Refren"
              name="ref"
              type="text"
              value={this.state.ref}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idclass"
              label="Id Class"
              name="idclass"
              type="text"
              value={this.state.idclass}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idtype"
              label="Id Ttype"
              name="idtype"
              type="text"
              value={this.state.idtype}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="idcompany"
              label="Id Company"
              name="idcompany"
              type="text"
              value={this.state.idcompany}
              fullWidth
              onChange={this.valueChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.close} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
    }
}

export default ModalHerbMed;
