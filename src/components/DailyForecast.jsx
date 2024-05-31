import "../style/DailyForecast.css";

function DailyForecast({ forecast }) {
  function weekDays(date) {
    const daysOfWeek = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    const dayOfWeekIndex = new Date(date * 1000).getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  const groupedByDay = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }
    groupedByDay[day].push(item);
  });

  const currentTimes = Object.keys(groupedByDay).slice(1, 8);

  return (
    <div className="daily-forecast">
      {currentTimes.map((day) => (
        <div className="forecast-detail" key={day}>
          <h1 className="day">{weekDays(groupedByDay[day][0].dt)}</h1>
          <img
            src={`./openweathermap/${groupedByDay[day][0].weather[0].icon}.svg`}
            alt={groupedByDay[day][0].weather[0].icon}
          />
          <p>{groupedByDay[day][0].main.temp.toFixed()}°C</p>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
