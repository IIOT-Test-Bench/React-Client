import React from 'react'

const PubAndSubscribe = () => {
  return (
    <div>
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title col">Publish</h5>
                    <p class="card-text">
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
                                        <select class="form-select" aria-label="Select protocol">
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
                                    <button type="button" class="btn btn-primary col col-2">Publish</button>
                    </p>
                </div>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Subscriber</h5>
                    <p class="card-text">

                        {/* <!-- Button trigger modal --> */}
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Add New Topic Subscription
                        </button>

                        {/* <!-- Modal --> */}
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Subscribe to new topics</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
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
                                    <   select class="form-select" aria-label="Select protocol">
                                        <option selected value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        </select>
                                    </div>
                                    </div> */}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Subscribe</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </p>
                    
                </div>
                </div>
            </div>

            <div class="col-sm-6 my-3">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Messages</h5>
                    <p class="card-text">
                        <div className="form-group row">
                        <div class="card">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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