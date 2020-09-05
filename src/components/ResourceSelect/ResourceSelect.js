import React, { useState } from "react";
import { random } from "lodash-es";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { apiClient } from "../../apiClient/apiClient";

import { InfoCardGrid } from "../InfoCard/InfoCardGrid";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  flexContainer: {
    display: "flex",
    width: "100%",
  },
}));

export const ResourceSelect = () => {
  const RESOURCES = ["people", "starships"];
  const PEOPLE_ATTRIBUTES = ["name", "mass", "height"];
  const STARSHIP_ATTRIBUTES = ["name", "crew", "length"];

  const classes = useStyles();
  const [resource, setResource] = useState("");
  const [attribute, setAttribute] = useState("");
  const [leftSide, setLeftSide] = useState(null);
  const [rightSide, setRightSide] = useState(null);

  const handleResourceChange = (event) => {
    setResource(event.target.value);
    setAttribute("");
    setLeftSide(null);
    setRightSide(null);
  };

  const handleAttributeChange = (event) => {
    setAttribute(event.target.value);
    setLeftSide(null);
    setRightSide(null);
  };

  const makeApiCalls = async (event) => {
    event.preventDefault();
    let leftSideCall = apiClient(`${resource}`, random(1, 100));
    let rightSideCall = apiClient(`${resource}`, random(1, 100));
    let [leftResult, rightResult] = await Promise.all([
      leftSideCall,
      rightSideCall,
    ]);
    setLeftSide(leftResult);
    setRightSide(rightResult);
  };

  const prepareAttributes = () => {
    if (resource === "people") {
      return PEOPLE_ATTRIBUTES;
    }
    if (resource === "starships") {
      return STARSHIP_ATTRIBUTES;
    }
    return [];
  };

  const renderAttributeMenuItems = () => {
    return prepareAttributes()
      .filter((attribute) => attribute !== "name")
      .map((attribute, idx) => (
        <MenuItem key={idx} value={attribute}>
          {attribute.toUpperCase()}
        </MenuItem>
      ));
  };

  return (
    <>
      <Typography variant="h2" component="h1" align="center">
        Choose your opponent!
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="resource-select-label">Resource</InputLabel>
        <Select
          labelId="resource-select-label"
          id="resource-select"
          onChange={handleResourceChange}
        >
          {RESOURCES.map((resource, idx) => (
            <MenuItem key={idx} value={resource}>
              {resource.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="attribute-select-label">Attribute</InputLabel>
        <Select
          labelId="attribute-select-label"
          id="attribute-select"
          onChange={handleAttributeChange}
          disabled={!resource}
        >
          {renderAttributeMenuItems()}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={makeApiCalls}
          disabled={!resource || !attribute}
        >
          Start
        </Button>
      </FormControl>
      <InfoCardGrid
        leftSide={leftSide}
        rightSide={rightSide}
        attributes={prepareAttributes()}
        activeAttribute={attribute}
      />
    </>
  );
};
