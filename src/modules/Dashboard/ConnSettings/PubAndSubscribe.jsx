import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import {subscriberActions} from '../../Settings/Store/SubscriberSlice';

const PubAndSubscribe = () => {

    //Dispatch action from subscriber slice
    const dispatch = useDispatch();
    
    //Later would be added to redux store
    const [currentClient, setCurrentClient] = useState("");
    //Subscriber topic and topic level 
    const [subTopic, setSubTopic] = useState("");
    const [subTopicLevel, setSubTopicLevel] = useState("");

    //Connect a subscriber client 
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);
    const [payload, setPayload] = useState(null);
    
  

useEffect(() => {
  if (client) {
    console.log(client)
    client.on('connect', () => {
      setConnectStatus('Connected');
    });
    client.on('error', (err) => {
      console.error('Connection error: ', err);
      client.end();
    });
    client.on('reconnect', () => {
      setConnectStatus('Reconnecting');
    });
    client.on('message', (topic, message) => {
      const payload = { topic, message: message.toString() };
      setPayload(payload);
      console.log(payload);
    });
  }
}, [client]);

  //Store the various states for the main connection to broker
  const [connStatus, setConnStatus] = useState(false);
  const [connStatusText, setConnStatusText] = useState("Listen to messages");
  const [statusCode, setStatusCode] = useState("info");
  const [connState, setconnState] = useState("Disconnected");

  
  const waitSmall = () => {
    setTimeout(() => {
        console.log("waiting")
    }, 5000);
  }


  const handleConnect = async () => {
    try{
      setconnState("Loading...");
      
      if(connStatus && (connState === "Connected")){
        let feedback = dispatch(subscriberActions.connectSubscriber());
        console.log(feedback);
        if(feedback.statusText === "OK"){
          setConnStatus(false);
          setconnState("Disconnected");
        }        
      }else{
        let feedback = dispatch(subscriberActions.connectSubscriber());
        if(feedback){
          setConnStatus(true);
          setconnState("Connected");
        }
      }

    }catch(e){

    }
    
  }
  

  const handleSubscribe = () => {
    console.log("Subscribe to topic")
  }


  return (
    <>
    {currentClient ? <LoadingScreen /> :
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
                                    <input type="text" className="form-control" id="topic" placeholder="Enter the topic" />
                                    </div>
                                    </div>
                                    <div className="col-md-4" >
                                    <label htmlFor="TopicLevel" className="col col-form-label">Topic Level</label>
                                    <div className="col">
                                        <select className="form-select" aria-label="Select protocol" defaultValue={0}>
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
                                    <textarea type="text" className="form-control" id="message" placeholder="Content of message"></textarea>
                                    </div>
                                    </div>
                                    </div>
                                    <button type="button" className="btn btn-primary col col-2">Publish</button>
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
                                <button type="button" className="btn btn-primary" onClick={handleSubscribe}>Subscribe</button>
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
                            {payload?.map((elem, index) => <p className="card-text" key={index}>{elem}</p>)}
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