import React from 'react'

const PubAndSubscribe = () => {
  return (
    <div>
        <div className="row">
            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title col">Publish</h5>
                    <p className="card-text">
                                <div className="form-group row">
                                    <div className="col-md-8" >
                                    <label htmlFor="topic" className="col col-form-label">Topic</label>
                                    <div className="col">
                                    <input type="text" className="form-control" id="topic" placeholder="Enter the topic" />
                                    </div>
                                    </div>
                                    {/* <div className="col-md-4" >
                                    <label htmlFor="TopicLevel" className="col col-form-label">Topic Level</label>
                                    <div className="col">
                                        <select className="form-select" aria-label="Select protocol">
                                        <option selected value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        </select>
                                    </div>
                                    </div> */}
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
                    </p>
                </div>
                </div>
            </div>

            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Subscriber</h5>
                    <p className="card-text">

                        {/* <!-- Button trigger modal --> */}
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Topic Subscription
                        </button>

                        {/* <!-- Modal --> */}
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control" id="topic" placeholder="Enter the topic" />
                                    </div>
                                    </div>

                                    {/* <div className="col-md-4" >
                                    <label htmlFor="TopicLevel" className="col col-form-label">Topic Level</label>
                                    <div className="col">
                                    <   select className="form-select" aria-label="Select protocol">
                                        <option selected value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        </select>
                                    </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Subscribe</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </p>
                    
                </div>
                </div>
            </div>

            <div className="col-sm-6 my-3">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Messages</h5>
                    <p className="card-text">
                        <div className="form-group row">
                        <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </div>
                    </div>

                    </p>
                </div>
                </div>
            </div>

            </div>
    </div>
  )
}

export default PubAndSubscribe