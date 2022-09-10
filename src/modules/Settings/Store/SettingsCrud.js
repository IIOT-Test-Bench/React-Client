import axios from "axios"
import generateID from "../../HelperFunctions/generateClientId";
import generateTopic from "../../HelperFunctions/generateTopic";

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

  //Function to simulate the publishing process
  const simulatePublishings = (client, interval, topicLen=4, topicLvl, numOfPublishers) => {

      let lim = 0;
      
      if(client){
          let temp = setInterval(async () => {
              lim += 1;
              if(lim >= numOfPublishers){
                  clearInterval(temp);
              }
  
          //Generate a random topic for each published message
          let topic = generateTopic(topicLen, topicLvl);

          //Generate a random message for each publishing 
          let message = generateID(5);
          let currentpublished = await publishMsg(client, topic, message);
          console.log(currentpublished);
          console.log("The limit for publisher", lim);
  
          }, interval)
      }
  }

  //Function for the simulation of the subscription of random topic from the already published topics
  const simulateSubscriptions = (client) => {
      let interval = 3000;
      let topic = "aaaabb";
      let lim = 0;
      
      if(client){
          let temp = setInterval(async () => {
              lim += 1;
              if(lim >= 10){
                  clearInterval(temp);
              }
  
          let currentsubscribed = await subscribeTopic(client, topic);
          console.log(currentsubscribed);

          console.log("The limit for subscriptions", lim);
  
          }, interval)
      }
  }   

  //Function for the simulation of the subscription of random topic from the already published topics
  export const startSimulation = async ( clientId, topic ) => {
    try{
        
        const result = await axios.post("http://localhost:3001/simulate", {
            clientId
        })
        return result;

    }catch(err){
        console.log(err)
    }

} 