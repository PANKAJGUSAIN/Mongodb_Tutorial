async function FindDocument (collection , socket) {

    try{
        const result = await collection.find().toArray(); // convert all the doucment in a array

        // to iterate over all the documents
        // result =collection.find().forEach(function(item){  
        //     console.log('11' , item)
        //     })

        socket.emit('all_session' ,result)
        return result

    }
    catch(err){
        console.log('err finding Document'  , err )
    }

}

async function FindSpecficDocuments(collection , socket) {

    try{
        const query = {user_socket_id : 123}
        const options = {
            // Sort matched documents in descending order by rating
            sort: { "user_socket_id": -1 },
            // Include only the required fields in the returned document
            projection: { _id: 0, user_socket_id : 1  },
        }
        const result = await collection.find(query , options ).toArray(); // convert all the doucment in a array
        // const result = await collection.find({ user_rooms : {$eleMatch:{roomid:'123' }}})
        // AND operator
        // way1 - const result = await collection.find({$and : {"airlines" : "SouthWest"} , {"stop" : {$gt : "1"}  })
        // way2 - const result = await collection.find( {"airlines" : "SouthWest"} , {"stop" : {$gt : "1"}} )
        // or operator
        // const result = await collection.find({$or : {"airlines" : "SouthWest"} , {"stop" : {$gt : "1"}  })
        // combining and and or operator
        // const result = await collection.find({ $and : [  { $or : [{src_airport : "SEA"} , {des_airport : "SEA"} ]  }    , { $or : [{airline:'1'} , {airline:'2'}]  }   ] })
        // okay so why in above query we didn't do on "or" "or" like find({ $or :[]  , $or:[]}) ? 
        // this is because in object we cannot have two key with same name so send or will override the first one 
        // and hence, we must using explicit $or or $and operator

        socket.emit('all_session' ,result)
        return result

    }
    catch(err){
        console.log('err finding Document'  , err )
    }

}

module.exports = { FindDocument , FindSpecficDocuments }