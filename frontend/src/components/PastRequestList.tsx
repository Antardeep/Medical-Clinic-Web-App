import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Paper } from '@material-ui/core';
import { getPastRequestList } from '../remote/remote-functions';
import { useLocation } from 'react-router-dom';
import DoctorNavBar from './DoctorNavBar';

interface IPatient {
    healthCardNumber: number,
    firstname: string,
    lastname: string
    email: string
    phone: string

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
    doctorresponse: string
    hasappointment: boolean
    timeresponded: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }),
);

export const PastRequestList: React.FunctionComponent<any> = () => {

    const [data, setRequestList] = useState<IReqList[]>([])
    const location: any = useLocation()

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
        }),
    )


    function getDoctorInfo(pinfo: IPatient) {

        return (
            <>
                <b>Patient Details:</b>
                <br />
                Name: {pinfo ? pinfo.firstname : ""} {pinfo ? pinfo.lastname : ""}<br />
                email: {pinfo ? pinfo.email : ""} <br />
                Phone: {pinfo ? pinfo.phone : ""}<br />
            </>
        )
    }

    async function getContent() {
        let getReqList = await getPastRequestList(location.state.doctorInfo.doctorId)
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


    return (

        <DoctorNavBar>

            <Paper elevation={3} classes={{ root: classes.paper }}>

                <Grid container spacing={2}>
                    <Grid item xs={6}><h2>Responded Patient's Request List</h2></Grid>
                    {data.map(text =>
                        <Grid item xs={12}>
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
                                    <Typography>
                                        {console.log(text)}
                                        {getDoctorInfo(text.patientId)}<br /><br />
                                        <b>Problem:</b> {text.problem}<br /><br />
                                        <b>Responded Date:</b> {text.timeresponded}<br /><br />
                                        <b>Medication:</b> <br />
                                        {text.prescription}
                                        <br />  <br />
                                        <b>Advice to patient:</b> <br />
                                        {text.doctorresponse} <br /> <br />
                                        <b>Appointment:</b> &nbsp;
                                    {text.hasappointment ? "Required" : "Not Required"}
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
