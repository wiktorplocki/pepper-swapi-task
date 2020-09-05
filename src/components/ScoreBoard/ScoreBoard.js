import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useScoreCountState } from "../../contexts/scoreContext";

import { ScoreCounter } from "./ScoreCounter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const ScoreBoard = () => {
  const { scoreLeftCount, scoreRightCount } = useScoreCountState();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <ScoreCounter
            className={classes.paper}
            side="You"
            score={scoreLeftCount}
          />
        </Grid>
        <Grid item xs>
          <ScoreCounter
            className={classes.paper}
            side="Computer"
            score={scoreRightCount}
          />
        </Grid>
      </Grid>
    </div>
  );
};
