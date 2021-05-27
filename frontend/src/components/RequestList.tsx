import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PatientNavBar from './PatientNavBar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Grid, Paper } from '@material-ui/core';
import { getRequestList } from '../remote/remote-functions';
import { useLocation } from 'react-router-dom';
import { Preview, print } from 'react-html2pdf';

interface IPatient{
    healthcardnumber:number,
    firstname:string,
    lastname:string

}

interface IDoctor{
    firstname:string
    lastname:string
    email:string
    phone:string
    
}
interface IReqList{
    patientId:IPatient,
    doctorId:IDoctor,
    problem:string,
    responsed:boolean,
    timeStamp:string,
    requestId:number
    doctorresponse:string
    hasappointment:boolean
    prescription:string
    timeresponded:string
}



export const RequestList:React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const location: any = useLocation()

    const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        resolvedHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: "green",
        },
        pendingHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: "orange",
        },
        
        rootButton: {
            '&:hover': {
                backgroundColor: "#014F86",
            },
            background: "#012A4A",
            borderRadius: 3,
            border: 0,
            color: 'white',
            fontWeight: 'bold',
            height: 40,
            boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
            marginTop: 15
        },
        doctor: {
            color: "#014F86",
            fontWeight: "bold",
            display: "inline"
        },
        accordionHeading: {
            color: "#012A4A"
        },
        paper: {
            padding: '2rem',
            position: 'relative',
            backgroundColor: "#EDF2FB",
            margin: '2rem',
            color: '#012A4A'
        },
    }),
    )

    function downloadDom(){
        print('prescription', 'jsx-template')
    }

    function getDoctorInfo(dinfo:IDoctor, req:IReqList){

        return(
            <>

            <h4 className={classes.accordionHeading}>Doctor's Response:</h4>
            <Grid container spacing={1}>
                <Grid  item xs={4}>Doctor's name:{dinfo.firstname} {dinfo.lastname}  </Grid>  
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>

                <Grid item xs={6}>Doctor's contact information: {dinfo.email}/{dinfo.phone}</Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={12}>Reponse date: {new Date(req.timeresponded).toString()}</Grid>
                <Grid item xs={12}>Doctor's reponse: {req.doctorresponse}</Grid>
                <Grid item xs={12}>Appointment needed: {req.hasappointment ? "Yes" : "No"}</Grid>
                <Grid item xs={12}>Prescription: {req.prescription ? req.prescription : "N/A"}</Grid>
                
            </Grid> 
            
            </>
        )
    }

    async function getContent(){
        console.log(location.state.patientInfo.patientId)
        let getReqList = await getRequestList(location.state.patientInfo.patientId)
        setRequestList(getReqList)
    } 

    useEffect(() => {
        getContent()
    }, [])

    
        const classes = useStyles();
        const [expanded, setExpanded] = React.useState<string | false>(false);
      
        const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        }
      

        return(
            
            <PatientNavBar>
                <Paper elevation={3} classes={{ root: classes.paper }}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={6}><h2>Patients' Requests</h2></Grid>
                        
                        {data.map(text => 
                            <Grid item xs={12}>
                                <Accordion expanded={expanded === `${text.requestId}`} onChange={handleChange(`${text.requestId}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        >
                                        <Typography className={classes.heading}>Reference number: {text.requestId}</Typography>
                                        <Typography> <span>Status: </span><span className={text.responsed ? classes.resolvedHeading : classes.pendingHeading}>{text.responsed ? "  Resolved" : "  Pending"}</span></Typography>
                                    </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ width: "100%", padding: '3rem' }}>
                                        <h4 className={classes.accordionHeading}>Request Information:</h4>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>Request created: {new Date(text.timeStamp).toString()}</Grid>
                                            <Grid item xs={12}>Problem/Symptoms: {text.problem}</Grid>
                                        </Grid>
                                        <br/>
                                        <br/>
                                        {text.responsed ? getDoctorInfo(text.doctorId, text) : ""}
                                    </Typography>
                                </AccordionDetails>
                                </Accordion>
                            </Grid>
                        )}
                                    
                    </Grid>    
                </Paper>
            </PatientNavBar> 
        )
    
}
