import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks/Perks";

const PlacesPage = () => {
  const { action } = useParams<{ action: string }>();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-2 bg-primary py-2 px-4 max-w-max rounded-full text-white"
            to="/account/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            <h2>Title</h2>
            <input
              type="text"
              placeholder="My lovely apartment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2>Address</h2>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <h2>Photos</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add photo using link"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button className="bg-gray-200 px-4 min-w-min rounded-2xl">
                Add photo
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-col-6">
              {addedPhotos.length > 0
                ? addedPhotos.map((photo, index) => (
                    <div key={index}>
                      <img src={photo} alt="photos" />
                    </div>
                  ))
                : null}
              <button className="flex items-center max-w-max gap-2 border bg-transparent rounded-2xl p-4 text-2xl text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>
            <h2>Description</h2>
            <textarea
              className=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2>Perks</h2>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-col-6 mt-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2>Extra info</h2>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2>Check in&out times, max guests</h2>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3>Check in </h3>
                <input
                  type="text"
                  placeholder="14:00 PM"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3>Check out </h3>
                <input
                  type="text"
                  placeholder="12:00 PM"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3>Max guests</h3>
                <input
                  type="text"
                  placeholder="4"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(Number(e.target.value))}
                />
              </div>
            </div>
            <button className="primary my-3">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
