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
        clientid: "",
        connStatus: false,
        connStatusText: "Connect",
        statusCode: "info",
        connState: "Disconnected"
    },
    reducers: {
        setCurrentClient(state, action) {
            const {host, port, clientid, timeout, protocol, username, password} = action.payload;
            state.clientid = clientid;
            state.host = host;
            state.port = port;
            state.timeout = timeout;
            state.protocol = protocol;
            state.username = username;
            state.password = password;
        },
        setConnState(state, action) {
            const {connState} = action.payload;
            state.connState = connState;
        },
        setConnStatus(state, action) {
            const {connStatus} = action.payload;
            state.connStatus = connStatus;
        },
        setStatusCode(state, action) {
            const {statusCode} = action.payload;
            state.statusCode = statusCode;
        },
        setConnStatusText(state, action) {
            const {connStatusText} = action.payload;
            state.connStatusText = connStatusText;
        },
        resetConnection(state, action){
            state.host = "";
            state.port = "";
            state.conntimeout = "";
            state.protocol = ""; 
            state.username = "";
            state.password = "";
            state.clientid = "";
            state.connStatus = false;
            state.connStatusText = "Connect";
            state.statusCode = "info";
            state.connState = "Disconnected";
        }
    },
    extraReducers: {

    }
});

 export const { 
    setCurrentClient,
    setConnState,
    setConnStatus,
    setConnStatusText,
    setStatusCode, 
    resetConnection
} = settings.actions;

export default settings;