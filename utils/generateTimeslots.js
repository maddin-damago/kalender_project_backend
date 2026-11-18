export function generateTimeslots(
  start,
  end,
  bookedAppointmentsArray,
  intervalMinutes = 15,
) {
  const timeslots = [];

  // Convert "HH:MM:SS" to total minutes from midnight
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Convert total minutes back to "HH:MM:SS" format
  const minutesToTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  let currentMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);

  while (currentMinutes <= endMinutes) {
    const isAvailable = !bookedAppointmentsArray.some(
      (ba) =>
        timeToMinutes(ba.beginn) <= currentMinutes &&
        timeToMinutes(ba.ende) > currentMinutes,
    );

    timeslots.push({
      value: minutesToTime(currentMinutes),
      isAvailable: isAvailable,
    });

    currentMinutes += intervalMinutes;
  }
  return timeslots;
}
