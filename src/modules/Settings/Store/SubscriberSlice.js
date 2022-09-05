import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mqtt from 'mqtt/dist/mqtt';

    let clientObj = null;

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const connectUrl = `ws://broker.emqx.io:8083/mqtt`;
    const options = {
      keepalive: 60,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
    }

    try{
      clientObj = mqtt.connect(connectUrl, options);
      console.log("Yello", clientObj);
      clientObj.on("connect", () => {
        console.log({clientId:clientObj.options.clientId, status: "connected", msg: "Successfully Connected"});
      });
    }catch(e){
    }

const connectSubscriber = createAsyncThunk("subscriber/connectSubscriber", async () => {
    try{
      clientObj = await mqtt.connect(connectUrl, options);
      console.log("Yello", clientObj);
      clientObj.on("connect", () => {
        console.log({clientId:clientObj.options.clientid, status: "connected", msg: "Successfully Connected"});
      });
    }catch(e){
    }
});

///Disconnect a subscriber client
const disconnectSubscriber = createAsyncThunk("subscriber/disconnectSubscriber", async () => {
  try{
      if (clientObj) {
      clientObj.end();
      clientObj = null;
    }
  }catch(e){  }
});

//Subscribe to a topic
const subscribeToTopic = createAsyncThunk("subscriber/subscribeToTopic", async (subscription) => {
  try{
    const { topic, qos=2 } = subscription;
    if (clientObj) {
      clientObj.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
      });
      clientObj.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        console.log(payload);
      });
    }
  }catch(e){  }
});

//Unsubscribe from a topic
const unsubscribeFromTopic = createAsyncThunk("subscriber/unsubscribeFromTopic", async (subscription) => {
  try{
    if (clientObj) {
      const { topic } = subscription;
      clientObj.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
      });
    }
    
  }catch(e){  }
});

const subscriber = createSlice({
    name: "subscriber",
    initialState: {
        client: null,
        messages: [],
        numberlimit: 40,
        connectStatus: "disconnected",
        topics: []
    },
    reducers: {
        subscribedMessage  (state, action) {
            const {topic, message} = action.payload;
            state.messages.push({topic: topic, message: message});
        },
        setNumberLimit (state, action) {
            const {numberlimit} = action.payload;
            state.numberlimit = numberlimit;
        }
    },
    extraReducers:  {
        [connectSubscriber.pending.type]: (state, action) => {
          state.connectStatus = "Loading...";
          console.log("Loading")
        },
        [connectSubscriber.fulfilled.type]: (state, action) => {
          state.connectStatus = "connected"
          console.log("Connected", clientObj)
        },
        [connectSubscriber.rejected.type]: (state, action) => {
          console.log("Error");
        },
        [disconnectSubscriber.pending.type]: (state, action) => {
          console.log("Disconnecting")
        },
        [disconnectSubscriber.fulfilled.type]: (state, action) => {
          console.log("Disconnected")
        },
        [disconnectSubscriber.rejected.type]: (state, action) => {
          console.log("Disconnection Error");
        },
    }
});   

 export const subscriberActions = { 
  ...subscriber.actions, 
  connectSubscriber
}

export default subscriber;