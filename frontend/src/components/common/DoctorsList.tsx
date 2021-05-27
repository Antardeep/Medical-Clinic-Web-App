import React from 'react';
import { DoctorInfoItem } from './DoctorInfoItem';

interface IDoctorListProps {
    doctorsList: any[]
    filter: String
    handleChange: Function
}

export const DoctorsList: React.FunctionComponent<IDoctorListProps> = (props) => {
    let {doctorsList, filter} = props;

    const handleChange =() => {
        props.handleChange();
    }

    const DoctorItem = doctorsList
    .filter((doctorsList) => doctorsList.status === filter)
    .map((item, i) => <DoctorInfoItem key={i} item={item} handleChange={handleChange}/>)

    return (
        <div style={{ padding: '3rem' }}>
            {DoctorItem}
        </div>
    );
}