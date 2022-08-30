import { createSlice } from "@reduxjs/toolkit"

const subscriber = createSlice({
    name: "subscriber",
    initialState: {
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
    }
});

 export const {addMessage, setNumberLimit} = subscriber.actions;

export default subscriber;