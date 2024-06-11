async function InsertOneDocument(collection , document){
    try{
    const result = await collection.insertOne(document)
    console.log("Document Inserted" , result)
    return result
    }
    catch(err){
        console.log('errror While inserting doc' , err)
    }
    
}

async function InsertMultiDocument(collection , document){
    try{
    const result = await collection.insertMany(document)
    console.log("Document Inserted Many" , result)
    return result
    }
    catch(err){
        console.log('errror While inserting doc' , err)
    }
    
}

module.exports = {InsertOneDocument , InsertMultiDocument}