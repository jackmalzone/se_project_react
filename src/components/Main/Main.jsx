import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="weather">
        <p className="weather__text">
          Today is 75&deg;F / You may want to wear:
        </p>
      </section>
    </main>
  );
}

export default Main;
