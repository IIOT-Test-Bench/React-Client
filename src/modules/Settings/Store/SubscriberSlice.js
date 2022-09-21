import { createSlice } from "@reduxjs/toolkit";

const subscriber = createSlice({
    name: "subscriber",
    initialState: {
        clientId: "",
        numberlimit: 40,
        msginterval: 10,
        topicLevel: 2,        
        subscribedTopics: {}
    },
    reducers: {
        addToSubscribedTopics (state, action) {
            const {clientId, topic} = action.payload; 
            let topics = [...topic]; 
            state.subscribedTopics[clientId] = [];  
            for(let i of topics){
                state.subscribedTopics[clientId].push(i);
            }       
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
        },
        resetSubscribedTopics (state, action) {
            state.subscribedTopics = {};
        }
    },
    extraReducers:  {
        
    }
});   

 export const subscriberActions = { 
  ...subscriber.actions, 
  
}

export default subscriber;