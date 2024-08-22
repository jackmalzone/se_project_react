import "./WeatherCard.css";
import sunny from "../../assets/weather-sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;F</p>
      <img src={sunny} alt="" classme="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
