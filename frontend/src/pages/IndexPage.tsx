import axios from "axios";
import { useEffect, useState } from "react";
import { apiServer } from "../config/config";
import { SinglePlace } from "./SinglePlace";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [allPlaces, setAllPlaces] = useState<SinglePlace[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${apiServer}allPlaces`);
        setAllPlaces(data);
      } catch (error) {
        setAllPlaces([]);
      }
    })();
  }, []);
  return (
    <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
      {allPlaces.length > 0
        ? allPlaces.map((place) => {
            return (
              <Link to={`place/${place._id}`} key={place._id} className="">
                <div className="bg-gray-500 rounded-2xl flex ">
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={place?.photos?.[0]}
                    alt="Main"
                  />
                </div>
                <h3 className="font-bold">{place.address}</h3>
                <h2 className="text-sm text-gray-500">{place?.title}</h2>
                {place.price && (
                  <div>
                    <span className="text-bold text-primary">
                      ${place?.price}
                    </span>{" "}
                    per night
                  </div>
                )}
              </Link>
            );
          })
        : ""}
    </div>
  );
}
