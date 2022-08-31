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