import React from "react";
import moment from "moment";
import "./index.css";
import {
  Button,
  Input,
  Empty,
  Row,
  Col,
  Avatar,
  Tooltip,
  Layout,
  Typography,
  Comment,
} from "antd";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};
export default Square;
