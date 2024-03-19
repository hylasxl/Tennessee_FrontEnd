import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ClassCard = ({ classInfo }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {classInfo.name}
        </Typography>
        <Typography variant="body2">
          Instructor: {classInfo.instructor}
        </Typography>
        <Typography variant="body2">
          Time: {classInfo.time}
        </Typography>
        <Typography variant="body2">
          Location: {classInfo.location}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
