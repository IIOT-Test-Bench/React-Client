import { createSlice } from "@reduxjs/toolkit"

const publisher = createSlice({
    name: "publisher",
    initialState: {
        clientId: "",
        publishedTopics: [],
        numberlimit: 40,
        msginterval: 10,
        topicLevel: 2
    },
    reducers: {
        //Would be converted to a thunk to fetch topics from node server topics endpoint
        // addPublishedTopics (state, action) {
        //     const {topic, message} = action.payload;
        //     state.publishedTopics.push({topic: topic, message: message});
        // },
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
    }
});

 export const { setNumberLimit, setMsgInterval, setTopicLevel} = publisher.actions;

export default publisher;