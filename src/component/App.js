import Nav from "./Nav";
import Info from "./Info";
import DailyWeather from "./DailyWeather";
import Cloud from "./Cloud";

function App() {
  return (
    <>
      <Nav />
      <Info />
      <DailyWeather />
      {Array.from({ length: 4 }).map((_, i) => {
        const isEven = (i + 1) % 2 === 0;
        const type = isEven ? "cloud" : "clouds";
        return <Cloud key={i} clouds={type} index={i + 1} />;
      })}
    </>
  );
}

export default App;
