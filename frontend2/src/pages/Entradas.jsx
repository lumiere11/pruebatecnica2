import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Entry from "../components/Entry";
import { ServicioEntrada } from "../services/serviceEntrada";
const Entradas = () => {
  const [entrada, setEntrada] = useState([]);
  const online = useSelector((state) => state.online.value)

  const getData = async (busqueda, params = null) => {
    const servicioEntrada = new ServicioEntrada(online);
    if (busqueda) {
      const response = await servicioEntrada.search(params);
      setEntrada(response);
    } else {
      const response = await servicioEntrada.getAll();
      setEntrada(response);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) {
      getData(false);
    } else {
      getData(true, params);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      {entrada.length <= 0 ? (
        <Col xs="12" md="12">
          <Card>
            <Card.Body>No hay registros</Card.Body>
          </Card>
        </Col>
      ) : (
        entrada.map((item) => (
          <Col xs="12" md="12" key={item.id}>
            <Link to={`/entrada/${item.id}`}>
              <Entry  item = {item} />
            </Link>
          </Col>
        ))
      )}
    </Row>
  );
};

export default Entradas;
