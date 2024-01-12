import React from "react";
import { Card } from "react-bootstrap";

const Entry = (props) => {
  return (
    <Card className="shadow-sm mt-3">
      <Card.Body>
        <p>Titulo: {props.item.titulo}</p>
        <p>Autor: {props.item.autor}</p>
        <p>Fecha de publicación: {props.item.fechaPublicacion}</p>
        <p>Contenido: {props.item.contenido}</p>
      </Card.Body>
    </Card>
  );
};

export default Entry;
