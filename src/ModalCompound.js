import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "react-select";

import LinearProgress from "./LinearProgress";

import Axios from "axios";

const ModalRefPlant = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Select Reference Plant :</DialogTitle>
      <DialogContent
        style={{
          height: "200px"
        }}
      >
        <Select
          onChange={props.handleChange("addPlant")}
          options={props.basePlant}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleAddPlant} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const List = props => {
  if (props.item.sname !== "") {
    return (
      <li>
        {props.item.label}{" "}
        <button id={props.item.value} onClick={props.delete}>
          delete
        </button>
      </li>
    );
  }

  return null;
};

class ModalCompound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalCrude: false,
      addCrude: null,
      loading: false,
      _id: "",
      cname: "",
      effect_compound: "",
      effect_part: "",
      effect_plant: "",
      part: "",
      part_plant: "",
      plant_species: "",
      refPlant: "",
      reff_addtional: "",
      reff_metabolites: ""
    };
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleAddPlant = this.handleAddPlant.bind(this);
    this.handleDeletePlant = this.handleDeletePlant.bind(this);
  }

  async componentDidMount() {
    if (
      this.props.modal.mode === "update" ||
      this.props.modal.mode === "detail" ||
      this.props.modal.mode === "delete"
    ) {
      let refPlant =
        this.props.data.refPlant !== null
          ? await this.props.basePlant.find(
              dt => dt.value === this.props.data.refPlant._id
            )
          : null;
      // let refPlant = await this.props.data.refPlant.map(dt => {
      //   return { label: dt.sname, value: dt.idplant };
      // });

      this.setState({
        _id: this.props.data._id,
        cname: this.props.data.cname,
        effect_compound: this.props.effect_compound,
        effect_part: this.props.data.effect_part,
        effect_plant: this.props.data.effect_plant,
        part: this.props.data.part,
        part_plant: this.props.data.part_plant,
        plant_species: this.props.data.plant_species,
        refPlant: refPlant,
        reff_addtional: this.props.data.reff_addtional,
        reff_metabolites: this.props.data.reff_metabolites
      });
    }
  }

  handleAddPlant = () => {
    let newData = this.state.refPlant.concat(this.state.addPlant);
    this.setState({
      refPlant: newData,
      addPlant: null
    });
    this.togglePopup();
  };

  handleDeletePlant = e => {
    console.log(e.target.id);
    let newData = this.state.refPlant.filter(dt => dt.value !== e.target.id);
    this.setState({
      refPlant: newData
    });
  };

  togglePopup = () => {
    this.setState({
      openModalPlant: !this.state.openModalPlant
    });
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  valueChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onChange(e) {
    this.setState({ img: e.target.files[0] });
  }

  handleSubmitUpdate = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/compound/update/" + this.state._id;

    Axios.patch(
      url,
      {
        cname: this.state.cname,
        effect_compound: this.props.effect_compound,
        effect_part: this.state.effect_part,
        effect_plant: this.state.effect_plant,
        part: this.state.part,
        part_plant: this.state.part_plant,
        plant_species: this.state.plant_species,
        refPlant: this.state.refPlant.value,
        reff_addtional: this.state.reff_addtional,
        reff_metabolites: this.state.reff_metabolites
      },
      axiosConfig
    )
      .then(data => {
        const res = data.data;
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
  };

  handleSubmitAdd = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token
      }
    };

    let url = "/jamu/api/compound/add";
    let refPlant = this.state.refPlant.map(data => data.value);
    Axios.post(
      url,
      {
        cname: this.state.cname,
        effect_compound: this.props.effect_compound,
        effect_part: this.state.effect_part,
        effect_plant: this.state.effect_plant,
        part: this.state.part,
        part_plant: this.state.part_plant,
        plant_species: this.state.plant_species,
        refPlant: refPlant,
        reff_addtional: this.state.reff_addtional,
        reff_metabolites: this.state.reff_metabolites
      },
      axiosConfig
    )
      .then(data => {
        const res = data.data;
        console.log(res);
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
  };

  handleSubmitDelete = event => {
    this.setState({
      loading: true
    });
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    let axiosConfig = {
      headers: {
        Authorization: user.token
      }
    };

    let url = "/jamu/api/compound/delete/" + this.state._id;
    Axios.delete(url, axiosConfig)
      .then(data => {
        const res = data.data;
        this.props.afterUpdate(res.success, res.message);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          this.props.afterUpdate(false, err.response.data.message);
          this.setState({
            loading: false
          });
        } else {
          this.props.afterUpdate(false, err.message);
          this.setState({
            loading: false
          });
        }
      });
  };

  render() {
    if (this.props.modal.mode === "update") {
      return (
        <div>
          <Dialog
            open={this.props.modal.open}
            onClose={this.props.close}
            aria-labelledby="form-dialog-title"
          >
            {this.state.loading ? <LinearProgress /> : null}
            <DialogTitle id="form-dialog-title">
              You update plant with id {this.state.idplant} and name is{" "}
              {this.state.cname} :{" "}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
              You update herbal medicine with id {this.state.idplant}
            </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="cname"
                label="Compound Name"
                name="cname"
                type="text"
                value={this.state.cname}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Effect Compound"
                label="Effect Compound"
                name="effect_compound"
                type="text"
                value={this.state.effect_compound}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Effect Part"
                label="Effect part"
                name="effect_part"
                type="text"
                value={this.state.effect_part}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Effect Part"
                label="Effect part"
                name="effect_part"
                type="text"
                value={this.state.effect_part}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Effect Plant"
                label="Effect plant"
                name="effect_plant"
                type="text"
                value={this.state.effect_plant}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Part"
                label="Part"
                name="part"
                type="text"
                value={this.state.part}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Part"
                label="Part"
                name="part"
                type="text"
                value={this.state.part}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Part plant"
                label="Part plant"
                name="part_plant"
                type="text"
                value={this.state.part_plant}
                fullWidth
                onChange={this.valueChange}
              />
              <TextField
                margin="dense"
                id="Plant species"
                label="plant_species"
                name="plant_species"
                type="text"
                value={this.state.plant_species}
                fullWidth
                onChange={this.valueChange}
              />
              <label
                style={{
                  color: "grey",
                  fontWeight: "lighter",
                  fontSize: "13px",
                  display: "block",
                  marginTop: "10px",
                  marginBottom: "5px"
                }}
              >
                referen plant
              </label>
              <Select
                value={this.state.refPlant}
                onChange={this.handleChange("refPlant")}
                options={this.props.basePlant}
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
    } else if (this.props.modal.mode === "delete") {
      return (
        <Dialog
          open={this.props.modal.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="alert-dialog-title">
            {"You want delete ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want delete plant record data with id {this.state._id} and
              name {this.state.cname}
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
      );
    } else if (this.props.modal.mode === "detail") {
    } else if (this.props.modal.mode === "add") {
      return (
        <Dialog
          open={this.props.modal.open}
          onClose={this.props.close}
          aria-labelledby="form-dialog-title"
        >
          {this.state.loading ? <LinearProgress /> : null}
          <DialogTitle id="form-dialog-title">
            You update plant with id {this.state.idplant} and name is{" "}
            {this.state.cname} :{" "}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              You update herbal medicine with id {this.state.idplant}
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="cname"
              label="Compound Name"
              name="cname"
              type="text"
              value={this.state.cname}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Effect Compound"
              label="Effect Compound"
              name="effect_compound"
              type="text"
              value={this.state.effect_compound}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Effect Part"
              label="Effect part"
              name="effect_part"
              type="text"
              value={this.state.effect_part}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Effect Part"
              label="Effect part"
              name="effect_part"
              type="text"
              value={this.state.effect_part}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Effect Plant"
              label="Effect plant"
              name="effect_plant"
              type="text"
              value={this.state.effect_plant}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Part"
              label="Part"
              name="part"
              type="text"
              value={this.state.part}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Part"
              label="Part"
              name="part"
              type="text"
              value={this.state.part}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Part plant"
              label="Part plant"
              name="part_plant"
              type="text"
              value={this.state.part_plant}
              fullWidth
              onChange={this.valueChange}
            />
            <TextField
              margin="dense"
              id="Plant species"
              label="plant_species"
              name="plant_species"
              type="text"
              value={this.state.plant_species}
              fullWidth
              onChange={this.valueChange}
            />
            {/* <label
              style={{
                color: "grey",
                fontWeight: "lighter",
                fontSize: "13px",
                display: "block",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              Reference Plant :
            </label>
            <Button onClick={this.togglePopup} color="primary">
              Add Refren Plant
            </Button>
            {this.state.openModalPlant === true ? (
              <ModalRefPlant
                basePlant={this.props.basePlant}
                handleChange={this.handleChange}
                handleAddPlant={this.handleAddPlant}
                close={this.togglePopup}
                open={this.state.openModalPlant}
              />
            ) : null}
            <ul className="reff">
              {this.state.refPlant.map(item => (
                <List item={item} delete={this.handleDeletePlant} />
              ))}
            </ul> */}
            <label
              style={{
                color: "grey",
                fontWeight: "lighter",
                fontSize: "13px",
                display: "block",
                marginTop: "10px",
                marginBottom: "5px"
              }}
            >
              referen plant
            </label>
            <Select
              value={this.state.refPlant}
              onChange={this.handleChange("refPlant")}
              options={this.props.basePlant}
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
      );
    }
  }
}

export default ModalCompound;
