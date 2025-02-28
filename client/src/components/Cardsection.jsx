import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';

export default function Cardsection({ title, description, source, c }) {
  return (
    <>
      <Box sx={{
        maxWidth: 345,
        border: '2px solid #fff', 
        borderRadius: '15px', 
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', 
        transition: '0.3s', 
        '&:hover': {
          boxShadow: '0px 15px 20px rgba(0, 0, 0, 0.3)', 
        },
        marginLeft:"30px"
      }}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400" 
              width="100%"
              image={source}
              alt="g"
            />
            <CardContent >
              <h2>Step {c}</h2>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}