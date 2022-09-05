import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
    import LoadingScreen from '../../IndexPage/LoadingScreen';
import CheckBox from './CheckBox';
import InfoBox from './InfoBox';
import Slider from './Slider';

    const ConfigPubSub = () => {

    let client = useSelector((state) => state.settings.clientid);
    const [numPub, setNumPub] = useState(null);
    const [numSub, setNumSub] = useState(null);
    const [pubInterval, setPubInterval] = useState(null);
    const [pubTopicLevel, setPubTopicLevel] = useState(null);
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
    
  return (
    <>
    {client ? <LoadingScreen /> :
    <div className=''>
        {/* <h2 className='my-4'></h2> */}
        <div className="row">

            {/* Publisher configurations */}
        <div class="col-sm-6 col-md-3 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Publisher</h5>
                    <div class="card-text">
                        <form>
                            <div class="form-group row">
                            <div className="my-3">
                            <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"}/>
                            <Slider id={"pubinterval"} stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval"}/>
                            <Slider id={"pubtopiclevel"} stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"}/>
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>

                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Broker info  */}
            <div class="col-sm-6 col-md-6 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title text-center">Broker</h5>
                    <div class="card-text">
                    <form>
                    <div class="form-group row">
                            <div className="my-3">
                                <CheckBox stateVar={compression} setStateVar={setCompression} labelVar={"Compression"}/>
                                <CheckBox stateVar={encryption} setStateVar={setEncryption} labelVar={"Encryption"}/>
                                <CheckBox stateVar={persistence} setStateVar={setPersistence} labelVar={"Persistence"}/>
                            
                            </div>
                            <div className="my-3">
                            <div class="spinner-border" style={{width: "6rem", height: "6rem"}} role="status">
                            <div class="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>
                            </div>
                            
                            </div>

                            <div className="row col-md-10">
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Received"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Sent"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"Memory"} value={randnum}/>
                            <div className="row">
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Network IN"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                                <div className="col">
                                <InfoBox tagId={"cpu"} label={"Network OUT"} value={randnum} labellen={6} boxlen={5}/>
                                </div>
                            </div>
                    </div>

                    </form>

                    </div>
                </div>
                </div>
            </div>

            {/* Subscriber configurations */}
            <div class="col-sm-6 col-md-3 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Subscriber</h5>
                    <div class="card-text">
                    <form>
                            <div class="form-group row">
                            <div className="my-3">
                            <Slider id={"numsub"} stateVar={numSub} setStateVar={setNumSub} labelVar={"No. of Publisher"} />
                            <Slider id={"subtopiclevel"} stateVar={subTopicLevel} setStateVar={setSubTopicLevel} labelVar={"Topic Levels"} />
                            </div>

                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            <InfoBox tagId={"cpu"} label={"CPU"} value={randnum}/>
                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className='row'>
                <div className=''>
                <button type="button" class="btn btn-primary">Start Dashboard</button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigPubSub