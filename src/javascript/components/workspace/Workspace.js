
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
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
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TasksList from './TasksList'
import DatePicker from './DatePicker'

const drawerWidth = 240;
let taskToDelete = -1
let projectToDelete = -1
let dummyNewId = 100

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

// const starting_projects = ['Proyecto de desarrollo web', 'Proyecto comprar limones', 'Compiladores', 'Proyecto recuperacion de agua'];
const starting_projects = [
    {
        id: 0,
        project_name: 'Proyecto de desarrollo web',
        user_id: 0,
        due_date: '9-9-2021'
    },
    {
        id: 1,
        project_name: 'Proyecto comprar limones',
        user_id: 0,
        due_date: '10-9-2021'
    },
    {
        id: 2,
        project_name: 'Compiladores',
        user_id: 0,
        due_date: '11-9-2021'
    },
    {
        id: 3,
        project_name: 'Proyecto recuperacion de agua',
        user_id: 0,
        due_date: '12-9-2021'
    },
]
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
const SaveButton = withStyles({
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
const DeleteButton = withStyles({
    root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#f50057',
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
    const [deleteProject, setDeleteProject] = useState(false)
    const [projectTitle, setProjectTitle] = useState('')
    const [openNewProjectD, setOpenNewProjectD] = useState(false)
    const [projects, setProjects] = useState(starting_projects)
    const [currentProjectTitle, setCurrentProjectTitle] = useState(projects[0].project_name)
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleOpenDeleteTask = function (id) {
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
    const handleOpenDeleteProject = function (id) {
        setDeleteProject(true);
        projectToDelete = id
        console.log(projectToDelete)
    };

    const handleCloseDeleteProject = () => {
        setDeleteProject(false);
    };
    const handleDeleteProject = () => {
        setDeleteProject(false);
        setProjects(projects.filter(el => el.id !== projectToDelete))
        console.log(projectToDelete)
    };

    ///NEw Project
    const handleOpenNewProject = function () {
        setSelectedDate(new Date())
        setOpenNewProjectD(true)
    };

    const handleCloseNewProject = () => {
        setOpenNewProjectD(false)
        setProjectTitle('')
    };
    const handleSaveNewProject = () => {
        var date = selectedDate.getDate().toString()
        var month = (selectedDate.getMonth() + 1).toString()
        var year = selectedDate.getFullYear().toString()
        var newDate = `${date}-${month}-${year}`
        console.log(newDate)
        var dummyNewProject = {
            id: dummyNewId,
            project_name: 'No name',
            user_id: 0,
            due_date: newDate
        }
        
        if (projectTitle !== '') {
            dummyNewProject['project_name'] = projectTitle
        } 
        dummyNewId+=1
        projects.push(dummyNewProject)
        setProjectTitle('')
        setOpenNewProjectD(false)
    };
    //Edit project name TODO--------------------------------------*******S
    const handleOpenEditProject = function () {
        setOpenNewProjectD(true)
    };

    const handleCloseEditProject = () => {
        setOpenNewProjectD(false)
        setProjectTitle('')
    };
    const handleSaveEditProject = () => {
        setOpenNewProjectD(false)
        if (projectTitle === '') {
            projects.push('No name')
        } else {
            projects.push(projectTitle)
        }

        // setProjects(p)
        setProjectTitle('')
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
                    {projects.map(proj => {
                        return (
                            <ListItem button key={proj.id}>
                                <ListItemText primary={proj.project_name} />
                                <ListItemSecondaryAction onClick={() => handleOpenDeleteProject(proj.id)}>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>);
                    })}
                </List>
                <Divider />
                <StyledAddButton onClick={() => handleOpenNewProject()}>Add new project</StyledAddButton>
                <LogOutButton>Log Out</LogOutButton>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid container direction='row' alignItems="flex-start">
                    <Grid item xs={11}  >

                        <Typography variant="h3" >{currentProjectTitle}</Typography>
                    </Grid>

                    <Grid item container xs={1} >
                        <Button>
                            <EditIcon></EditIcon>
                        </Button>

                    </Grid>
                </Grid>
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
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sure you wanna delete the task?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteTask} variant="contained" color="primary">
                        Nah
                        </Button>
                    <Button onClick={handleDeleteTask} variant="contained" color="secondary" autoFocus>
                        Yeah
                        </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={deleteProject}
                onClose={handleCloseDeleteProject}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Sure you wanna delete the project?
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteProject} variant="contained" color="primary">
                        Nah
                        </Button>
                    <Button onClick={handleDeleteProject} variant="contained" color="secondary" autoFocus>
                        Yeah
                        </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openNewProjectD}
                onClose={handleCloseNewProject}
            >
                <DialogContent>
                    <TextField
                        id="title-project-name"
                        label="Project name"
                        variant="outlined"
                        inputProps={{ maxLength: 80 }}
                        multiline
                        color="secondary"
                        rowsMax={2}
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                    <DatePicker selectedDateIn={selectedDate}></DatePicker>
                </DialogContent>
                <DialogActions>
                    <DeleteButton onClick={handleCloseNewProject} variant="contained" color="secondary">
                        Cancel
                        </DeleteButton>
                    <StyledAddButton onClick={handleSaveNewProject} variant="contained" color="primary" autoFocus>
                        Save
                        </StyledAddButton>
                </DialogActions>
            </Dialog>




        </ThemeProvider>

    )
}

