import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";
import { ScoreBoard } from "./ScoreBoard";

export const ScoreCounter = ({ className, side, score }) => (
  <Paper className={className}>
    <h1>
      {side}: {score}
    </h1>
  </Paper>
);

ScoreBoard.propTypes = {
  className: PropTypes.string,
  side: PropTypes.string.isRequired,
  score: PropTypes.number,
};

ScoreCounter.defaultProps = {
  score: 0,
};
