module.exports.getCurrentTimeAsHHMM = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Pad hours and minutes with leading zeros if needed
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");

  // Combine and return as number
  return parseInt(hours + minutes);
};
