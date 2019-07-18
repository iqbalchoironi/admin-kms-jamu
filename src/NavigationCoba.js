import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PlantIcon from './icon/planticon.png'
import HerbMedIcon from './icon/herbmedicon.png'
import CompanyIcon from './icon/companyicon.png'
import CompoundIcon from './icon/compoundicon.png'
import CrudeIcon from './icon/crudeicon.png'
import DClassIcon from './icon/dclassicon.png'
import EthnicIcon from './icon/ethnicicon.png'
import ExplicitIcon from './icon/expliciticon.png'
import MedTypeIcon from './icon/medtypeicon.png'
import PlantethnicIcon from './icon/plantethnicicon.png'
import TacitIcon from './icon/taciticon.png'

import { Link } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'    
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
});

class Navigation extends Component {
  state = {
    left: true,
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  logout = event => {
    localStorage.removeItem("user");
    window.location.href = '/';
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    let user = localStorage.getItem("user")
    user = JSON.parse(user)

    const sideList = (
      <div className={classes.list}>
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider /> */}
        <List>
            <ListItem button component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/herbmeds">
              <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={HerbMedIcon} />
              </ListItemIcon>
              <ListItemText primary="Herbal Medicine" />
            </ListItem>

            <ListItem button component={Link} to="/medtype">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={MedTypeIcon} />
              </ListItemIcon>
              <ListItemText primary="Medicine Type" />
            </ListItem>

            <ListItem button component={Link} to="/company">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={CompanyIcon} />
              </ListItemIcon>
              <ListItemText primary="Company" />
            </ListItem>

            <ListItem button component={Link} to="/dclass">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={DClassIcon} />
              </ListItemIcon>
              <ListItemText primary="DClass" />
            </ListItem>
            <Divider />

            <ListItem button component={Link} to="/plant">
            <ListItemIcon>
              <img style={{
                width: "30px",
                height: "30px",
                margin: "0"
              }} src={PlantIcon} />
            </ListItemIcon>
            <ListItemText primary="Plant" />
            </ListItem>

            <ListItem button component={Link} to="/crudedrug">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={CrudeIcon} />
              </ListItemIcon>
              <ListItemText primary="Crude Drug" />
            </ListItem>
            <Divider />

            <ListItem button component={Link} to="/tacit">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={TacitIcon} />
              </ListItemIcon>
              <ListItemText primary="Tacit Knowledge" />
            </ListItem>

            <ListItem button component={Link} to="/explicit">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={ExplicitIcon} />
              </ListItemIcon>
              <ListItemText primary="Explicit Knowledge" />
            </ListItem>

            <ListItem button component={Link} to="/plantethnic">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={PlantethnicIcon} />
              </ListItemIcon>
              <ListItemText primary="Plant Ethnic" />
            </ListItem>

            <ListItem button component={Link} to="/ethnic">
            <ListItemIcon>
                <img style={{
                  width: "30px",
                  height: "30px",
                  margin: "0"
                }} src={EthnicIcon} />
              </ListItemIcon>
              <ListItemText primary="Ethnic" />
            </ListItem>
            
        </List>
      </div>
    );

    

    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, this.state.left && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={this.toggleDrawer('left', true)}
            className={clsx(classes.menuButton, this.state.left && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {user ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : <Button style={{
              backgroundColor:"white"
            }} component={Link} to="/login">Login</Button>}
          </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !this.state.left && classes.drawerPaperClose),
        }}
        open={this.state.left}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.toggleDrawer('left', false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{sideList}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {this.props.children}
      </main>
    </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);