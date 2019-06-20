import React, { Component } from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  TextField
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import Axios from 'axios'
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
       <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="input">Add reference here</InputLabel>
            <Input  value={this.props.input} name="input" onChange={this.props.onChange} type="text" />
        </FormControl>
        <Button style={{marginRight:"10px"}} onClick={this.props.add} variant="contained" color="primary" >
          Add reference
        </Button>
        <Button onClick={this.props.closePopup} variant="contained" color="primary" >
          Close
        </Button>
      </div>
    );
  }
}
class FormTacit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      title: '',
      content: '',
      file: null,
      reference: '',
      input:'',
    };
    
    this.addreference = this.addreference.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
    console.log(this.state)
  }

  valueChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }
  addreference = () => {
    this.setState({ 
      reference: [...this.state.reference, this.state.input],
      input: '',
      showPopup: false
    });
  }

  handleSubmit = event => {
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': user.token
            }
        };
        
    let url = '/jamu/api/tacit/add';
    const formData = new FormData();
    formData.append('file',this.state.file);
    formData.append('title',this.state.title);
    formData.append('content',this.state.content);
    formData.append('reference',this.state.reference);
    Axios.post( url,formData,axiosConfig)
      .then(data => {
          const res = data.data;
          console.log(res)
          window.location.href = '/tacit';
      })
      .catch(err => {
          console.log(err)
      });
          event.preventDefault();
  }

  render() {
    return (
      <Paper style={{
        width: '90%',
        margin: 'auto',
        marginTop: '100px',
        padding: "10px"
      }} elevation={4}>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input onChange={this.valueChange}  name="title" id="title" type="text" />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="content">Content</InputLabel>
        <Input name="content" onChange={this.valueChange} id="content" multiline rows={15} />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <Button>
          <input type="file" name="file" onChange={this.onChange}/>
        </Button>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="reference">Reference</InputLabel>
        <Input name="reference" onChange={this.valueChange} id="reference" />
      </FormControl>
        {/* <label>refrensi :</label>
        <Fab onClick={this.togglePopup} color="primary" aria-label="Add" >
          <AddIcon />
        </Fab>
        {this.state.showPopup ? 
          <Popup
            text='Close Me'
            input={this.state.input}
            closePopup={this.togglePopup}
            onChange={this.onChange}
            add={this.addreference}
          />
          : null
        }
        {this.state.reference ? 
          this.state.reference.map(item => {
            return <p>{item}</p>
          })
          : null
        }
        <hr></hr> */}
        <Button style={{
          display:"block",
          width:"80%",
          margin:"auto",
        }} onClick={this.handleSubmit} variant="contained" color="primary" >
          Submit
        </Button>
      </Paper>
    );
  }
}

export default FormTacit;