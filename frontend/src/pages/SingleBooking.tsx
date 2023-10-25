import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiServer } from "../config/config";

const SingleBooking = () => {
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await axios.get(`${apiServer}booking/${id}`, {
        withCredentials: true,
      });
      console.log("booking", data);
    })();
  }, [id]);
  return <div>SingleBooking</div>;
};

export default SingleBooking;
