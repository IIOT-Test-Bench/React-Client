import { createSlice } from "@reduxjs/toolkit"

const publisher = createSlice({
    name: "publisher",
    initialState: {
        messages: [],
        numberlimit: 40,
        msginterval: 10
    },
    reducers: {
        addMessage  (state, action) {
            const {topic, message} = action.payload;
            state.messages.push({topic: topic, message: message});
        },
        setNumberLimit (state, action) {
            const {numberlimit} = action.payload;
            state.numberlimit = numberlimit;
        },
        setMsgInterval (state, action) {
            const {msginterval} = action.payload;
            state.msginterval = msginterval;
        }
    }
});

 export const {addMessage, setNumberLimit, setMsgInterval} = publisher.actions;

export default publisher;