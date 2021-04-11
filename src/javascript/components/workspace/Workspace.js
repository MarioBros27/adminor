// import Grid from '@material-ui/core/Grid';
// import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
// import { Dialog, DialogContent } from '@material-ui/core'
// import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
// import axios from 'axios'
// import React, { useState, useEffect, Fragment } from 'react'
// import Column from './Column'
// import FormDialog from './FormDialog'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TasksList from './TasksList'

// import CommentIcon from '@material-ui/icons/Comment';

const drawerWidth = 240;
let taskToDelete = -1

const tasks =
    [{
        id: 0,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur,',
        description: 'This is a description of something i have to do',
        due_date: '14-7-2021',
        done: false
    },
    {
        id: 1,
        title: 'Ir al banio',
        description: 'This is a description of something i have to do',
        due_date: '15-7-2021',
        done: false
    },
    {
        id: 2,
        title: 'Tocar la sinfonia de bethoven',
        description: 'This is a description of something i have to do',
        due_date: '16-7-2021',
        done: false
    },
    {
        id: 3,
        title: 'Nunca he ido al baniodesde que naci',
        description: 'This is a description of something i have to do',
        due_date: '17-7-2021',
        done: false
    }]

const done_tasks =
    [{
        id: 4,
        title: 'Comprar papael de banio',
        description: 'This is a description of something i have to do',
        due_date: '14-7-2021',
        done: true
    },
    {
        id: 5,
        title: 'Conseguir el dinero 1',
        description: 'This is a description of something i have to do',
        due_date: '15-7-2021',
        done: true
    },
    {
        id: 6,
        title: 'Conseguir el muero',
        description: 'This is a description of something i have to do',
        due_date: '15-7-2021',
        done: true
    }]

const StyledAddButton = withStyles({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#52b202',
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
})(Button);
const LogOutButton = withStyles({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#f50057',
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        marginTop: '20px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
})(Button);
const AddButton = withStyles({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#52b202',
        borderRadius: 3,
        border: 0,
        height: 48,
        padding: '0 30px',
        marginTop: '20px',
        marginBottom: '4px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
})(Button);
export default function Workspace(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo(
        () =>
            createMuiTheme({

                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',


                },
            }),
        [prefersDarkMode],
    );


    let isLaptop = useMediaQuery('(min-width: 600px)', { noSsr: true })

    //Play with drawer width with different sizes, simply modify variable drawerWidth
    const useStyles = makeStyles((theme) => {
        let shift = {}
        if (isLaptop) {
            shift = {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                // marginLeft: 0,
                marginLeft: drawerWidth,

            }
        } else {
            shift = {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),

            }
        }

        return ({
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
            },
            contentShift: shift
        })
    });

    const classes = useStyles();
    const [open, setOpen] = useState(isLaptop);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [notDone, setNotDone] = useState(tasks)
    const [done, setDone] = useState(done_tasks)
    const [deleteTask, setDeleteTask] = useState(false)

    const changeTaskStatus = function (value, id) {
        //If value is true it means that a not done is changed to done. If else the opposite
        var doneTemp = done
        var notDoneTemp = notDone

        //Removing the element to be transfered
        if (value) {
            //Transfering to new list
            const toBeTransfered = notDoneTemp.filter(el => el.id === id)
            const actuallyToBeTransfered = toBeTransfered[0]
            actuallyToBeTransfered.done = value

            //Pushing
            doneTemp.push(actuallyToBeTransfered)
            //Sort them by date
            // doneTemp = doneTemp.sort(function (a,b){
            //     // Turn your strings into dates, and then subtract them
            //     // to get a value that is either negative, positive, or zero.
            //     return new Date(b.due_date) - new Date(a.due_date);
            //   });

            //Deleting from previous list
            notDoneTemp = notDoneTemp.filter(el => el.id !== id)
        } else {
            //Transfering to new list
            const toBeTransfered = doneTemp.filter(el => el.id === id)
            const actuallyToBeTransfered = toBeTransfered[0]
            actuallyToBeTransfered.done = value
            // console.log(actuallyToBeTransfered)
            // console.log(actuallyToBeTransfered[0].value)
            // //Pushing
            notDoneTemp.push(actuallyToBeTransfered)
            // //Deleting from previous list
            doneTemp = doneTemp.filter(el => el.id !== id)
        }
        setDone(doneTemp)
        setNotDone(notDoneTemp)
    }
    
    const handleOpenDeleteTask = function(id) {
        setDeleteTask(true);
        taskToDelete = id
        console.log(taskToDelete)
    };

    const handleCloseDeleteTask = () => {
        setDeleteTask(false);
    };
    const handleDeleteTask = () => {
        setDeleteTask(false);
        console.log(taskToDelete)
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Adminor
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
                    {
                        isLaptop === false &&
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    }

                </div>
                <Divider />
                <List>
                    {['Proyecto de desarrollo web', 'Proyecto comprar limones', 'Compiladores', 'Proyecto recuperacion de agua'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </ListItemSecondaryAction>

                        </ListItem>
                    ))}
                </List>
                <Divider />
                <StyledAddButton>Add new project</StyledAddButton>
                <LogOutButton>Log Out</LogOutButton>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Typography variant="h3" >Proyecto de desarrollo web</Typography>
                <AddButton>Add new task</AddButton>
                <Divider />
                <TasksList tasks={notDone} handleOpenDeleteTask={handleOpenDeleteTask} changeTaskStatus={changeTaskStatus}></TasksList>
                <Divider />
                <Typography variant='h4'>Done</Typography>
                <TasksList tasks={done} changeTaskStatus={changeTaskStatus}></TasksList>

            </main>
            
                
                <Dialog
                    open={deleteTask}
                    onClose={handleCloseDeleteTask}
                >
                    {/* <DialogTitle id="">{"Sure you wanna delete the task?"}</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Sure you wanna delete the task?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteTask} variant="contained" color="primary">
                            Nah
                        </Button>
                        <Button onClick={handleDeleteTask}  variant="contained"color="secondary" autoFocus>
                            Yeah
                        </Button>
                    </DialogActions>
                </Dialog>
          
        </ThemeProvider>

    )
}

