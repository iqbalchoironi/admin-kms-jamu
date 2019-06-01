import React, { Component } from 'react'
import Axios from "axios";

import CardHerbMed from './CardHerbMed'
import SearchInput from './SearchInput'
import Spinner from './Spinner'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

import ModalHerbMed from './ModalHerbMed'

class HerbMeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          inputSearch: '',
          onSearch:[],
          herbmeds : [],
          modal: {
            open: false,
            mode: '',
          },
          onSelect: null,
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
        this.getData();
      }

      async onScroll() {
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          !this.props.isLoading
        ){
          // Do awesome stuff like loading more content!
          await this.setState({
            loadData: true,
            currentPage: this.state.currentPage + 1
          })
          this.getData();
        }
      };
      
     async getData(){
      const url = '/jamu/api/herbsmed/pages/' + this.state.currentPage;
      const res = await Axios.get(url);
      const { data } = await res;
      let newData = this.state.herbmeds.concat(data.data);
      this.setState({
        herbmeds: newData, 
        loading: false
      })
    }

    async getDataSearch(){
      console.log(this.state.inputSearch)
      this.setState({
        loadData: true
      })
      const url = '/jamu/api/herbsmed/search';
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
        loadData: false
      })
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(value)
      console.log(name)
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
      console.log(id)
      let onSelect =  await this.state.herbmeds.find( c => {
        return c.idherbsmed === id
      })
      console.log(onSelect)
      this.setState({
        onSelect: onSelect,
        modal: {
          open: true,
          mode: 'update'
        }
      })
  }

  detailBtn(e) {
    let onSelect =  this.state.company.filter( c => {
      return c.idcompany === e.target.dataset.value
    })
    
    this.setState({
      onSelect: onSelect,
      modalOpen: 'detail'
    })
}

    addBtn() {
      this.setState({                             
        modalOpen: 'add'
      })
    }

    deleteBtn(e) {
      let onSelect =  this.state.herbMed.filter( c => {
        return c.idherbsmed === e.target.dataset.value
      })
      this.setState({      
        onSelect: onSelect,                       
        modalOpen: 'delete'
      })
    }

      render() {
        if (this.state.loading) {
          return <Spinner />;
        }
    
        if (!this.state.herbmeds) {
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
                  <Typography color="textPrimary">Herbal Medicine</Typography>
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
                          <CardHerbMed key={item.idherbsmed} name={item.name} efficacy={item.efficacy}/>
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
                  <Typography color="textPrimary">Herbal Medicine</Typography>
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
                {this.state.herbmeds.map(item =>
                          <CardHerbMed key={item.idherbsmed} id={item.idherbsmed} name={item.name} efficacy={item.efficacy} reff={item.refCrude} update={this.updateBtn}/>
                 )}
                {this.state.loadData ? <div><br></br><br></br> <br></br>loading...</div>
                  : null }
              </div>
              {this.state.modal.open === true ? <ModalHerbMed data={this.state.onSelect} modal={this.state.modal} close={this.closeBtn}/>
                        : 
                        null
              } 
            </div>
        );
      }
}

export default HerbMeds;