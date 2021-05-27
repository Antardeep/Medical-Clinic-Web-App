import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper, Divider, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import DoctorNavBar from './DoctorNavBar';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: '2rem',
            position: 'relative',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "white",
            color: '#014F86',
            marginBottom: '5rem'
        },
        editButton: {
            '&:hover': {
                color: '#014F86',
            },
            color: "#012A4A",
            backgroundColor: "#EDF2FB",
        },
    })
);

export const Doctor: React.FunctionComponent = (props) => {
    const location: any = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const { firstname, lastname, speciality, age, gender, phone, email, address, education, certification, awards } = location.state.doctorInfo;

    return (
        <DoctorNavBar>
            <div style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#EDF2FB', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                <div className="doctorHome">
                    <h2>WELCOME</h2>
                    <h1 style={{ textAlign: 'center' }}>Dr. {firstname} {lastname} <br />Speciality: {speciality}</h1>
                </div>
                <Paper elevation={3} classes={{ root: classes.paper }}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <h2>Personal Information</h2>
                        {/* <IconButton
                            className='float-right'
                            onClick={() => history.push('/')}
                            classes={{
                                root: classes.editButton,
                            }}>
                            <EditIcon style={{ fontSize: 30 }} />
                        </IconButton> */}
                    </div>
                    <Divider />
                    <h3>Age: {age}</h3>
                    <h3>Gneder: {gender}</h3>
                    <h3>Phone: {phone}</h3>
                    <h3>Email: {email}</h3>
                    <h3>Address<br />{address}</h3>
                    <h3>Education<br />{education}</h3>
                    <h3>Certifications<br />{certification}</h3>
                    <h3>Awards<br />{awards}</h3>
                </Paper>
            </div>
        </DoctorNavBar>
    );

}

export default Doctor;