import axios from "axios"

let baseUrl = "https://iiot-bench.herokuapp.com";
//Connect to a broker through node server api
export const connectBroker = async (host, port, clientId, timeout, username, password) => {

    try{
        const result = await axios.post(`${baseUrl}/connect`, {
            host: host,
            port: port,
            clientId: clientId,
            connectTimeout: timeout,
            username: username,
            password: password
        })
        return result;
    }catch(err){
        console.log("Err msg", err);
        return "Could not connect"
    }
}

//Publish a message to broker through node server
export const publishMsg = async ( clientId, topic, message ) => {
    try{
        
        const result = await axios.post(`${baseUrl}/publish`, {
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
        
        const result = await axios.post(`${baseUrl}/subscribe`, {
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
        const result = await axios.post(`${baseUrl}/disconnect`, {
            clientId,
        })
        return result;

    }catch(err){
        console.log(err)
    }
}

 