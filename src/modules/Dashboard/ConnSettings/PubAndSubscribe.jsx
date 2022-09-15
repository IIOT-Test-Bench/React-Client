import React, {useState, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import mqtt from 'mqtt/dist/mqtt';


const PubAndSubscribe = () => {

    let cclient = "";
    //Dispatch action from subscriber slice
    // const dispatch = useDispatch();
    

    //Subscriber topic and topic level 
    const [subTopic, setSubTopic] = useState("");
    const [subscribedTopic, setSubscribedTopic] = useState("aaaabb");
    const [subTopicLevel, setSubTopicLevel] = useState("");

    //Publisher topic and topic level 
    const [pubTopic, setPubTopic] = useState("");
    const [pubTopicLevel, setPubTopicLevel] = useState("");
    const [pubMsg, setPubMsg] = useState("");

    //Connect a subscriber client 
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const [payload, setPayload] = useState([]);

    //Connect Button
  //Store the various states for the main connection to broker
  const [connStatus, setConnStatus] = useState(false);
  const [connStatusText, setConnStatusText] = useState("Listen to messages");
  const [statusCode, setStatusCode] = useState("info");
  const [connState, setconnState] = useState("Disconnected");

    const clientId = `listeningClient_${Math.random().toString(16).slice(3)}`;
    const connectUrl = `ws://broker.emqx.io:8084/mqtt`;
    const options = {
      keepalive: 60,
      clientId: clientId,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
      },
    }

    
    
    //Connect to broker 
    const mqttConnect = (host, mqttOption) => {
      setConnectStatus('Loading...');
      try{
        let client = mqtt.connect(host, mqttOption);
        setClient(client);
        return client;
      }catch(e){
      }
    };

useEffect(() => {
  if (client) {
    client.on('connect', () => {
      setConnectStatus('Connected');
      setConnStatus(true);
      setconnState("Connected");
      setConnStatusText("Disconnect");
      // client.subscribe([topic], () => {
      //   console.log(`Subscribe to topic '${topic}'`);
      // });
    });
    client.on('error', (err) => {
      console.error('Connection error: ', err);
      client.end();
    });
    client.on('reconnect', () => {
      setConnectStatus('Reconnecting');
    });
    client.on('message', (subscribedTopic, message) => {
      console.log("Heard a msg");
      console.log(message);
      let receivedMsg = new TextDecoder("utf-8").decode(message);
      console.log(receivedMsg);
      let msg = [subscribedTopic, receivedMsg ];
      setPayload(prev => [...prev, msg]);
    });
  }
}, [client, subscribedTopic]);


  //Subscribe to a topic
  const mqttSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      console.log(topic);
       client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
      });
    }
  };

  //Unsubscribe from a topic
  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
       client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }else{
        console.log('Unsubscribed')
        }
      });
    }
  };
  
  //Publish a topic
  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos=2, payload} = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        }else{
        console.log("Published");
        }
      });
    }
  }
  
  //Disconnect from a client 
  const mqttDisconnect = () => {
    if (client) {
       client.end(() => {
        setConnectStatus('Connect');
      });
      return "Successfully Disconnected"
    }
  }
  

  //connect to broker to listen to mesages
  const handleConnect = async () => {
    try{
      setconnState("Loading...");
      
      if(client && (connState === "Connected")){
        let disconnectClient = await mqttDisconnect();
        if(disconnectClient){
          setConnStatus(false);
          setconnState("Disconnected");
          setConnStatusText("Listen to messages")
          setPayload([]);
        }        
      }else{
        let feedback = await mqttConnect(connectUrl, options);
        console.log("Checking feedback", feedback);
      }
    }catch(e){
      }
  }

  //Subscribe to a topic
  const handleSubscribe = async (topc) => {
    try{
      await mqttSub({topic: topc});
      setSubscribedTopic(topc);
    }catch(e){

    }
  }

  //Publish message
  const handlePublish = async (topc, msg) => {
    try{
      await mqttPublish({topic: topc, qos:2, payload: msg});
      console.log(payload);

    }catch(e){

    }
  }

  return (
    <>
    {cclient ? <LoadingScreen /> :
    <div>
<div className='row my-5'>
        <h2 className='col'><span id="connState" style={{color: "orange", fontSize: "0.7em"}}>{connState}</span> 
        { connState === "Connected" ?
        <div className="spinner-grow mx-3" style={{width: "1.8rem", height: "1.8rem", color: "orange"}} role="status">
         <span className="visually-hidden">Loading...</span> 
        </div>
        : ""}
        </h2>
        
        <button type="button" id="connStatus" className={`btn btn-${statusCode} col-md-3 col-lg-2`} onClick={handleConnect}>
        {connState === "Loading..."? <span className="spinner-border spinner-border-sm mx-3" role="status" aria-hidden="true"></span> : ""}
        {connStatusText}
        </button>
        </div>


        <div className="row">
            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title col">Publish</h5>
                    <div className="card-text">
                                <div className="form-group row">
                                    <div className="col-md-8" >
                                    <label htmlFor="topic" className="col col-form-label">Topic</label>
                                    <div className="col">
                                    <input type="text" className="form-control" id="topic" placeholder="Enter the topic" onChange={(e) => setPubTopic(e.target.value)} />
                                    </div>
                                    </div>
                                    <div className="col-md-4" >
                                    <label htmlFor="TopicLevel" className="col col-form-label">Topic Level</label>
                                    <div className="col">
                                        <select className="form-select" aria-label="Select protocol" defaultValue={0} onChange={(e) => setPubTopicLevel(e.target.value)}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        </select>
                                    </div>
                                    </div>
                                    </div>

                                    <div className="form-group row">
                                    <div className="col" >
                                    <label htmlFor="message" className="col col-form-label">Message</label>
                                    <div className="col">
                                    <textarea type="text" className="form-control" id="message" placeholder="Content of message" onChange={(e) => setPubMsg(e.target.value)}></textarea>
                                    </div>
                                    </div>
                                    </div>
                                    <button type="button" className="btn btn-primary col col-2" onClick={() => {handlePublish(pubTopic, pubMsg); console.log(pubTopic, pubMsg)}}>Publish</button>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Subscriber</h5>
                    <div className="card-text">

                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Topic Subscription
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Subscribe to new topics</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group row">
                                    <div className="col-md-8" >
                                    <label htmlFor="topic" className="col col-form-label">Topic</label>
                                    <div className="col">
                                    <input type="text" className="form-control" id="topic" placeholder="Enter the topic" onChange={(e) => setSubTopic(e.target.value)}/>
                                    </div>
                                    </div>

                                    <div className="col-md-4" >
                                    <label htmlFor="TopicLevel" className="col col-form-label">Topic Level</label>
                                    <div className="col">
                                    <select className="form-select" aria-label="Select protocol" onChange={(e) => {setSubTopicLevel(e.target.value); console.log(subTopicLevel)}} defaultValue={0}>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => handleSubscribe(subTopic)}>Subscribe</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>

            <div className="col-sm-6 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Messages</h5>
                    <div className="card-text">
                        <div className="form-group row">
                        <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Messages</h6>
                            {payload?.map((elem, index) => <p className="card-text" key={index}>{elem[1]}</p>)}
                        </div>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
            </div>

            </div>
    </div>
    }
    </>
  )
}

export default PubAndSubscribe