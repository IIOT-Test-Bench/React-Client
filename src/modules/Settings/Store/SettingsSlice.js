import { createSlice } from "@reduxjs/toolkit"

const settings = createSlice({
    name: "settings",
    initialState: {
        host: "",
        port: "",
        conntimeout: "",
        protocol: "",
        username: "",
        password: "",
        clientid: ""
    },
    reducers: {
        setHost(state, action) {
            const {host} = action.payload;
            state.host = host;
        },
        setPort(state, action) {
            const {port} = action.payload;
            state.port = port;
        },
        setConnTimeout(state, action) {
            const {timeout} = action.payload;
            state.port = timeout;
        },
        setProtocol(state, action) {
            const {protocol} = action.payload;
            state.protocol = protocol;
        },
        setUsername(state, action) {
            const {username} = action.payload;
            state.username = username;
        },
        setPassword(state, action) {
            const {password} = action.payload;
            state.password = password;
        },
        setClientId(state, action) {
            const {clientid} = action.payload;
            state.clientid = clientid;
        }
    }
});

 export const {addMessage, setNumberLimit} = settings.actions;

export default settings;