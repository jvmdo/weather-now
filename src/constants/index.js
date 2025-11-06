/* 
  [unitSystems] and [xyzUnits] indices must match
  Empty values are API defaults. Search params should not include them
*/
export const unitSystems = ["Metric", "Imperial"];

export const temperatureUnits = [
  { id: crypto.randomUUID(), value: "", label: "Celsius (°C)" },
  { id: crypto.randomUUID(), value: "fahrenheit", label: "Fahrenheit (°F)" },
];

export const windSpeedUnits = [
  { id: crypto.randomUUID(), value: "", label: "km/h" },
  { id: crypto.randomUUID(), value: "mph", label: "mph" },
];

export const precipitationUnits = [
  {
    id: crypto.randomUUID(),
    value: "",
    label: "Millimeters (mm)",
    short: "mm",
  },
  { id: crypto.randomUUID(), value: "inch", label: "Inches (in)", short: "in" },
];

//? Imaginary [1, 2] (should be [1,3]) since I did not find an appropriate range for cloudy
export const weatherCodeToIcon = new Map([
  [[0, 0], "sunny"], // Clear sky
  [[1, 2], "partly-cloudy"], // Mainly clear, partly cloudy, and overcast
  [[3, 3], "overcast"], // Mainly clear, partly cloudy, and overcast
  [[45, 48], "fog"], // Fog and depositing rime fog
  [[51, 55], "drizzle"], // Light, moderate, and dense intensity
  [[56, 57], "drizzle"], // Light and dense intensity freezing drizzle
  [[61, 65], "rain"], // Slight, moderate and heavy intensity
  [[66, 67], "rain"], // Light and heavy intensity freezing rain
  [[71, 75], "snow"], // Slight, moderate, and heavy intensity
  [[77, 77], "snow"], // Snow grains
  [[80, 82], "rain"], // Slight, moderate, and violent
  [[85, 86], "snow"], // Snow showers slight and heavy
  [[95, 95], "storm"], // Slight or moderate
  [[96, 99], "storm"], // Thunderstorm with slight and heavy hail
]);
