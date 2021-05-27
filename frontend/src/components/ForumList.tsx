import React from 'react'
import PatientNavBar from './PatientNavBar'
import {Forum}  from './forum'
import {useLocation } from 'react-router';
import DoctorNavBar from './DoctorNavBar'


export const ForumList:React.FunctionComponent = () => {
    const location: any = useLocation();

    return(
        location.state.patientInfo !== undefined
      ?<PatientNavBar>
            <Forum />
        </PatientNavBar> :
        <DoctorNavBar>
            <Forum/>
        </DoctorNavBar>
    )
}