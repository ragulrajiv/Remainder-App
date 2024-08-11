function setReminder() {
  const dayOfWeek = document.getElementById("dayOfWeek").value;
  const time = document.getElementById("time").value;
  const activity = document.getElementById("activity").value;

  if (!time) {
    alert("Please select a time.");
    return;
  }

  const reminderItem = document.createElement("div");
  reminderItem.className = "reminder-item";
  reminderItem.innerText = `${dayOfWeek} - ${time} - ${activity}`;
  document.getElementById("reminderList").appendChild(reminderItem);

  const reminderTime = new Date();
  const [hours, minutes] = time.split(":");
  reminderTime.setHours(hours);
  reminderTime.setMinutes(minutes);
  reminderTime.setSeconds(0);

  const now = new Date();
  const timeDifference = reminderTime.getTime() - now.getTime();

  if (timeDifference > 0) {
    setTimeout(() => {
      document.getElementById("chime").play();
      alert(`Time for: ${activity}`);
    }, timeDifference);
  } else {
    alert("Selected time is in the past. Please choose a future time.");
  }
}
