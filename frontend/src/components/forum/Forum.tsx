// import { spawn } from "child_process";
import React, { useState, useEffect } from "react";
// import { forumList, messageList } from "./mockups";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import { Message } from "./Message";
import { Button, Paper, Tooltip, IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  postTopic,
  postMessage,
  getTopic,
  getMessage,
} from "../../remote/remote-functions";
import moment from "moment";
import { useLocation } from "react-router-dom";
// RCE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
import { MessageBox, ChatItem } from "react-chat-elements";
import "../../assets/primary.scss";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      margin: "auto",
    },
    inline: {
      display: "inline",
    },
    bubble: {
      width: "-webkit-fill-available",
      backgroundColor: "red",
    },
    paper: {
      padding: '2rem',
      // width: '84%',
      position: 'relative',
      backgroundColor: "#EDF2FB",
      margin: '2rem'
    },
    button: {
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
      marginBottom: '1rem'
    },
    postButton: {
      '&:hover': {
        background: "#4BB543",
      },
      backgroundColor: '#014F86',
      color: 'white',
      fontWeight: 'bolder',
      width: '10rem',
      boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
      marginRight: '5px'
    },
    cancelButton: {
      '&:hover': {
        background: "#DC143C",
      },
      backgroundColor: '#014F86',
      color: 'white',
      fontWeight: 'bolder',
      width: '10rem',
      boxShadow: '0 3px 5px 2px rgba(120, 154, 188, 0.3)',
    },
    backButton: {
      '&:hover': {
        color: '#014F86',
      },
      color: "white",
      backgroundColor: "#014F86",
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
  })
);

export const Forum: React.FC = (props) => {
  const [forums, setForums] = useState<any>([]);

  const [message, setMessage] = useState<any>([]);

  const [isShow, setIsShow] = useState<any>(false);

  const [topic, setTopic] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const [inputShow, setInputShow] = useState<boolean>(false);

  const [inputTopic, setInputTopic] = useState<string>();

  const [inputMessage, setInputMessage] = useState<string>();

  const [currentTopic, setCurrentTopic] = useState<number>();

  const [user, setUser] = useState<any>();

  const location: any = useLocation();

  async function getMessagesByForumId(forumId: number, topic: string) {
    setIsShow(true);

    setTopic(topic);
    setLoading(true);
    setInputShow(false);
    setCurrentTopic(forumId);

    let response = await getMessage(forumId);
    console.log(response);
    setMessage(response);
    setLoading(false);
    return response;
  }

  const onPostTopic = async () => {
    console.log("inputTopic:" + inputTopic);

    if (inputTopic?.trim() === "" || inputTopic === undefined) {
      console.log("null input");
      alert("input should not be null!!");
      return;
    }

    const topicstring = {
      topic: inputTopic,
      username: user.username,
      role: user.role,
    };
    const data = await postTopic(topicstring);
    console.log(data);

    setForums([...forums, data]);
    setInputTopic("");
    setInputShow(false);
  };

  const handleTopicChange = (e) => {
    setInputTopic(e.target.value);
  };
  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const onPostMessage = async () => {
    console.log("inputmessage:" + inputMessage);

    if (inputMessage?.trim() === "" || inputMessage === undefined) {
      console.log("null input");
      alert("input should not be null!!");
      return;
    }
    const currentInputMessage =
      user.role === "Patient"
        ? {
          message: inputMessage,
          fromusername: user.username,
          forumId: {
            forumId: currentTopic,
          },
          patientId: {
            patientId: user.patientId,
            username: user.username,
          },
        }
        : {
          message: inputMessage,
          fromusername: user.username,
          forumId: {
            forumId: currentTopic,
          },
          doctorId: {
            doctorId: user.doctorId,
            username: user.username,
          },
        };
    const data = await postMessage(currentInputMessage);
    console.log(data);

    setInputMessage("");
    setMessage([...message, data]);
  };

  const classes = useStyles();

  function getContent() {
    location.state.patientInfo !== undefined
      ? setUser(location.state.patientInfo)
      : setUser(location.state.doctorInfo);
  }

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    const fetchforum = async () => {
      const responses = await getTopic();
      // console.log(responses);
      setForums(responses);
    };
    fetchforum();
  }, []);

  return (
    <Paper elevation={3} classes={{ root: classes.paper }}>
      {/* <div
      style={{
        margin: "auto",
        width: "960px",
        borderStyle: "solid",
        borderColor: "lightblue",
      }}
    > */}
      {isShow ? (
        // <Button
        //   variant="contained"
        //   color="primary"
        //   onClick={() => {
        //     setIsShow(false);
        //   }}
        // >
        //   Back
        // </Button>
        <Tooltip  title="Go Back">
          <IconButton
            onClick={() => {setIsShow(false)}}
            classes={{root: classes.backButton}}>
              <ArrowBackIcon style={{ fontSize: 40 }} />
          </IconButton>
        </Tooltip>
      ) : null}
      {isShow ? (
        <div>
          <h1 style={{ textAlign: "center" }}>{topic}</h1>
          <Divider />
        </div>
      ) : null}
      <Grid container>
        {!isShow ? (
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                setInputShow(true);
              }}
              classes={{
                root: classes.button,
              }}
            >
              New Post
            </Button>
            {inputShow ? (
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <TextField
                  id="standard-basic"
                  label="Input your topic"
                  fullWidth
                  value={inputTopic}
                  onChange={handleTopicChange}
                  multiline
                  variant="outlined"
                />
                <br />
                <div style={{ margin: '1rem' }}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => onPostTopic()}
                    classes={{
                      root: classes.postButton,
                    }}
                  >
                    Post
                </Button>
                  <Button
                    variant="contained"
                    onClick={() => setInputShow(false)}
                    classes={{
                      root: classes.cancelButton,
                    }}
                  >
                    Cancel
                </Button>
                </div>
              </div>
            ) : null}
            <List className={classes.root}>
              {forums.map((r, index) => (
                <ChatItem
                  avatar={
                    r.role !== "Patient"
                      ? "https://www.cliparthut.com/images/150/FPesi.png"
                      : "https://www.cliparthut.com/images/149/WDCFg.png"
                  }
                  alt={r.username}
                  title={r.topic}
                  subtitle={"by:" + r.username}
                  dateString={moment(r.timeStamp).format("YYYY-MM-DD HH:mm:ss")}
                  onClick={() => getMessagesByForumId(r.forumId, r.topic)}
                />
              ))}

              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        ) : null}

        {/* <Button onClick= {()=>getMessagesByForumId(3)}>click</Button> */}
        {loading ? <Typography variant="h4">Loading......</Typography> : null}
        {isShow ? (
          <Grid item xs={12}>
            {!loading
              ? message.map((m, index) => (
                <MessageBox
                  type={"text"}
                  text={"by:" + m.fromusername}
                  title={m.message}
                  dateString={moment(m.timeStamp).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                  position={
                    user.username !== m.fromusername ? "left" : "right"
                  }
                />
              ))
              : null}
            {!loading ? (
              <div
                style={{
                  float: "right",
                  marginTop: "30px",
                  textAlign: "center",
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Write your post"
                  name="message"
                  multiline
                  rows={4}
                  value={inputMessage}
                  onChange={handleMessageChange}
                  variant="outlined"
                  style={{marginRight: '1rem', width: '20rem', backgroundColor:'white'}}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onPostMessage}
                  classes={{root: classes.submitButton}}
                >
                  Submit
                </Button>
              </div>
            ) : null}
          </Grid>
        ) : null}
      </Grid>
      {/* </div> */}
    </Paper>
  );
};
