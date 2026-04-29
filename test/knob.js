const knob = document.getElementById("knob-container");
let isDragging = false;
const MIN_ROTATION = -180; // Minimum rotation
const MAX_ROTATION = 0; // Maximum rotation
const audio = document.getElementById("audio");
const widget = SC.Widget(audio);

// Initialize the knob
initializeKnob();

// Event listeners for dragging
knob.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

// Initialize the knob's rotation and volume
function initializeKnob() {
  updateKnobRotation(MAX_ROTATION); // Start at 0° for 100% volume
  updateVolume(100); // Set initial volume to 100%
}

// Mouse down event handler
function onMouseDown() {
  isDragging = true; // Start dragging
}

// Mouse move event handler
function onMouseMove(e) {
  if (isDragging) {
    const currentAngle = getAngle(e);
    const newRotation = clamp(currentAngle, MIN_ROTATION, MAX_ROTATION);

    // Update knob rotation and volume based on new angle
    updateKnobRotation(newRotation);
    updateVolume(mapRotationToVolume(newRotation));
  }
}

// Mouse up event handler
function onMouseUp() {
  isDragging = false; // Stop dragging
}

// Get the angle based on mouse position
function getAngle(event) {
  const rect = knob.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  return Math.atan2(y, x) * (180 / Math.PI);
}

// Clamp a value between a minimum and maximum
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Map rotation to volume percentage
function mapRotationToVolume(rotation) {
  let result = Math.round(((rotation + 180) / 180) * 100);
  widget.setVolume(result);
  return result; // Map to 0-100
}

// Update the knob's rotation
function updateKnobRotation(rotation) {
  knob.style.transform = `rotate(${rotation}deg)`;
}

// Update volume (replace with your widget update logic)
function updateVolume(volume) {
  console.log("Volume:", volume);
}
