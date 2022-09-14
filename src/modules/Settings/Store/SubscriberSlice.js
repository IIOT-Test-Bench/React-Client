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
            let topics = [...topic];   
            for(let i of topics){
                if(!state.subscribedTopics.includes(i)){
                    state.subscribedTopics.push(i);
                }
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
        }
    },
    extraReducers:  {
        
    }
});   

 export const subscriberActions = { 
  ...subscriber.actions, 
  
}

export default subscriber;