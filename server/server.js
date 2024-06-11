////
// so unlike frontend when new user visit our website they get a new copy of website and what other users do to our website it won't show to other user 
// ChatGPT
// Yes, that's correct. In a typical web application scenario, when a new user visits a website, their browser loads a fresh copy of the website from the server. Any changes made by other users are not reflected in this user's browser session unless they specifically request updated information from the server.
// In the context of a server-side application like the one you're building, things work a bit differently. When a user connects to the server (e.g., via a socket connection), they are essentially sharing the same server-side environment with other users. This means they may have access to shared resources or state, such as variables or database connections, depending on how the server is implemented.
// So, unlike the frontend scenario where each user gets their own isolated copy of the website, in a server-side application, users may potentially share certain resources or state, which can lead to interactions between users. This is something to be aware of when designing and implementing server-side applications.
////

// // how mongodb drive know that the connect is correct when you do connect.db() because  they are using classes and creating an object so object creates a copy 
// In the MongoDB Node.js driver, after a successful connection and authentication with the MongoDB server using client.connect(), the connection state or session is maintained within the MongoClient instance (client).
// Here's a simplified explanation of how the connection state/session is maintained:
// Connection Object: When you call client.connect(), the MongoDB Node.js driver establishes a connection to the MongoDB server and creates a connection object associated with the MongoClient instance (client). This connection object represents the communication channel between your Node.js application and the MongoDB server.
// Authentication Tokens: During the authentication process (if required), the MongoDB server validates the credentials provided in the connection URI (uri). Upon successful authentication, the server issues an authentication token or session identifier.
// Session Management: The MongoDB Node.js driver internally manages this authentication token or session identifier within the MongoClient instance (client). It keeps track of the established connection and associated session information.
// Connection Pooling: Additionally, the MongoDB Node.js driver employs connection pooling to efficiently manage multiple connections to the MongoDB server. Connection pooling allows multiple operations to share the same connection, reducing the overhead of establishing new connections for each operation.
// Reuse of Connections: After the initial connection and authentication, subsequent operations (such as client.db()) reuse the existing connection and associated session information stored within the MongoClient instance (client). This eliminates the need to reauthenticate for each operation, as the connection state/session is already established and maintained.
// In summary, the connection state/session between the client and the MongoDB server is maintained within the MongoClient instance (client) after a successful client.connect() call. The MongoDB Node.js driver handles the management of this connection state/session, including authentication tokens, connection pooling, and reuse of connections for subsequent operations.
// //


const express = require("express")
const app = express()
const http = require('http')
const server = http.createServer(app);

//import mongoclient 
const { MongoClient } = require("mongodb");
const uri = require('./atlas_uri')
console.log(uri)


//middleware
const cors = require('cors');
app.use(cors())


//using mongoclientobject to initiate the connection 

const client = new MongoClient(uri);


const dbname = 'WhatsappClone'
var collection = null

const connectToDatabase = async () =>{
    try{
        console.log(`Connecting to the ${dbname} database... `)

        await client.connect();
    }
    catch(err){
        console.error(`Error connecting to the database:${err}`)
    }
}

const main = async () =>{
    try{
        await connectToDatabase(); // connect to database
        const databaselist = await client.db().admin().listDatabases() // list of database
        collection = client.db(dbname).collection('socketsession')  // connect to the collection "socketsession" from db "whatsappclonse databse" to perform actions  
        databaselist.databases.forEach(db=>console.log(`==${db.name}`))
        console.log(`Connected to the ${dbname} database `)
    }
    catch(err){
        console.error(`Error connecting to the database main:${err}`)
    }
    // finally{
    //     await client.close();
    // }
}

main();



// initalizing socket
const { Server }  = require('socket.io');
const { InsertOneDocument, InsertMultiDocument } = require("./Insertion");
const io = new Server(server,{
    cors :{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
})

//listening to socket event

io.on("connection" , async (socket)=>{ 
    console.log(`user connected - ${socket.id}`)
    const result = await InsertOneDocument(collection , {user_socket_id : socket.id } )
    const resultformany = await InsertMultiDocument(collection , [{user_socket_id : 123 },{user_socket_id : 1234 }] )


    // joinig a room

    socket.on("join_room" ,(data)=>{
        socket.join(data.Room)
        socket.to(data.Room).emit("user_joined" ,{message:socket.id})
    })
    
    //message event
    socket.on('message' , (data)=>{
        console.log(`data from user - ${JSON.stringify(data)}`)
        console.log("roomid" , data.roomid)

        // to check if the text needs to be sent to a room 
        if(data.roomid){
            socket.to(data.roomid).emit('recieveMessage' , data)

        }else{
        //broadasting to everyone
        socket.broadcast.emit("recieveMessage", data)
        }
    })
})


//server listen

server.listen(3001 , ()=>{
    console.log('SERVER IS LISTENING PORT 3001')
})