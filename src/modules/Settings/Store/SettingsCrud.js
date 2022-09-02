import axios from "axios"


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

export const publishmsg = async ( clientId, topic, message ) => {
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