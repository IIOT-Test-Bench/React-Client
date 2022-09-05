import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mqtt from 'mqtt/dist/mqtt';

    let client = "user";
    let isSubscribed = false;
    let connectStatus = "disconnected";

    const host = "broker.emqx.io";
    const port = "1883";
    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
    const connectUrl = `mqtt://${host}:${port}`;
    const options = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: "emqx",
    password: "public",
    reconnectPeriod: 1000,
    };



const connectSubscriber = createAsyncThunk("", async () => {
    const client = await mqtt.connect(connectUrl, options);
    client.on("connect", () => {
        console.log({clientId:client.options.clientid, status: "connected", msg: "Successfully Connected"});
        // console.log(clientobject);
      });

});

const subscriber = createSlice({
    name: "subscriber",
    initialState: {
        client: null,
        messages: [],
        numberlimit: 40,
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
    extraReducers: (builder) => {
        builder.addCase(connectSubscriber, state => {

        })
    }
});

//Subscribe to a topic
const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos=2 } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        isSubscribed = true;
      });
    }
  };

  //Unsubscribe from a topic
  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        isSubscribed = false;
      });
    }
  };

  //Disconnect a subscriber client
  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        connectStatus = 'Connect';
      });
    }
  }



 export const {addMessage, setNumberLimit} = subscriber.actions;

export default subscriber;