# ESP32 Water Level Detection & Monitoring System

A simple IoT project that uses an ESP32 and water-sensing wires to detect the presence of water and visualize the detection status through a React web application.

## Overview

This project combines an ESP32 microcontroller with a React-based interface. Users can connect the ESP32 to the application through a connection button. Once connected, the application displays whether water has been detected by the sensor wires.

## Features

- ESP32-based water detection.
- React-based user interface.
- Button to connect the ESP32 through a USB/serial connection.
- Displays water detected and water not detected states.
- Automatically updates the displayed status after connection, according to incoming sensor data.
- Simple and user-friendly visualization.

## Hardware Components

- ESP32 development board
- Connecting/jumper wires used as water sensors
- USB data cable
- Computer running the React application
- Water container for testing

## Pin Connections

| ESP32 Pin | Connection |
|---|---|
| GPIO 17 | Water sensor wire 1 |
| GPIO 21 | Water sensor wire 2 |

Refer to the actual circuit diagram for the complete wiring details.

## How It Works

1. Connect the ESP32 to the computer using a USB data cable.
2. Start the React application.
3. Click the connection button in the application.
4. When the ESP32 is connected, the application starts receiving sensor status updates.
5. When water contacts the sensor wires, the ESP32 detects the condition and sends the corresponding status.
6. The React interface displays whether water is detected.

## Project Structure

```text
ESP32-Water-Level-Monitor/
├── frontend/
├── esp32/
├── docs/
│   ├── circuit-diagram.png
│   ├── hardware-setup.jpg
│   └── app-screenshot.png
└── README.md
```

*Adjust the folder names above to match your actual project structure.*

## Documentation

### Circuit Diagram

![Circuit Diagram](docs/circuit-diagram.png)

### Hardware Setup

![Hardware Setup](docs/hardware-setup.jpg)

### Application Interface

![React Application](docs/app-screenshot.png)

## Running the Project

### ESP32

1. Open the ESP32 source code in Arduino IDE.
2. Select the correct ESP32 board and COM port.
3. Upload the firmware to the board.

### React Application

1. Open the React application folder in a terminal.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed in the terminal.
5. Connect the ESP32 using the application's connection button.

*The exact commands and serial connection requirements may vary depending on the existing project configuration.*

## Limitations

- Detection depends on water conductivity and the sensor wiring.
- This prototype detects water contact; it does not measure the exact water height.
- The USB connection and browser must support the communication method implemented in the application.
- Continuous immersion may cause corrosion or electrochemical effects on exposed wires.

## Future Improvements

- Multiple sensing points for different tank levels.
- Visual indicators for low, medium, and high water levels.
- Audible alerts when water reaches a specified point.
- Wireless monitoring and remote notifications.
- Improved sensor durability.
