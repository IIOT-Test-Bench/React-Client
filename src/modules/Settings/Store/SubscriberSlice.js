import { createSlice } from "@reduxjs/toolkit";
import mqtt from 'mqtt/dist/mqtt';


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
    extraReducers: {}
});

 export const {addMessage, setNumberLimit} = subscriber.actions;

export default subscriber;