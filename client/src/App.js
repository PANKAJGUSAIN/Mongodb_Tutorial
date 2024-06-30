import io from 'socket.io-client'
import React, {useEffect} from 'react'
const socket = io.connect("http://localhost:3001/")


function App() {

  const [message , setMessage] = React.useState("")
  const [RooMmessage , setRooMmessage] = React.useState("")
  const [messageRecieved , setMessageRecieved] = React.useState("")
  const [RecieveNotification , setRecieveNotification] = React.useState("")
  const [sessionDetails , setsessionDetails] = React.useState([])
  const sendMessage = () =>{
    console.log('send it' , message)
    socket.emit("message" ,{roomid:RooMmessage ,message : message} )
  }
  
  // to join a specific room
  const JoinRoom = () =>{
    console.log('joinRoom' , RooMmessage)
    socket.emit("join_room" ,{Room : RooMmessage} )
  }

  useEffect(()=>{
    // to recieve a message
    socket.on('recieveMessage' , (data)=>{
      setMessageRecieved(data.message)
    })

    // if a new user joined a room
    socket.on('user_joined' , (data)=>{
      setRecieveNotification(data.message)
    })

    socket.on('all_session' , (data)=>{
      console.log(data)
      setsessionDetails(data)
    })
  },[])

  return (
    <div className="App"> 
    <input onChange={(e)=>{setRooMmessage(e.target.value)}} value={RooMmessage} placeholder="Send Message.."/>
    <button onClick={()=>{JoinRoom()}}>Join Room</button>
    <input onChange={(e)=>{setMessage(e.target.value)}} value={message} placeholder="Send Message.."/>
    <button onClick={()=>{sendMessage()}}>Send</button>
    <h1>USER JOINED:</h1><p style={{color:'red'}}>{RecieveNotification}</p>
    <h1>Message:</h1><h1> {messageRecieved}</h1>

    <div>User Session Details</div>
    {sessionDetails?.map(item =>(
      <p>
      <span>{item._id} - </span>
      <span>{item.user_socket_id}</span>
      </p>
    ))}
    </div>
  );
}

export default App;