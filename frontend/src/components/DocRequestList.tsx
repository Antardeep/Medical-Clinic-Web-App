import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Paper, Grid, TextField } from '@material-ui/core';
import { getPendingRequestList, postDoctorResponse } from '../remote/remote-functions';
import { useLocation } from 'react-router-dom';
import DoctorNavBar from './DoctorNavBar';
import { styles } from '../assets/styles.js';

interface IPatient {
    healthCardNumber: number,
    firstname: string,
    lastname: string
    email: string
    phone: string
    timeStamp: string,
}

interface IDoctor {
    firstname: string
    lastname: string
    email: string
    phone: string
}
interface IReqList {
    patientId: IPatient,
    doctorId: IDoctor,
    problem: string,
    responsed: boolean,
    timeStamp: string,
    requestId: number
    prescription: string
}


export const DocRequestList: React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const location: any = useLocation()
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            paper: {
                padding: '2rem',
                position: 'relative',
                backgroundColor: "#EDF2FB",
                margin: '2rem',
                color: '#012A4A'
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                flexBasis: '33.33%',
                flexShrink: 0,
            },
            secondaryHeading: {
                fontSize: theme.typography.pxToRem(15),
                color: theme.palette.text.secondary,
            },
            submitButton: {
                '&:hover': {
                    background: "#4BB543",
                },
                backgroundColor: '#014F86',
                color: 'white',
                fontWeight: 'bolder',
                width: '8rem',
                boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
                float: "right",
                height: '2rem'
            },
        }),
    )

    const [prescription, setPrescription] = useState<string>("");
    const [doctorresponse, setDocRes] = useState<string>("");
    const [hasappointment, setAppointment] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handlePrescription = e => {
        setPrescription(e.target.value);
    }

    const handleDocRes = e => {
        setDocRes(e.target.value);
    }

    const handleAppointment = (event: any) => {
        setAppointment(true);
    };

    const postDocResponse = async (reqid) => {
        const docResponse = {
            prescription: prescription,
            doctorresponse: doctorresponse,
            requestId: reqid,
            hasappointment: hasappointment
        }
        if(hasappointment || prescription || doctorresponse){
        const data = await postDoctorResponse(docResponse);
        setExpanded(false)
        }else{
            setError(true)
        }
    }

    function getDoctorInfo(pinfo: IPatient) {

        return (
            <>
                <b>Patient Details:</b><br />

           Name: {pinfo ? pinfo.firstname: "" } {pinfo ? pinfo.lastname : ""}<br />
           email: {pinfo ? pinfo.email : ""} <br />
           Phone: {pinfo ? pinfo.phone : ""}<br />
            </>
        )
    }

    async function getContent() {
        let getReqList = await getPendingRequestList(location.state.doctorInfo.doctorId)
        setRequestList(getReqList)
    }

    useEffect(() => {
        getContent()
    }, [expanded])


    const classes = useStyles();

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (

        <DoctorNavBar>
            <Paper elevation={3} classes={{ root: classes.paper }}>

                <Grid container spacing={2}>
                    <Grid item xs={6}><h2>Pending Patient's Request List</h2></Grid>
                    {data.map((text, i) =>
                        <Grid item xs={12} key={i}>
                            <Accordion expanded={expanded === `${text.requestId}`} onChange={handleChange(`${text.requestId}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading} >Reference number: {text.requestId}
                                        <input type='hidden' name="props.requestid" value={text.requestId} />
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>Status: {text.responsed ? "Resolved" : "Pending"}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ width: "100%", padding: '3rem' }}>
                                        {getDoctorInfo(text.patientId)}<br /><br />

                                        <b>Problem/Symptoms</b>: {text.problem}<br />
                                        <b>Requested Date:</b> {text.timeStamp}<br /><br />

                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                            <b>Medication:</b> <br />
                                            <TextField
                                                id="outlined-required"
                                                label="Medication details"
                                                multiline
                                                rows={5}
                                                fullWidth
                                                value={prescription} onChange={handlePrescription}
                                                variant="outlined"
                                                style={{ marginTop: '5px' }}
                                            />
                                            </Grid>
                                            <Grid item xs={6}>
                                            <b> Advice to patient: </b><br />
                                            <TextField
                                                id="outlined-required"
                                                label="Any Precautions"
                                                multiline
                                                rows={5}
                                                fullWidth
                                                value={doctorresponse} onChange={handleDocRes}
                                                variant="outlined"
                                                style={{ marginTop: '5px' }}
                                            />
                                            </Grid>
                                        </Grid>

                                        <br /> <br />

                                        <b>Need Appointment:</b>
                                        <input
                                            type="checkbox"
                                            onChange={handleAppointment}
                                        />
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => postDocResponse(text.requestId)}
                                            classes={{ root: classes.submitButton }}>
                                            Submit
                                    </Button>
                                    {(error) ? <p style={styles.errorTextStyle}>Please give response</p> : null}

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}

                </Grid>
            </Paper>
        </DoctorNavBar>
    )

}
