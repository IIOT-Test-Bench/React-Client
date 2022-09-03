import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
    import LoadingScreen from '../../IndexPage/LoadingScreen';
import Slider from './Slider';

    const ConfigPubSub = () => {

    let client = useSelector((state) => state.settings.clientid);
    console.log("the client ", client)
    const [numPub, setNumPub] = useState(null);
    const [numSub, setNumSub] = useState(null);
    const [pubInterval, setPubInterval] = useState(null);
    const [pubTopicLevel, setPubTopicLevel] = useState(null);
    const [subTopicLevel, setSubTopicLevel] = useState(null);

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
                            <Slider stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"}/>
                            <Slider stateVar={pubInterval} setStateVar={setPubInterval} labelVar={"Interval"}/>

                            <Slider stateVar={pubTopicLevel} setStateVar={setPubTopicLevel} labelVar={"Topic Level"}/>

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

                    
                            <div className='col-md-2 ms-2'>
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">
                                Dynamic
                            </label>
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
                            <Slider stateVar={numSub} setStateVar={setNumSub} labelVar={"No. of Publisher"} />
                            <Slider stateVar={subTopicLevel} setStateVar={setSubTopicLevel} labelVar={"Topic Levels"} />


                            </div>
                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className='row'>
                <div className=''>
                <button type="button" class="btn btn-primary btn-lg">Start Dashboard</button>
                </div>

            </div>
        </div>
        }
        </>
  )
}

export default ConfigPubSub