import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiServer } from "../config/config";
import { format } from "date-fns";

const SingleBooking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!id) return;
      const { data } = await axios.get(`${apiServer}booking/${id}`, {
        withCredentials: true,
      });
      setBooking(data);
      setLoading(false);
    })();
  }, [id]);
  // const handlePrint = () => {
  //   window.print();
  // };

  // useEffect(() => {
  //   const handleKeyPress = (event) => {
  //     if (event.ctrlKey && event.key === 'p') {
  //       window.print();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyPress);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);
  if (!booking) return null;
  if (loading) return "Loading....";
  return (
    <div className="bg-gray-300 rounded-md">
      <div className="mb-3 p-4">
        <h3 className="text-3xl font-semibold"> {booking?.place?.title}</h3>
        <p className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {booking?.place?.address}
        </p>
      </div>
      <p className="p-4">{booking?.place?.extraInfo}</p>
      <div className="mt-4 bg-gray-200  p-4">
        <h2 className="text-md text-black py-1">
          Name: {booking?.booking?.name}
        </h2>
        <h2 className="text-md text-black py-1">
          Address: {booking?.booking?.address}
        </h2>
        <div>
          {booking?.booking?.checkIn && (
            <p className="text-gray-700">
              Check in-{" "}
              {format(new Date(booking.booking.checkIn), "dd-MM-yyyy")}
            </p>
          )}
          {booking?.booking?.checkOut && (
            <p className="text-gray-700">
              Check out-{" "}
              {format(new Date(booking.booking.checkOut), "dd-MM-yyyy")}
            </p>
          )}
          <p className="text-gray-700">
            Number of guests- {booking?.booking?.numberOfGuest}
          </p>
          <p className="text-gray-700">
            Phone number - {booking?.booking?.phone}
          </p>
          <p className="text-gray-700">
            Price -{" "}
            <span className="text-primary font-semibold">
              ${booking?.booking?.price}
            </span>{" "}
            / per night
          </p>
        </div>
      </div>
      {/* <button onClick={handlePrint} className="bg-primary text-white">Print</button> */}
    </div>
  );
};

export default SingleBooking;
