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
        setCurrentClient(state, action) {
            const {host, port, clientid, timeout, protocol, username, password} = action.payload;
            state.clientid = clientid;
            state.host = host;
            state.port = port;
            state.timeout = timeout;
            state.protocol = protocol;
            state.username = username;
            state.password = password;
        }
    },
    extraReducers: {

    }
});

 export const { setCurrentClient} = settings.actions;

export default settings;