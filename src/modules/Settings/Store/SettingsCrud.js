import axios from "axios"

//Connect to a broker through node server api
export const connectBroker = async (host, port, clientId, timeout, username, password) => {

    try{
        const result = await axios.post("http://localhost:3001/connect", {
            host: host,
            port: port,
            clientId: clientId,
            connectTimeout: timeout,
            username: username,
            password: password
        })
        return result;

    }catch(err){
        console.log(err)
    }
}

//Publish a message to broker through node server
export const publishMsg = async ( clientId, topic, message ) => {
    try{
        
        const result = await axios.post("http://localhost:3001/publish", {
            clientId,
            topic,
            message,   
        })
        return result;

    }catch(err){
        console.log(err)
    }

}

//Publish a message to broker through node server
export const subscribeTopic = async ( clientId, topic ) => {
    try{
        
        const result = await axios.post("http://localhost:3001/subscribe", {
            clientId, 
            topic
        })
        return result;

    }catch(err){
        console.log(err)
    }

}

//Disconnect currently connected client
export const disconnectBroker = async (clientId) => {

    try{
        const result = await axios.post("http://localhost:3001/disconnect", {
            clientId: clientId
        })
        return result;

    }catch(err){
        console.log(err)
    }
}