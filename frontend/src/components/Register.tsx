import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton, Tooltip, Paper, Grid, InputLabel, TextField, RadioGroup, FormControlLabel, Radio, Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { doctorRegister, patientRegister } from '../remote/remote-functions';
import { styles } from '../assets/styles.js';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '&$underline': {
                borderBottom: '0',
            },
        },
        underline: {
            '&:after': {
                borderBottom: '2px solid #012A4A',
            },
        },
        backButton: {
            '&:hover': {
                color: '#014F86',
            },
            color: "#012A4A",
            backgroundColor: "#EDF2FB",
            position: 'absolute',
            top: 5,
            left: 5,
        },
        paper: {
            padding: '2rem',
            margin: 'auto',
            width: '84%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: "#EDF2FB",
        },
        rootButton: {
            '&:hover': {
                backgroundColor: "#014F86",
            },
            background: "#012A4A",
            borderRadius: "2rem",
            border: 0,
            color: 'white',
            fontWeight: 'bold',
            height: 40,
            boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
            width: '20%',
            float: 'right'
        },
    })
);

export const Register: React.FunctionComponent = (props) => {
    const location: any = useLocation();
    const history = useHistory();
    const classes = useStyles();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [language, setLanguage] = useState("");
    const [healthcardnumber, setHealthcardnumber] = useState("");
    const [education, setEducation] = useState("");
    const [certification, setCertification] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [awards, setAwards] = useState("");
    const [error, setError] = useState("");


    const onRegisterSubmit = async () => {
        const patientCredentials = {
            username: location.state.username,
            password: location.state.password,
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender: gender,
            phone: phone,
            email: email,
            address: address,
            language: language,
            healthcardnumber: healthcardnumber,
            role: 'Patient'
        }

        const doctorCredentials = {
            username: location.state.username,
            password: location.state.password,
            firstname: firstname,
            lastname: lastname,
            age: age,
            gender: gender,
            phone: phone,
            email: email,
            address: address,
            language: language,
            education: education,
            certification: certification,
            speciality: speciality,
            awards: awards,
            status: 'Pending',
            role: 'Doctor'
        }

        if (location.state.role === 'Doctor') {
            if (firstname && lastname && age && gender && speciality) {
                try {
                    let user = await doctorRegister(doctorCredentials)
                    history.push('/');
                } catch (e) {
                    console.log(e);
                }
            } else {
                setError("Please fill out all required fields");
            }
        } else if (location.state.role === 'Patient') {
            if (firstname && lastname && age && gender && healthcardnumber) {
                try {
                    let user = await patientRegister(patientCredentials)
                    console.log("Doctor registered -> " + JSON.stringify(user));
                    history.push({
                        pathname: '/patient',
                        state: {
                            patientInfo: user
                        },
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                setError("Please fill out all required fields");
            }
        }

    }

    const MyRadio = withStyles({
        root: {
            color: "#012A4A",
            '&$checked': {
                color: "#014F86",
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    return (
        <div>
            <Tooltip title="Go Back">
                <IconButton
                    className='float-left'
                    onClick={() => history.push('/')}
                    classes={{
                        root: classes.backButton,
                    }}>
                    <ArrowBackIcon style={{ fontSize: 40 }} />
                </IconButton>
            </Tooltip>
            <h2 id="registerationTitle">Fill out the registeration details</h2>
            <Paper elevation={3} classes={{ root: classes.paper }}>
                <Grid container spacing={3} >
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}  className = "required"> First Name </InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            required
                            value={firstname}
                            onChange={e => setFirstname(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}  className = "required"> Last Name </InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            required
                            value={lastname}
                            onChange={e => setLastname(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}  className = "required"> Age </InputLabel>
                        <TextField
                            type="number"
                            variant="filled"
                            fullWidth
                            value={age}
                            onChange={e => setAge(parseInt(e.target.value))}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}  className = "required"> Gender </InputLabel>
                        <RadioGroup row name="gender" value={gender} onChange={(e: any) => setGender(e.target.value)}>
                            <FormControlLabel value="female" control={<MyRadio />} label="Female" style={{ color: "#012A4A" }} />
                            <FormControlLabel value="male" control={<MyRadio />} label="Male" style={{ color: "#012A4A" }} />
                            <FormControlLabel value="other" control={<MyRadio />} label="Other" style={{ color: "#012A4A" }} />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Phone Number</InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Email Address</InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Residential Address </InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{ marginBottom: 0 }}> Language Spoken </InputLabel>
                        <TextField
                            variant="filled"
                            fullWidth
                            value={language}
                            onChange={e => setLanguage(e.target.value)}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.root,
                                    underline: classes.underline,
                                },
                            }}
                        />
                    </Grid>
                    {
                        (location.state.role === 'Patient') ?
                            <Grid item xs={12}>
                                <InputLabel style={{ marginBottom: 0 }}  className = "required"> Health Card Number </InputLabel>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    value={healthcardnumber}
                                    onChange={e => setHealthcardnumber(e.target.value)}
                                    style={{ marginBottom: 5, marginTop: 5 }}
                                    InputProps={{
                                        classes: {
                                            root: classes.root,
                                            underline: classes.underline,
                                        },
                                    }}
                                />
                            </Grid>
                            :
                            null
                    }

                    {
                        (location.state.role === 'Doctor') ?
                            <>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 0 }}  className = "required"> Speciality </InputLabel>
                                    <Select
                                        variant="filled"
                                        value={speciality}
                                        fullWidth
                                        onChange={e => setSpeciality(String(e.target.value))}
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                    >
                                        <MenuItem value={'Allergy and immunology'}>Allergy and immunology</MenuItem>
                                        <MenuItem value={'Anesthesiologist'}>Anesthesiologist</MenuItem>
                                        <MenuItem value={'Cardiologist'}>Cardiologist</MenuItem>
                                        <MenuItem value={'Dermatology'}>Dermatology</MenuItem>
                                        <MenuItem value={'Emergency medicine'}>Emergency medicine</MenuItem>
                                        <MenuItem value={'Family medicine'}>Family medicine</MenuItem>
                                        <MenuItem value={'Medical genetics'}>Medical genetics</MenuItem>
                                        <MenuItem value={'Neurology'}>Neurology</MenuItem>
                                        <MenuItem value={'Ophthalmology'}>Ophthalmology</MenuItem>
                                        <MenuItem value={'Pathology'}>Pathology</MenuItem>
                                        <MenuItem value={'Physical medicine and rehabilitation'}>Physical medicine and rehabilitation</MenuItem>
                                        <MenuItem value={'Psychiatry'}>Psychiatry</MenuItem>
                                        <MenuItem value={'Radiation oncology'}>Radiation oncology</MenuItem>
                                        <MenuItem value={'Surgery'}>Surgery</MenuItem>
                                        <MenuItem value={'Urology'}>Urology</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 0 }}> Certifications </InputLabel>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        value={certification}
                                        onChange={e => setCertification(e.target.value)}
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                underline: classes.underline,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 0 }}> Education Details </InputLabel>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        value={education}
                                        onChange={e => setEducation(e.target.value)}
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                underline: classes.underline,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InputLabel style={{ marginBottom: 0 }}> Awards </InputLabel>
                                    <TextField
                                        variant="filled"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        value={awards}
                                        onChange={e => setAwards(e.target.value)}
                                        style={{ marginBottom: 5, marginTop: 5 }}
                                        InputProps={{
                                            classes: {
                                                root: classes.root,
                                                underline: classes.underline,
                                            },
                                        }}
                                    />
                                </Grid>
                            </>
                            :
                            null
                    }

                    <Grid item xs={12}>
                        <Button
                            type="button"
                            variant="contained"
                            className="submit"
                            onClick={() => onRegisterSubmit()}
                            classes={{
                                root: classes.rootButton,
                            }}
                        > REGISTER </Button>
                        {(error) ? <p style={styles.errorTextStyle}>{error}</p> : null}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default Register;