import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SinglePlace } from "./SinglePlace";

const AllPlaces = () => {
  const [places, setPlaces] = useState<SinglePlace[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://airbnb-mern-0hpi.onrender.com//api/places", {
        withCredentials: true,
      });
      setPlaces(data);
    })();
  }, []);
  return (
    <div>
      <div className="mt-4">
        {places && places.length > 0 ? (
          places.map((place: SinglePlace) => (
            <Link
              key={place._id}
              to={`/account/places/list/${place._id}`}
              className="flex cursor-pointer my-2 gap-4 bg-gray-200 p-4 rounded-xl"
            >
              <div className="w-32 max-w-lg h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    src={place.photos[0]}
                    alt="places"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-semibold"> {place?.title}</h2>
                <p className="text-sm mt-e">{place.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <h3>No accommodations</h3>
        )}
      </div>
    </div>
  );
};

export default AllPlaces;
