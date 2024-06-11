async function InsertOneDocument(collection , document){
    try{

    const result = await collection.insertOne(document)
    if(result?.acknowledged) console.log("Document Inserted" , result)
    else console.log("Error while inserting Document" , result)

    return result

    }
    catch(err){

        console.log('errror While inserting doc' , err)
    }
    
}

async function InsertMultiDocument(collection , document){
    try{

    const result = await collection.insertMany(document)
    if(result?.acknowledged) console.log("Document Inserted Many" , result)
    else console.log("Error while inserting Document Many" , result)
    return result

    }
    catch(err){
        console.log('errror While inserting doc' , err)
    }
    
}

module.exports = {InsertOneDocument , InsertMultiDocument}