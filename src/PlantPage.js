import React, { Component } from 'react'
import Axios from "axios";

import CardExample from './card'
import Spinner from './Spinner'
import SearchInput from './SearchInput'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ModalPlant from './ModalPlant';

class PlantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          inputSearch: '',
          plant : [],
          onSearch : [],
          crude: [],
          modal: {
            open: false,
            mode: '',
          },
          currentPage: 1
        }
        this.onScroll = this.onScroll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataSearch = this.getDataSearch.bind(this);
        this.updateBtn = this.updateBtn.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
        this.detailBtn = this.detailBtn.bind(this);
        this.addBtn = this.addBtn.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
      }

      async componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
        const urlCrude = '/jamu/api/crudedrug/getlist'
        const resCrude = await Axios.get(urlCrude);
        let dataCrude =  await resCrude.data.data.map(dt => {
          return {label:dt.sname,value:dt._id}
        });
        this.setState({
          crude: dataCrude
        })
        this.getData();
      }

      async onScroll() {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          !this.props.isLoading
        ){
          await this.setState({
            loadData: true,
            currentPage: this.state.currentPage + 1
          })
          this.getData();
        }
      };
      
     async getData(){
      const url = '/jamu/api/plant/pages/' + this.state.currentPage;
      const res = await Axios.get(url);
      const { data } = await res;
      let newData = this.state.plant.concat(data.data);
      this.setState({
        plant: newData, 
        loading: false
      })
    }

    async getDataSearch(event){
      console.log(this.state.inputSearch)
      const url = '/jamu/api/plant/search';
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
          }
        };
      const res =  await Axios.get(url,{
        params: {
          search: this.state.inputSearch
        }
      },axiosConfig);
      const { data } = await res;
      let newData = data.data;
      console.log(newData)
      this.setState({
        onSearch: newData, 
        loading: false
      })
      event.preventDefault();
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
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

    async updateBtn(id) {
      let onSelect =  await this.state.plant.find( c => {
        return c.idplant === id
      })
      this.setState({
        onSelect: onSelect,
        modal: {
          open: true,
          mode: 'update'
        }
      })
  }

  async detailBtn(id) {
    let onSelect =  await this.state.plant.find( c => {
      return c.idplant === id
    })
    this.setState({
      onSelect: onSelect,
      modal: {
        open: true,
        mode: 'detail'
      }
    })
}

    addBtn() {
      this.setState({
        modal: {
          open: true,
          mode: 'add'
        }
      })
    }

    async deleteBtn(id) {
      let onSelect =  await this.state.plant.find( c => {
        return c.idplant === id
      })
      this.setState({
        onSelect: onSelect,
        modal: {
          open: true,
          mode: 'delete'
        }
      })
    }

      render() {
        if (this.state.loading) {
          return <Spinner />
        }
    
        if (!this.state.plant) {
          return <div><br></br><br></br> <br></br>didn't get a person</div>;
        }

        if(this.state.inputSearch !== '' && this.state.onSearch !== []){
          return (
            <div style={{
              display: "flex",
              flexDirection:"column",
              paddingTop:"30px"

            }}>
            <div style={{
                width:"90%",
                display:"flex",
                flexDirection:"row",
                margin:"auto"
              }}>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row"
              }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Link color="inherit" href="/" >
                    KMS Jamu
                  </Link>
                  <Link color="inherit" >
                    Explore
                  </Link>
                  <Typography color="textPrimary">Plant</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                 <SearchInput nameInput="inputSearch" inputValue={this.state.inputSearch} inputChange={this.handleInputChange} clickButton={this.getDataSearch}/>
              </div>
              </div>
              
              <div className="for-card">
                {this.state.onSearch.map(item =>
                  <CardExample key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                )}
              </div>
            </div>
        );
      }

        return (
            <div style={{
              display: "flex",
              flexDirection:"column",
              paddingTop:"30px"

            }}>
            <div style={{
                width:"90%",
                display:"flex",
                flexDirection:"row",
                margin:"auto"
              }}>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row"
              }}>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Link color="inherit" href="/" >
                    KMS Jamu
                  </Link>
                  <Link color="inherit" >
                    Explore
                  </Link>
                  <Typography color="textPrimary">Plant</Typography>
                </Breadcrumbs>
              </div>
              <div style={{
                width:"50%",
                display:"flex",
                flexDirection:"row-reverse"
              }}>
                 <SearchInput nameInput="inputSearch" inputValue={this.state.inputSearch} inputChange={this.handleInputChange} clickButton={this.getDataSearch}/>
              </div>
              </div>
              
              <div className="for-card">
                {this.state.plant.map(item =>
                          <CardExample key={item.id} id={item.idplant} name={item.sname} image={item.refimg} reff={item.refCrude} detail={this.detailBtn} update={this.updateBtn} delete={this.deleteBtn}/>
                        )}
                {this.state.loadData ? <div><br></br><br></br> <br></br>loading...</div>
                  : null }
                {this.state.modal.open === true ? <ModalPlant baseCrude={this.state.crude} data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
                : 
                null
                }
              </div>
              <Fab style={{
                 position:"fixed",
                 width:"45px",
                 height:"45px",
                 bottom:"25px",
                 right:"25px"
               }} color="primary" aria-label="Add" onClick={this.addBtn}>
                <AddIcon />
              </Fab>
            </div>
        );
      }
}

export default PlantPage;