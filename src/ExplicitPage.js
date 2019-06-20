import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link2 from '@material-ui/core/Link';
import SearchInput from './SearchInput'
import Spinner from './Spinner'

import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Pagination from "material-ui-flat-pagination";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function ListExplicit (props) {
  const classes = useStyles();
    return (
        <div style={{
            height:"250px",
            marginTop: "25px",
            border:"1px solid black"
        }}> 
        <Typography variant="subheading" style={{
            color: "#1976d8"
        }}>
        <Link to={`/explicit/${ props.id }`}>
            {props.title}
        </Link>
        </Typography>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p className="block-with-text">
            {props.abstract}
        </p>
        <Fab color="secondary" aria-label="Edit" className={classes.fab}>
          <Icon>edit_icon</Icon>
        </Fab>
        <Fab aria-label="Delete" className={classes.fab}>
          <DeleteIcon />
        </Fab>
       </div>
    )
}


class ExplicitPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          explicit : [],
          currentPage: 1,
        }
        // this.onScroll = this.onScroll.bind(this);
      }
    
      async componentDidMount() {
        // window.addEventListener('scroll', this.onScroll);
        this.getData();
      }
      
    //   async onScroll() {
    //     if (
    //       window.innerHeight + document.documentElement.scrollTop
    //       === document.documentElement.offsetHeight
    //     ) {
    //       // Do awesome stuff like loading more content!
    //       await this.setState({
    //         loadData: true,
    //         currentPage: this.state.currentPage + 1
    //       })
    //       this.getData();
    //     }
    //   }
      
      async getData(){
        const url = '/jamu/api/explicit';
        const res = await Axios.get(url);
        const { data } = await res;
        let newData = this.state.explicit.concat(data.data);
        console.log(newData)
        this.setState({
          explicit: newData, 
          loading: false,
          offset:5
        })
      }
    
        logout = event => {
            window.location.href = '/form/explicit';
        }

        handleClick(offset,page) {
          console.log(page)
          this.setState({ offset });
        }

    render (){
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                margin: "auto",
                marginTop:"30px",
                width:"100%"
            }}>
                <div style={{
                  width:"95%",
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
                      <Link2 color="inherit" href="/" >
                        KMS Jamu
                      </Link2>
                      <Link2 color="inherit" >
                        Explore
                      </Link2>
                      <Typography color="textPrimary">Plant</Typography>
                    </Breadcrumbs>
                  </div>
                  <div style={{
                    width:"50%",
                    display:"flex",
                    flexDirection:"row-reverse"
                  }}>
                     <Button variant="outlined" onClick={this.logout} size="medium" color="primary" >
                      Add
                    </Button>
                    <SearchInput />
                    
                  </div>
                </div>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    margin:"auto",
                    border:"hsl(0,0%,80%) 1px solid",
                    width:"95%",
                    marginBottom: "10px"
                }}>
                    <div style={{
                        width:"20%",
                        maxHeight: "350px",
                        border:"hsl(0,0%,80%) 1px solid"
                    }}> 
                        
                    </div>
                    <div style={{
                        width:"80%",
                        border:"hsl(0,0%,80%) 1px solid",
                        padding: "25px",
                        minHeight:"500px"
                    }}>
                      {this.state.explicit.map(item =>
                        <ListExplicit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                      )}
                  </div>
              </div>  
              <Pagination
                style={{
                  margin:"auto",
                  marginBottom: "10px"
                }}
                size='large'
                limit={10}
                offset={this.state.offset}
                total={250}
                onClick={(e,offset, page) => this.handleClick(offset,page)}
              />
            </div>
        );
    }
}

export default ExplicitPage;
