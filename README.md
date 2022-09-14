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

View [the main app](http://iiot-bench.herokuapp.com) on netlify.

View [the server](http://iiot-bench.herokuapp.com) hosted on heroku.

Or the app in the development mode.\
By first cloning the repo, `npm install` and the `npm start`\
Then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### *`Main connection to the Broker`*

![Main connect](/pages/IIOTConnPage.png?raw=true "Optional Title")

- The main connection to the broker
- Users connects to the broker to server endpoint
- For every user connection a new client instance is created
  
- Main parameters required:
  - Host or IP Address of broker
  - Port number
  - Timeout
  - Username
  - Password
  - Client ID //User can use a generated client ID

### *`Running the simulation`*

![Simulation](/pages/IIOTSimulation.png?raw=true "Optional Title")

The Dashboard or the Simulation page can only be accessed after successful connection to the broker

The Client instance from the main connection is then used to publish, subscribe and listen to messages

During simulation the statistics such as CPU Usage, Memory Usage, Number of published topics and number of messages of topics subscribed to are displayed.

Realtime update from the server is done over an established websocket connection

### *`Listening to messages`*

![Listening Client](/pages/IIOTListenPage.png?raw=true "Optional Title")

The publish and subscribe route allows a user to listen to messages even during a simulation

It create a separate connection to the broker (not through the server / node app)

Allows a user to subscribe to entered topics and also publish messages

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
