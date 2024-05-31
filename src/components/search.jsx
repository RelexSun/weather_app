import "../style/Search.css";
import { UilSearch } from "@iconscout/react-unicons";
function Search({ location, setLocation, searchLocation, onSubmit }) {
  
  return (
    <div className="form">
      <UilSearch />
      <form className="input" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for city..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
        />
      </form>
    </div>
  );
}

export default Search;
