import Button from "./Button";

export const ShowFireBalls = ({ setApiUrl, setData, setSeries }) => {
  // setApiUrl to trigger a new fetch and render
  const fireFilter = () => {
    setApiUrl("https://ssd-api.jpl.nasa.gov/fireball.api");
    setSeries("fireBalls");
  };

  return (
    <div>
      <Button onClick={() => fireFilter()}>Show fireBalls</Button>
    </div>
  );
};

export default ShowFireBalls;
