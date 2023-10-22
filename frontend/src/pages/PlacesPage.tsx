import { ChangeEvent, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks/Perks";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const PlacesPage = () => {
  const { action } = useParams<{ action: string }>();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState<Array<string>>([]);
  const [perks, setPerks] = useState<Array<string>>([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const uploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", "airbnb");
      try {
        setLoading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dircbwq69/image/upload",
          formData
        );
        if (response.status === 200) {
          const imageUrl = await response?.data?.url;
          setAddedPhotos([...addedPhotos, imageUrl]);
          setLoading(false);
        } else {
          enqueueSnackbar({
            message: "Please try again later",
            variant: "error",
            anchorOrigin: { horizontal: "right", vertical: "bottom" },
            autoHideDuration: 2000,
          });
          setLoading(false);
        }
      } catch (error) {
        enqueueSnackbar({
          message: "Error in uploading, Please try after sometime.",
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          autoHideDuration: 2000,
        });
      }
    }
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      title === "" ||
      address === "" ||
      description === "" ||
      extraInfo === "" ||
      checkIn === "" ||
      checkOut === "" ||
      perks.length <= 0 ||
      addedPhotos.length <= 0
    ) {
      return enqueueSnackbar({
        message: "Empty fields! Fill all details",
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        autoHideDuration: 2000,
      });
    }

    try {
      const payload = {
        title,
        address,
        description,
        addedPhotos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/places",
        payload,
        { withCredentials: true }
      );
      if (data) return setRedirect(true);
    } catch (error) {
      enqueueSnackbar({
        message: "Something went wrong!!!",
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "bottom" },
        autoHideDuration: 2000,
      });
    }
  };
  if (redirect) return <Navigate to={"/account/places/list"} />;

  console.log("Action", action);

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
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={onSubmit}>
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
            <label
              className="flex max-w-max p-4 items-center justify-center gap-2 border bg-transparent rounded-2xl text-2xl text-gray-500 cursor-pointer"
              title="Click to upload photos"
            >
              <input type="file" className="hidden" onChange={uploadPhoto} />
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  Upload
                </>
              )}
            </label>
            <div className="mt-5 flex gap-2 max-h-[250px] max-w-max overflow-x-auto">
              {addedPhotos.length > 0
                ? addedPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="photos"
                      className="rounded-lg max-w-[350px] max-h-full object-cover"
                    />
                  ))
                : null}
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
      {action === "list" && <h1>"All places"</h1>}
    </div>
  );
};

export default PlacesPage;
