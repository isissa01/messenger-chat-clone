import React, { forwardRef } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import './Message.css';



const Message = forwardRef((props, ref)  =>{
    const isUser = props.message.sender === props.username;
    // const handleClick = () =>
    //     ref.current.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start',
    //     });
 
    
    return (
        <div ref={ref} >
        <p variant="body2" component="p" className="username" hidden= {isUser}>
                {props.message.sender}
              </p>
        <Card className={`message ${isUser ? "current": "guest"}`} >
          <CardActionArea> 
            <CardContent>
            
              <Typography gutterBottom variant="h5" component="h2">
              {props.message.message}
              </Typography>
             
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
    )
})

export default Message
