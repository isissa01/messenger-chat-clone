import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import db from './firebase';
import { TextField,  Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase';
import Message from './Message';
import FlipMove from 'react-flip-move';




function App() {
  const [input, setInput] = useState('');
  const [user, setUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  // const {x, y} = useWindowScroll();
  // const [scrolled, setScrolled] = useState(0);

  const focusInput = () =>{
    document.getElementById('input').focus();
  }
  function scrollToBottom(){
    window.scrollTo({top: (document.body.scrollHeight ), behavior: 'smooth'});
  }
  
  // const divRef = useRef(null);
  const sendMessage = (event) =>{
    event.preventDefault();

    db.collection('messages').add({
      sender: user,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
    focusInput();


  }

  const handleClose = (event) =>{
    event.preventDefault();
    setOpen(false);
    if(user) return;
    setUser("unknown user");
    
  }


  useEffect(() => {
    db.collection("messages").orderBy("timestamp", 'asc').onSnapshot(snapshot =>{
      setMessages(snapshot.docs.map(doc =>({id: doc.id, message: doc.data().message, sender: doc.data().sender })));
      scrollToBottom();
      
    });
    
    if(!user){
      setOpen(true);
     
    }
    else{
      setOpen(false);
      
    }
    // divRef.current.scrollIntoView({ behavior: 'smooth' });
    
    return focusInput()
   

   
  }, []);

  
  return (
    <div className="App" hidden={open}>
      
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=200&h=200"></img>
      <h1 className="messenger">Messenger</h1>
  <h3>Welcome {user}</h3>
      <form className="message_form">
        <FormControl className="message_form_ctrl">
          <InputLabel>Type a message...</InputLabel>
        <Input className="message_input" id="input" value= {input} onChange= {event => setInput(event.target.value) }/>
        <Button className="send_button" disabled = {!input}  type="submit" onClick={sendMessage}> <SendIcon></SendIcon></Button>
        </FormControl>
      </form>

      <FlipMove className="flip">
      {messages.map(message =>(
          
          <Message message = {message} username= {user} />


        ))}

      </FlipMove>
       
        
<Dialog open={open} onClose={handleClose} >
        <DialogTitle >Enter Your Username:</DialogTitle>
        <form>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            value={user}
            onChange ={event => setUser(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
         
          <Button type="submit" onClick={handleClose} color="primary" >
            Ok
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>

      {/* { have the messages showing in a list} */}

    </div>
  );
}

export default App;
