import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { apiServer } from "../config/config";
import BookingWidget from "../components/BookingWidget/BookingWidget";
import { differenceInCalendarDays, format, isBefore } from "date-fns";
import { enqueueSnackbar } from "notistack";
export interface SinglePlace {
  address: string;
  checkIn: string;
  checkOut: string;
  createdAt: string;
  description: string;
  extraInfo: string;
  maxGuest: number;
  owner: string;
  perks: [string];
  photos: [string];
  title: string;
  updatedAt: string;
  price?: number;
  __v: number;
  _id: string;
}

const SinglePlace = () => {
  const [place, setPlace] = useState<SinglePlace>({
    address: "",
    checkIn: "",
    checkOut: "",
    createdAt: "",
    description: "",
    extraInfo: "",
    maxGuest: 0,
    owner: "",
    perks: [""],
    photos: [""],
    title: "",
    updatedAt: "",
    __v: 0,
    _id: "",
  });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [numberOfGuest, setNumberOfGuest] = useState(0);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("");
  const { id } = useParams();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const today = format(new Date(), "yyyy-MM-dd");
    if (isBefore(new Date(value), new Date(today))) {
      name === "checkIn" ? setCheckIn(today) : setCheckOut(today);
    } else {
      name === "checkIn" ? setCheckIn(value) : setCheckOut(value);
    }
  };

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await axios.get(`${apiServer}places/${id}`, {
        withCredentials: true,
      });
      setPlace(data);
    })();
  }, [id]);

  if (!place) return "";
  if (redirect) return <Navigate to={redirect} />;
  const handleBooking = async () => {
    if (
      differenceInCalendarDays(new Date(checkIn), new Date(checkOut)) >= 0 ||
      numberOfGuest === 0 ||
      phone === "" ||
      address === ""
    ) {
      return enqueueSnackbar({
        message: "Fill all the required fields",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
        autoHideDuration: 2000,
      });
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiServer}booking`,
        {
          price: place.price || 200,
          name: fullName,
          place: place._id,
          checkIn,
          checkOut,
          numberOfGuest,
          phone,
          address,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setFullName("");
        setAddress("");
        setCheckIn("");
        setCheckOut("");
        setPhone("");
        setNumberOfGuest(0);
        setLoading(false);
        setRedirect(`/account/bookings/${response.data._id}`);
        return enqueueSnackbar({
          message: "Booking is successful 🎉🎉",
          variant: "success",
          anchorOrigin: { horizontal: "right", vertical: "top" },
          autoHideDuration: 2000,
        });
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="my-2 font-semibold underline flex gap-2 items-center"
        href={`https://maps.google.com/?q=${place.address}`}
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
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

        {place.address}
      </a>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mb-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div>
            Check-in {place.checkIn} <br />
            Check-out {place.checkOut} <br />
            Max-guest {place.maxGuest}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl">
          <div className="text-2xl mb-4">Price: {place.price} / per night</div>
          <div className="flex gap-3 border rounded max-w-max p-4">
            <div className="p-2 flex gap-3 border-r">
              <label>Check in:</label>
              <input
                name="checkIn"
                type="date"
                value={checkIn}
                onChange={handleDateChange}
              />
            </div>
            <div className="p-2 flex gap-3">
              <label>Check out:</label>
              <input
                type="date"
                name="checkOut"
                value={checkOut}
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="flex flex-col mt-2">
            <label className="mb-2">Number of guests</label>
            <input
              className="border pl-3 py-2 rounded-lg"
              type="number"
              min={0}
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(Number(e.target.value))}
            />
          </div>
          <div>
            <div className="">
              <label>Full Name</label>
              <input
                className="border pl-3 py-2 rounded-lg"
                type="text"
                value={fullName}
                placeholder="Enter full name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="">
              <label>Phone Number</label>
              <input
                className="border pl-3 py-2 rounded-lg"
                type="text"
                value={phone}
                placeholder="Enter phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="">
              <label>Full address</label>
              <input
                className="border pl-3 py-2 rounded-lg"
                type="text"
                value={address}
                placeholder="Full address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <button className="primary max-w-[40%]" onClick={handleBooking}>
            {loading ? (
              "Loading"
            ) : (
              <>
                Book this place
                {checkIn && checkOut && (
                  <span>
                    {differenceInCalendarDays(
                      new Date(checkIn),
                      new Date(checkOut)
                    )}
                  </span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        <BookingWidget place={place} />
      </div>
      <div>
        <div className="bg-white -mx-8 p-8 border-t">
          <h2 className="font-semibold text-2xl">Extra Information</h2>
          <div className="leading-4 text-gray-700 text-sm my-4">
            {place.extraInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
