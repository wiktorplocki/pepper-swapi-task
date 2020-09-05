import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash-es";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-around",
  },
  containerColumn: {
    display: "flex",
    flexDirection: "column",
  },
  textCenter: {
    textAlign: "center",
  },
  name: {
    fontSize: 14,
  },
  winner: {
    fontSize: 18,
    textTransform: "uppercase",
  },
  draw: {
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export const InfoCard = ({ data, winner }) => {
  const classes = useStyles();
  if (isEmpty(data)) {
    return (
      <Card>
        <CardContent className={classes.textCenter}>
          <Typography variant="h6" component="h1">
            No data!
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardContent className={classes.textCenter}>
        <div className={classes.container}>
          <div className={classes.containerColumn}>
            {Object.keys(data).map((key) => (
              <div key={key}>{key}:</div>
            ))}
          </div>
          <div className={classes.containerColumn}>
            {Object.values(data).map((value) => (
              <div key={value}>{value}</div>
            ))}
          </div>
        </div>
        {winner && (
          <div>
            <Typography variant="h3" component="h3" className={classes.winner}>
              Winner!
            </Typography>
            <div>Press START to play again!</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

InfoCard.propTypes = {
  winner: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

InfoCard.defaultProps = {
  winner: false,
  data: null,
};
