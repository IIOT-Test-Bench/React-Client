import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from '../../IndexPage/LoadingScreen';
import CheckBox from './CheckBox';
import InfoBox from './InfoBox';
import Slider from './Slider';
import io from 'socket.io-client';
import {subscriberActions} from '../../Settings/Store/SubscriberSlice';

const socket = io("https://iiot-bench.herokuapp.com:9000", {
        withCredentials: true,
        transports: ['websocket']
      });
  
    const ConfigStartDashboard = () => {
      const dispatch = useDispatch();
      
    const [isConnected, setIsConnected] = useState(false);
    const [msg, setMsg] = useState(null);
    //Store simulation running values
    const [simulationOn, setSimulationOn] = useState(false)
    const [endSocket, setEndSocket] = useState(false)
    const [loading, setLoading] = useState(false);

    //Usage statistics
    const [cpu, setCpu] = useState(`${0}%`);
    const [memUsage, setMemUsage] = useState(`${0} MB`);
    const [sent, setSent] = useState(0);
    const [received, setReceived] = useState(0);
    const [netIn, setNetIn] = useState(0);
    const [netOut, setNetOut] = useState(0);



    let client = useSelector((state) => state.settings.clientid);
    const [numPub, setNumPub] = useState("");
    const [numSub, setNumSub] = useState(null);
    const [pubInterval, setPubInterval] = useState("");
    const [pubTopicLevel, setPubTopicLevel] = useState("");
    const [subTopicLevel, setSubTopicLevel] = useState(null);
    const [randnum, setRandNum] = useState(0);

    const [compression, setCompression] = useState(false);
    const [encryption, setEncryption] = useState(false);
    const [persistence, setPersistence] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setRandNum(Math.floor(Math.random()*100));
        }, 1000);
      
      return () => {
      }
    }, []) 
    
    useEffect(() => {
      //For the client side socket io connection 
            socket.on('connect', () => {
              setLoading(false);
              setIsConnected(true);
              // console.log("yesssss");
            });
            socket.on('connectionStatus', (data) => {
              console.log("The details", data);
            });
  
            socket.on('IDReceived', () => {
              // console.log("The id has been received")
            })
  
            socket.on('disconnect', () => {
              setIsConnected(false);
              setLoading(false);
            });
        
            socket.on('memory-usage', (data) => {
              setMsg(data);
              console.log("Memory Usage:", data);
              setMemUsage(data);
            });
            socket.on('cpu-usage', (data) => {
              console.log("CPU Usage:", data);
              setCpu(data);
            });
            socket.on('sent', (data) => {
              // console.log("Sent messages:", data);
              setSent(data);
            });
            socket.on('received', (data) => {
              // console.log("Received messages:", data);
              setReceived(data);
            });
            socket.on('netin', (data) => {
              // console.log("Net In:", data);
              setNetIn(data);
            });
            socket.on('netout', (data) => {
              // console.log("Net Out:", data);
              setNetOut(data);
            });
            socket.on('topics', (data) => {
              console.log("Topics:", data);
              dispatch(subscriberActions.addToSubscribedTopics({topic:data}));
            });          
        
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off('memory-usage');
        };
      }, []);
    
      const handleSimulation = () => {

        switch(isConnected){
          case true:
            setEndSocket(true);
            setSimulationOn(false);
            socket.emit('stopSimulation', {numOfPubs:numPub});
            console.log("Stopped logging the info...")
            socket.close();
            setIsConnected(false);
            setLoading(false);
            console.log(isConnected);
          break;
          case false:
            setSimulationOn(true);
            console.log(socket); 
            console.log("yesssss");
            socket.connect();
            socket.emit("clientId", client, (feedback) => {
              console.log("Client Id received", feedback)
            });
            socket.emit('startSimulation', {numOfPubs:numPub, pubInterval:pubInterval, pubTopicLevel:pubTopicLevel, numOfSubs:numSub, subTopicLevel:subTopicLevel})
            setIsConnected(true);
            console.log(isConnected);
          break;
          default:
        }
        
      }
    
  return (
    <>
    {!client ? <LoadingScreen message={"Kindly connect to broker to run simulation"}/> :
    <div className=''>
        {/* <h2 className='my-4'></h2> */}
        <div className="row">

            {/* Publisher configurations */}
        <div className="col-sm-6 col-md-3 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Publisher</h5>
                    <div className="card-text">
                        <form>
                            <div className="form-group row">
                            <div className="my-3">
                            <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"} min={"1"} max={"10"}/>
                            <Slider id={"pubinterval"} stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval (ms)"} min={"10"} max={"10000"} step={"1"} />
                            <Slider id={"pubtopiclevel"} stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"} max={"5"}/>
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory USage"} value={memUsage}/>

                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Broker info  */}
            <div className="col-sm-6 col-md-6 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Broker</h5>
                    <div className="card-text">
                    <form>
                    <div className="form-group row">
                            <div className="my-3">
                                <CheckBox stateVar={compression} setStateVar={setCompression} labelVar={"Compression"} disabled={true}/>
                                <CheckBox stateVar={encryption} setStateVar={setEncryption} labelVar={"Encryption"} disabled={true}/>
                                <CheckBox stateVar={persistence} setStateVar={setPersistence} labelVar={"Persistence"} disabled={true}/>
                            
                            </div>
                            <div className="my-3 d-flex justify-content-center">
                            {/* <div className="spinner-border" style={{width: "6rem", height: "6rem"}} role="status">
                            <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                            </div>
                            </div> */}
                            <img src='gear.svg' alt='gear button' />
                            
                            </div>

                            <div className="row col-md-10">
                                <div className="col">
                                <InfoBox tagId={"received"} label={"Received"} value={received} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"sent"} label={"Sent"} value={sent} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory"} value={memUsage}/>
                            <div className="row">
                                <div className="col">
                                <InfoBox tagId={"netin"} label={"Network IN"} value={netIn} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"netout"} label={"Network OUT"} value={netOut} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                    </div>

                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Subscriber configurations */}
            <div className="col-sm-6 col-md-3 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Subscriber</h5>
                    <div className="card-text">
                    <form>
                            <div className="form-group row">
                            <div className="my-3">
                            <Slider id={"numsub"} stateVar={numSub} setStateVar={setNumSub} labelVar={"No. of Subscribers"} />
                            <Slider id={"subtopiclevel"} stateVar={subTopicLevel} setStateVar={setSubTopicLevel} labelVar={"Topic Levels"} />
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={cpu}/>
                            <InfoBox tagId={"memory"} label={"Memory Usage"} value={memUsage}/>
                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className='row'>
                <div className=''>
                <button type="button" className="btn btn-primary" onClick={() => handleSimulation()}>
                {loading? <span className="spinner-border spinner-border-sm mx-3" role="status" aria-hidden="true"></span> : ""}
                  Start Dashboard
                  </button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigStartDashboard