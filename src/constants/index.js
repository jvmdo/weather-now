/* 
  Indices must match
*/
export const units = ["Metric", "Imperial"];

export const temperatureUnits = [
  { id: crypto.randomUUID(), value: "c", label: "Celsius (°C)" },
  { id: crypto.randomUUID(), value: "f", label: "Fahrenheit (°F)" },
];

export const windSpeedUnits = [
  { id: crypto.randomUUID(), value: "km/h", label: "km/h" },
  { id: crypto.randomUUID(), value: "mph", label: "mph" },
];

export const precipitationUnits = [
  { id: crypto.randomUUID(), value: "mm", label: "Millimeters (mm)" },
  { id: crypto.randomUUID(), value: "in", label: "Inches (in)" },
];
