import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DescriptionIcon from '@material-ui/icons/Description';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { Link, useHistory, useLocation } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    toolbar: {
      backgroundColor: "#014F86"
    },
    iconStyle: {
      color: "#012A4A",
    },
  }),
);




export const PatientNavBar:React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const location: any = useLocation();

  const navbarData = [
    {
      name: 'Home',
      path: '/patient',
    },
    {
      name: 'Past requests',
      path: '/requestList',
    },
    {
      name: 'Create request',
      path: '/request',
    },
    {
      name: 'Forum',
      path: '/forumList',
    },
    {
      name: 'Logout',
      path: '/',
    }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 
  const homeClicked = () => {
    history.push({
      pathname: navbarData[0].path,
      state: {  //to access state use useLocation hook in function component
        patientInfo: props.patientInfo ? props.patientInfo : location.state.patientInfo 
    }
  })
  }

  const requestListClicked = () => {
      history.push({
        pathname: navbarData[1].path,
        state: {  //to access state use useLocation hook in function component
            patientInfo: props.patientInfo ? props.patientInfo : location.state.patientInfo 
        }
    })
  }

  const createRequestClicked = () => {
    history.push({
      pathname: navbarData[2].path,
      state: {  //to access state use useLocation hook in function component
          patientInfo: props.patientInfo ? props.patientInfo : location.state.patientInfo 
      }
  })
  }

  const forumClicked = () => {
    history.push({
      pathname: navbarData[3].path,
      state: {  //to access state use useLocation hook in function component
          patientInfo: props.patientInfo ? props.patientInfo : location.state.patientInfo 
      }
  })
  }

  const logoutClicked = () => {
    history.push(navbarData[4].path)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Revature Medical Clinic
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.drawerHeader}>
          {props.patientInfo ? props.patientInfo.firstname : location.state.patientInfo.firstname } {" "}
          {props.patientInfo ? props.patientInfo.lastname : location.state.patientInfo.lastname }
          <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

          <List>

                <ListItem onClick={homeClicked}  button key={navbarData[0].name}>
                <ListItemIcon><HomeIcon classes={{root: classes.iconStyle}}/></ListItemIcon>
                <ListItemText primary={navbarData[0].name} />
                </ListItem>
          
                <ListItem onClick={requestListClicked}  button key={navbarData[1].name}>
                <ListItemIcon><DescriptionIcon classes={{root: classes.iconStyle}}/></ListItemIcon>
                <ListItemText primary={navbarData[1].name} />
                </ListItem>
           
                <ListItem onClick={createRequestClicked}  button key={navbarData[2].name}>
                <ListItemIcon><NoteAddIcon classes={{root: classes.iconStyle}}/></ListItemIcon>
                <ListItemText primary={navbarData[2].name} />
                </ListItem>
              
                <ListItem onClick={forumClicked}  button key={navbarData[3].name}>
                <ListItemIcon><SpeakerNotesIcon classes={{root: classes.iconStyle}}/></ListItemIcon>
                <ListItemText primary={navbarData[3].name} />
                </ListItem>

                <ListItem onClick={logoutClicked} button key={navbarData[4].name}>
                <ListItemIcon><ExitToAppIcon classes={{root: classes.iconStyle}}/></ListItemIcon>
                <ListItemText primary={navbarData[4].name} />
                </ListItem>
              
          </List>
        
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {props.children}
      </main>
    </div>
  );
}

export default PatientNavBar