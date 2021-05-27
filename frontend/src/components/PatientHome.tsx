import React from 'react';
import '../assets/patient.scss'
import { PatientNavBar } from './PatientNavBar';
import { Paper, Divider, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

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

export const PatientHome: React.FunctionComponent<any> = () => {
    const location: any = useLocation();
    const classes = useStyles();
    const {firstname, lastname, gender, healthcardnumber, address, age, email, phone} = location.state.patientInfo

    return(
        <>
                <PatientNavBar patientInfo={location.state.patientInfo}>
                    <div style={{ minHeight: '100vh', height: 'auto', backgroundColor: '#EDF2FB', display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                        <div className="patientHome">
                            <h2>WELCOME</h2>
                            <h1 style={{ textAlign: 'center' }}>{firstname} {lastname} <br /></h1>
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
                            <h3>Health Card Number: {healthcardnumber}</h3>
                            <h3>Age: {age}</h3>
                            <h3>Gender: {gender}</h3>
                            <h3>Phone: {phone}</h3>
                            <h3>Email: {email}</h3>
                            <h3>Phone: {phone}</h3>
                            <h3>Address<br />{address}</h3>

                        </Paper>
                    </div>
                </PatientNavBar>

          </>  
        
    )
}

export default PatientHome;