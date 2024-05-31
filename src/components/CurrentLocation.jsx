import { UilLocationPoint } from "@iconscout/react-unicons";
import "../style/CurrentLocation.css";
function CurrentLocation({data}) {
  return (
    <div className="location">
      <UilLocationPoint size={35} />
      <h1>{data.name}</h1>
    </div>
  );
}

export default CurrentLocation;
