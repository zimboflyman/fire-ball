import Button from "./Button";

export const ShowOnlyAirports = ({ setData, setSeries }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));

  // filter apiData by Airports List and setData to trigger a new render
  const airportFilter = () => {
    setSeries("airports");
  };

  return (
    <div>
      <Button onClick={() => airportFilter()}>Show only airports</Button>
    </div>
  );
};

export default ShowOnlyAirports;
