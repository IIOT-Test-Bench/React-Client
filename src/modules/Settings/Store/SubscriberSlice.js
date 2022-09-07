import { createSlice } from "@reduxjs/toolkit";

const subscriber = createSlice({
    name: "subscriber",
    initialState: {
        clientId: "",
        numberlimit: 40,
        msginterval: 10,
        topicLevel: 2,        
        subscribedTopics: []
    },
    reducers: {
        addToSubscribedTopics (state, action) {
            const {topic} = action.payload;
            state.messages.push(topic);
        },
        setNumberLimit (state, action) {
          const {numberlimit} = action.payload;
          state.numberlimit = numberlimit;
        },
        setMsgInterval (state, action) {
            const {msginterval} = action.payload;
            state.msginterval = msginterval;
        },
        setTopicLevel (state, action) {
            const {topicLevel} = action.payload;
            state.topicLevel = topicLevel;
        }
    },
    extraReducers:  {
        
    }
});   

 export const subscriberActions = { 
  ...subscriber.actions, 
  
}

export default subscriber;