import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiServer } from "../config/config";
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
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await axios.get(`${apiServer}places/${id}`, {
        withCredentials: true,
      });
      setPlace(data);
    })();
  }, [id]);
  return <div>SinglePlace</div>;
};

export default SinglePlace;
