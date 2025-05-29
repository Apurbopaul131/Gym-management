"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToMinutes = exports.addHoursToTime = void 0;
const addHoursToTime = (startTime, hoursToAdd) => {
    // Split the input string into hours and minutes
    const [startHour, startMinute] = startTime.split(':').map(Number);
    // Create a new Date object for manipulation
    const date = new Date();
    date.setHours(startHour);
    date.setMinutes(startMinute);
    // Add the specified number of hours
    date.setHours(date.getHours() + hoursToAdd);
    // Format result with leading zeros
    const endHour = String(date.getHours()).padStart(2, '0');
    const endMinute = String(date.getMinutes()).padStart(2, '0');
    return `${endHour}:${endMinute}`;
};
exports.addHoursToTime = addHoursToTime;
const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};
exports.timeToMinutes = timeToMinutes;
