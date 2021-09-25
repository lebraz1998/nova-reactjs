import { Card, CardContent, Box, Typography } from "@mui/material";
import React from "react";

export default function TopCard({
  icon,
  title,
  value,
  color,
}: {
  icon: any;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <Card style={{ padding: 0 }}>
      <CardContent style={{ display: "flex", alignItems: "start", padding: 0 }}>
        <Box width="80px" height="110px" style={{ backgroundColor: color }}>
          {icon}
        </Box>
        <div style={{ padding: 10 }}>
          {" "}
          <Typography fontSize="30px">{value}</Typography>
          <Typography fontSize="25px" fontWeight="400">
            {title}
          </Typography>
        </div>{" "}
      </CardContent>
    </Card>
  );
}
