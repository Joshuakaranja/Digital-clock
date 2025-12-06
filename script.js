// digital clock

function updateClock(){
    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = ((hours % 12) || 12).toString().padStart(2,'0'); // convert to 12-hour format
    hours = hours.toString().padStart(2,'0');
    const minutes= now.getMinutes();
    const seconds = now.getSeconds();
    const timestring = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timestring;
}
    
updateClock();
setInterval(updateClock)