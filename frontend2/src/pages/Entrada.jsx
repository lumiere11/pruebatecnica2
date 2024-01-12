/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Entry from "../components/Entry";
import { ServicioEntrada } from "../services/serviceEntrada";

const Entrada = () => {
  const { id } = useParams();
  const online = useSelector((state) => state.online.value)

  const [data, setData] = useState({});

  const getData = async () => {
    const servicioEntrada = new ServicioEntrada(online);
    const response = await servicioEntrada.getById(id);
    setData(response);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Entry item={data} />
    </>
  );
};

export default Entrada;
