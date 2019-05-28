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
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Link } from 'react-router-dom'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
};

class Navigation extends Component {
  state = {
    right: false,
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
              <ListItemIcon>Dashboard</ListItemIcon>
              <ListItemText />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/herbmeds">
              <ListItemIcon>Herbal Medicine</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/medtype">
              <ListItemIcon>Medicine Type</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/company">
              <ListItemIcon>Company</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/dclass">
              <ListItemIcon>DClass</ListItemIcon>
              <ListItemText />
            </ListItem>
            <Divider />

            <ListItem button component={Link} to="/plant">
              <ListItemIcon>Plant</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/crudedrug">
              <ListItemIcon>Crude Drug</ListItemIcon>
              <ListItemText />
            </ListItem>
            <Divider />

            <ListItem button component={Link} to="/tacit">
              <ListItemIcon>Tacit Knowledge</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/explicit">
              <ListItemIcon>Explicit Knowledge</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/plantethnic">
              <ListItemIcon>Plant Ethnic</ListItemIcon>
              <ListItemText />
            </ListItem>

            <ListItem button component={Link} to="/ethnic">
              <ListItemIcon>Ethnic</ListItemIcon>
              <ListItemText />
            </ListItem>
            
        </List>
      </div>
    );

    

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Admin KMS Jamu
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
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
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