import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IconButton, Tooltip, Paper, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getDoctorsList } from '../remote/remote-functions';
import { DoctorsList } from './common/DoctorsList';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px',
            margin: 'auto',
            width: '80%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-evenly',
            backgroundColor: '#EDF2FB',
            fontWeight: 'bolder',
            color: '#012A4A'
        },
        logoutButton: {
            '&:hover': {
                color: '#014F86',
            },
            color: "#012A4A",
            backgroundColor: "#EDF2FB",
            position: 'absolute',
            top: '1.2rem',
            right: '2rem',
        },
    })
);

export const Admin: React.FunctionComponent = () => {
    const history = useHistory();
    const location: any = useLocation();
    const classes = useStyles();
    const [doctorsList, setDoctorsList] = useState([]);
    const [filter, setFilter] = useState("Pending");
    const [update, setUpdate] = useState(false);

    async function getDocList() {
        let docList = await getDoctorsList();
        let sortedDocList = docList.sort(function (a, b) { return b.doctorID - a.doctorID; });
        setDoctorsList(sortedDocList);
    }

    useEffect(() => {
        getDocList()
        setUpdate(false)
    }, [update])

    const MyRadio = withStyles({
        root: {
            color: "#012A4A",
            '&$checked': {
                color: "#014F86",
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const handleRadioChange = (event: any) => {
        setFilter(event.target.value);
    };

    const handleChange = () => {
        setUpdate(true);
    }

    return (
        <div>
            <h2 id="adminTitle">ADMIN PORTAL</h2>
            <Tooltip title="Log out">
                <IconButton
                    className='float-left'
                    onClick={() => history.push('/')}
                    classes={{
                        root: classes.logoutButton,
                    }}>
                    <ExitToAppIcon style={{ fontSize: 35 }} />
                </IconButton>
            </Tooltip>
            <Paper elevation={3} classes={{ root: classes.root }}>
                <h2>Doctor Accounts</h2>
                <RadioGroup row name="role" onChange={handleRadioChange} style={{ color: "#012A4A", display: 'flex', justifyContent: 'space-around', width: '50%' }}>
                    <FormControlLabel
                        value="Pending"
                        control={<MyRadio />}
                        label="Pending"
                        labelPlacement="start"
                        style={{ color: "#012A4A" }}
                    />
                    <FormControlLabel
                        value="Approved"
                        control={<MyRadio />}
                        label="Approved"
                        labelPlacement="start"
                        style={{ color: "#012A4A" }}
                    />
                    <FormControlLabel
                        value="Rejected"
                        control={<MyRadio />}
                        label="Rejected"
                        labelPlacement="start"
                        style={{ color: "#012A4A" }}
                    />
                </RadioGroup>
            </Paper>
            <Paper elevation={6} id="listPanel">
                <DoctorsList doctorsList={doctorsList} filter={filter} handleChange={handleChange} />
            </Paper>
           


        </div>
    )
}
export default Admin;