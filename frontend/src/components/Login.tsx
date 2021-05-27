import React, { useState } from "react";
import { TextField, Tabs, Tab, Button, IconButton, Card, InputAdornment, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { styles } from '../assets/styles.js';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Background from '../assets/img/medicalBackground.jpg';
import { userLogin } from '../remote/remote-functions';

import { useHistory } from "react-router-dom";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            boxShadow: '1px 3px 12px -3px rgba(0,0,0, 1)',
            borderRadius: '1.5rem'
        },
        cssOutlinedInput: {
            '&$focused $notchedOutline': {
                borderColor: "#014F86",
            },
            height: 50,
            marginTop: 0,
            paddingTop: 0
        },

        notchedOutline: {
            borderWidth: '1px',
            borderColor: "#014F86"
        },
        focused: {
            borderColor: "#014F86"
        },

        iconfocused: {
            '&:focus': {
                outline: 'none',
            },
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
        indicator: {
            backgroundColor: '#012A4A',
            color: '#012A4A'
        },
    }),
);

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


export const Login: React.FunctionComponent = (props) => {

    const history = useHistory();

    const classes = useStyles();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [hidden, setHidden] = useState(true);
    const [errorUser, setErrorUser] = useState(false);
    const [errorTextUser, setErrorTextUser] = useState("");
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorTextPassword, setErrorTextPassword] = useState("");
    const [errorAuth, setErrorAuth] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [match, setMatch] = useState(false);



    const onChangeUsername = (event: any) => {
        setErrorUser(false);
        setErrorTextUser('');
        setUsername(event.target.value);
    }

    const passwordOnChange = (event: any) => {
        setErrorPassword(false);
        setErrorTextPassword('');
        setPassword(event.target.value);
    }
    const confirmPasswordOnChange = (event: any) => {
        setConfirmPassword(event.target.value);
    }

    const handleTabChange = (event: any, newValue: any) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index: any) => {
        setTabValue(index);
    };

    const toggleShow = () => {
        setHidden(!hidden);
    }

    const onLogin = async () => {

        if (username && password) {
            try {
                let user = await userLogin(role, username, password);
                console.log(JSON.stringify(user))
                if(user){
                authentication(user);
                }else{
                    setErrorAuth(true)
                    setError('User Not Found');
                }
            } catch (e) {
                setErrorAuth(true)
                setError('User Not Found');
                console.log(e);
            }
        } else {
            if (!password) {
                setErrorPassword(true);
                setErrorTextPassword('Please enter password')
            }
            if (!username) {
                setErrorUser(true);
                setErrorTextUser('Please enter user')
            }
        }
    }

    const authentication = (user: any) => {
        if(user.role === "Admin"){
            history.push({
                pathname: '/admin',
                state: {  //to access state use useLocation hook in function component
                    adminInfo: user
                },
            });
        }else if(user.role === "Doctor"){
            if(user.status === 'Approved'){
                history.push({
                    pathname: '/doctor',
                    state: {  //to access state use useLocation hook in function component
                        doctorInfo: user
                    },
                });
            }else if(user.status === 'Pending'){
                setErrorAuth(true)
                setError('Account is in Pending Status')
            }else if(user.status === 'Rejected'){
                setErrorAuth(true)
                setError('Account is Rejected')
            }  
        }else if(user.role === "Patient"){
            history.push({
                pathname: '/patient',
                state: {  //to access state use useLocation hook in function component
                    patientInfo: user
                },
            });
        }
    }

    const onRegister = () => {
        if (username && password && role) {
            if (password !== confirmPassword) {
                setMatch(true)
            } else {
                history.push({
                    pathname: '/register',
                    state: {  //to access state use useLocation hook in function component
                        role: role,
                        username: username,
                        password: password 
                    },
                });
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

    const handleRadioChange = (event: any) => {
        setRole(event.target.value);
    };



    return (
        <div style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', minHeight: '100vh', height: 'auto' }}>
            <h1 id="title">Revature Medical Clinic</h1>
            <Card className="cardContainer" classes={{ root: classes.root }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    classes={{
                        indicator: classes.indicator,
                    }}
                    className="loginTab"
                >
                    <Tab label="LOGIN" style={{ color: "white", backgroundColor: "#014F86", width: "30%" }} />
                    <Tab label="REGISTER" style={{ color: "white", backgroundColor: "#014F86" }} />
                </Tabs>
                {/*  ----------------------------LOGIN------------------------ */}
                <TabPanel value={tabValue} index={0}>
                    <form className="form" noValidate>
                        <div className="cardRadio">
                            <RadioGroup row name="role" onChange={handleRadioChange} style={{ color: "#012A4A" }}>
                                <FormControlLabel
                                    value="Patient"
                                    control={<MyRadio />}
                                    label="Patient"
                                    labelPlacement="top"
                                    style={{ color: "#012A4A" }}
                                />
                                <FormControlLabel
                                    value="Doctor"
                                    control={<MyRadio />}
                                    label="Doctor"
                                    labelPlacement="top"
                                    style={{ color: "#012A4A" }}
                                />
                                <FormControlLabel
                                    value="Admin"
                                    control={<MyRadio />}
                                    label="Admin"
                                    labelPlacement="top"
                                    style={{ color: "#012A4A" }}
                                />
                            </RadioGroup>
                        </div>
                        <TextField
                            error={errorUser}
                            helperText={errorTextUser}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            error={errorPassword}
                            helperText={errorTextPassword}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="Password"
                            type={hidden ? "password" : "text"}
                            value={password}
                            onChange={passwordOnChange}
                            style={{ marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShow}
                                            style={{ color: "#014F86" }}
                                        >
                                            {hidden ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            className="submit"
                            onClick={() => onLogin()}
                            classes={{
                                root: classes.rootButton,
                            }}
                        > LOG IN </Button>

                        {(errorAuth) ? <p style={styles.errorTextStyle}>{error}</p> : null}

                    </form>
                </TabPanel>
                {/*  ----------------------------Register------------------------ */}

                <TabPanel value={tabValue} index={1}>
                    <form className="form" noValidate>
                        <div className="cardRadio">
                            <RadioGroup row name="role" onChange={handleRadioChange} style={{ color: "#012A4A" }}>
                                <FormControlLabel
                                    value="Patient"
                                    control={<MyRadio />}
                                    label="Patient"
                                    labelPlacement="top"
                                    style={{ color: "#012A4A" }}
                                />
                                <FormControlLabel
                                    value="Doctor"
                                    control={<MyRadio />}
                                    label="Doctor"
                                    labelPlacement="top"
                                    style={{ color: "#012A4A" }}
                                />
                            </RadioGroup>
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            placeholder="New Username"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            style={{ marginBottom: 5, marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            placeholder="New Password"
                            type="password"
                            value={password}
                            onChange={passwordOnChange}
                            style={{ marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm password"
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={confirmPasswordOnChange}
                            style={{ marginTop: 5 }}
                            InputProps={{
                                classes: {
                                    root: classes.cssOutlinedInput,
                                    notchedOutline: classes.notchedOutline,
                                    focused: classes.focused,
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            className="submit"
                            onClick={() => onRegister()}
                            classes={{
                                root: classes.rootButton,
                            }}
                        > REGISTER </Button>

                        {(match) ? <p style={styles.errorTextStyle}>Password doesn't match</p> : null}

                    </form>

                </TabPanel>


            </Card>
        </div>
    );
}

