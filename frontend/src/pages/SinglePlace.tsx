import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiServer } from "../config/config";

const SinglePlace = () => {
  const [place, setPlace] = useState({});
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
