/* eslint-disable react/destructuring-assignment */
import { Card } from "@material-ui/core";
import React from "react";

const MyCard = (prop: any) => {
  const [over, setOver] = React.useState(false);
  return (
    <Card
      style={prop.style}
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseOut={() => {
        setOver(false);
      }}
      raised={over}
    >
      {prop.children}
    </Card>
  );
};

export default MyCard;
