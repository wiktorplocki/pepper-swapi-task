import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { pick, random } from "lodash-es";

import { useScoreCountDispatch } from "../../contexts/scoreContext";
import { InfoCard } from "./InfoCard";

function transformObjectValuesToNumber(object) {
  if (!object) {
    return undefined;
  }
  for (const [key, value] of Object.entries(object)) {
    if (value.includes("-")) {
      const [min, max] = value.split("-");
      object = {
        ...object,
        [key]: Number(random(min, max)),
      };
    } else if (value.includes(",")) {
      const correctValue = Number(value.replace(",", ""));
      object = {
        ...object,
        [key]: correctValue,
      };
    } else if (isNaN(Number(value))) {
      object = {
        ...object,
        [key]: 0,
      };
    } else {
      object = {
        ...object,
        [key]: Number(value),
      };
    }
  }
  return object;
}

function compareObjectValuesByAttribute(object, anotherObject, attribute) {
  if (object[attribute] > anotherObject[attribute]) {
    return "left";
  }
  if (object[attribute] < anotherObject[attribute]) {
    return "right";
  }
  return null;
}

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

export const InfoCardGrid = ({
  leftSide,
  rightSide,
  attributes,
  activeAttribute,
}) => {
  const classes = useStyles();
  const presentationalLeft = pick(leftSide, attributes);
  const presentationalRight = pick(rightSide, attributes);
  const dispatch = useScoreCountDispatch();

  const transformedLeft = pick(
    transformObjectValuesToNumber(leftSide),
    activeAttribute
  );
  const transformedRight = pick(
    transformObjectValuesToNumber(rightSide),
    activeAttribute
  );

  const comparisonResult = compareObjectValuesByAttribute(
    transformedLeft,
    transformedRight,
    activeAttribute
  );

  useEffect(() => {
    if (comparisonResult === "left") {
      dispatch({ type: "increment_left", effect: "save" });
    }
    if (comparisonResult === "right") {
      dispatch({ type: "increment_right", effect: "save" });
    }
  }, [comparisonResult, dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <InfoCard
            data={presentationalLeft}
            winner={comparisonResult === "left"}
          />
        </Grid>
        <Grid item xs>
          <InfoCard
            data={presentationalRight}
            winner={comparisonResult === "right"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

InfoCardGrid.propTypes = {
  leftSide: PropTypes.object,
  rightSide: PropTypes.object,
  attributes: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeAttribute: PropTypes.string.isRequired,
};

InfoCardGrid.defaultProps = {
  leftSide: {},
  rightSide: {},
  attributes: [],
  activeAttribute: "",
};
