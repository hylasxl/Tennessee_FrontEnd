import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { CardHeader, Avatar, Button } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { convertDays } from '../../utils/utils.function';
import { useNavigate } from 'react-router-dom';

const ClassCard = ({ classInfo }) => {
  const navigate = useNavigate()
  return (
    <Card sx={{ width: 300, m: 2,fontFamily:'Roboto Slab' }}>
      <CardMedia
        component="img"
        height="140"
        image={classInfo.course?.course_image?.imagePath ??undefined}
        alt="CourseIMG"
      />
      <CardHeader
        
        title={classInfo.className}
        subheader={`Lecturer: ${classInfo.lecturerByAccount.firstName} ${classInfo.lecturerByAccount.lastName}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Box fontWeight="fontWeightBold" display="block"><span style={{fontWeight:'bold'}}>Course:</span>  {classInfo.course.courseName}</Box>
          <Box fontWeight="fontWeightBold" display="block"><span style={{fontWeight:'bold'}}>Time:</span>  {convertDays(classInfo.weekdays)}</Box>
          <Box fontWeight="fontWeightBold" display="block"> <span style={{fontWeight:'bold'}}>Quanity:</span> {classInfo.currentQuantity}/{classInfo.maxQuantity}</Box>
        </Typography>
        <Button onClick={()=>{
          navigate('/class-detail',{state:{classInfo}})
        }}>View Detail</Button>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
