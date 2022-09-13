import Button from "./Button";

export const ShowOnlyAirports = ({ setData }) => {
  const apiData = JSON.parse(localStorage.getItem("apiData"));

  // filter apiData by Airports List and setData to trigger a new render

  return (
    <div>
      <Button
      //   onClick={() => airlineFilter(index)}
      >
        Show only airports
      </Button>
    </div>
  );
};

export default ShowOnlyAirports;
