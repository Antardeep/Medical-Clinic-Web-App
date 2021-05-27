import { spawn } from "child_process";
import React, { useState, useEffect } from "react";
import { forumList } from "./mockups";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


interface MessageIdProps {
  message: string;
  timestamp: string;
  doctor: string;
  patient: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export const Message: React.FC<MessageIdProps> = ({
  message,
  timestamp,
  doctor,
  patient,
}) => {
  const classes = useStyles();
  return (
    <>
      <ListItemText
        primary={<Typography variant="h4">{message}</Typography>}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              by:{patient ? patient : doctor}
              <br />
            </Typography>
            Submitted:{timestamp}
          </React.Fragment>
        }
      />
      
    </>
  );
};
