# IIOT-Test-Bench

![IIOT Test Bench](/pages/IIOTLogo.png?raw=true "Logo")

## Project Objective

The heart of a IIoT solution is a message broker. Several technologies are available here, e.g., MQTT-Broker, Microsoft Azure IoT Hub or Kafka. The risk is that we do not know the limits of these systems in productive use. These include performance and load with a very large number of messages, publishing large amounts of data via the broker and networks, persistence, security and compression of IoT data.
Conceptual design and construction of a scalable IIoT test bench in which the above
points are tested and the results are visualized in a dashboard.

## Technologies Used

- Front End built with react
- Redux
- Express
- MQTT
- Heroku Hosting
- Socket IO
- Netlify Hosting

## **Usage**

View [the main app](https://iiot-test-bench-project.netlify.app) on netlify.

View [the server](http://iiot-bench.herokuapp.com) hosted on heroku.

Or the app in the development mode.\
By first cloning the repo, `npm install` and the `npm start`\
Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Diagrams

`DFD Diagram`

![DFD Diagram](/diagrams/dfd.png?raw=true "Optional Title")

`User Interaction`

![DFD Diagram](/diagrams/userinteraction.png?raw=true "Optional Title")

- DFD and User Interactions

### *`Main connection to the Broker`*

![Main connect](/pages/IIOTConnPage.png?raw=true "Optional Title")

- The main connection to the broker
- Users connects to the broker to server endpoint
- For every user connection a new client instance is created
  
- Main parameters `required`:
  - Host or IP Address of broker
  - Port number
  - Timeout
  - Username
  - Password
  - Client ID //`User can use a generated client ID`

This is the route or page to also disconnect the main connection

Upon a successful connection to the broker through the server, the user or client gets feedback of the `client ID`

### *`Running the simulation`*

![Simulation](/pages/IIOTSimulation.PNG?raw=true "Optional Title")

The Dashboard or the Simulation page can only be accessed after successful connection to the broker

The Client instance from the main connection is then used to publish, subscribe and listen to messages

During simulation the statistics such as `CPU Usage, Memory Usage, Number of published topics` and `number of messages of topics subscribed to`, are displayed.

Realtime update from the server is done over an established websocket connection

To Run the simulation, user must set the parameters by using the sliders

- Each slider has a corresponding checkbox that set the slider value to a random value of the range of its connected slider

- To use the slider component, you first import it and pass the parameters or props
  
  - The states it would work with, below is a sample instance of a property and its setter function

    ```code
    const [loading, setLoading] = useState(false);
    ```

  - These are then passed as the stateVar and setStateVar respectively

    ```code
    <Slider id={"numpub"} stateVar={numPub} setStateVar={setNumPub} labelVar={"No. of Publisher"} min={"1"} max={"10"}/>
    ```

After setting the required parameters, user can then start simulation. This sets up a websocket connection to the server

Then client from the main connection is used for the publishing and subscribing to topics during the simulation

The `client ID` is emitted from the connected socket client and publisher and subscriber instances are setup by calling the client object from the `Client Class`

```code
const client = Client.getClient(clientId);
```

While the websocket connection is active, count of all received messages from subscribed topics are passed to the connected socket client which is displayed in the `infobox component`

The list of all subscribed topics during the simulation are emitted or passed on to the connected socket client, which can be viewed at the `Graphs route` on the dashboard side navigation

### *`Listening to messages`*

![Listening Client](/pages/IIOTListenPage.PNG?raw=true "Optional Title")

The publish and subscribe route allows a user to listen to messages even during a simulation

It create a separate connection to the broker (not through the server / node app)

Allows a user to subscribe to entered topics and also publish messages

User would first establish the connection by clicking the `listen to messages` button. The same would be used for disconnection

### React / Client Side

```txt
Main Routes:
    - Configure connection
    - Run simulation
    - Listener (Also publish topics and messages by User)
    - Graphs (Currently, displays topics subscribed to during simulation)
```

### Server / Node App

```txt
Classes: 
    - Client
    - Publisher
    - Subscriber
```

## **IIOT Test Bench Project**
