let port;
let writer;

async function connectToArduino() {
  try {
    port = await navigator.serial.requestPort(); // Request a port when user clicks the button
    await port.open({ baudRate: 9600 }); // Open the port
    writer = port.writable.getWriter(); // Get the writer
    alert("Connected to Arduino!");
  } catch (error) {
    alert("Connection failed: " + error.message);
  }
}

async function sendSignal(signal) {
  if (!writer) {
    alert("Please connect to the Arduino first.");
    return;
  }
  try {
    await writer.write(new TextEncoder().encode(signal)); // Send the signal
    console.log("Signal sent: " + signal);
  } catch (error) {
    alert("Failed to send signal: " + error.message);
  }
}
