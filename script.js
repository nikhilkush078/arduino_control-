let port;
let writer;

async function connectToArduino() {
  if (!("serial" in navigator)) {
    alert("Web Serial API is not supported on this device.");
    return;
  }
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
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
    await writer.write(new TextEncoder().encode(signal));
    console.log("Signal sent: " + signal);
  } catch (error) {
    alert("Failed to send signal: " + error.message);
  }
}
