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

        socket.emit('all_session' ,result)
        return result

    }
    catch(err){
        console.log('err finding Document'  , err )
    }

}

module.exports = { FindDocument , FindSpecficDocuments }