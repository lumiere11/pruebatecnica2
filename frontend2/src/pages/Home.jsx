import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { default as Form } from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ServicioEntrada } from "../services/serviceEntrada";
import { jsonToQueryParams } from "../utils/utils";

const Home = () => {
  const navigate = useNavigate();
  const online = useSelector((state) => state.online.value);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [searchForm, setSearchForm] = useState({
    titulo: "",
    autor: "",
    contenido: "",
  });

  const [disabled, setDisabled] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchForm((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    validation();
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const params = jsonToQueryParams(searchForm);
    navigate(`/busqueda${params}`);
  };
  const handleCrear = async (data) => {
    const servicioEntrada = new ServicioEntrada();
    await servicioEntrada.crear(data);
    reset()
  };

  const validation = () => {
    if (
      searchForm.titulo.trim() === "" &&
      searchForm.autor.trim() === "" &&
      searchForm.contenido.trim() === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  return (
    <div>
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmitSearch}>
            <Form.Group className="mb-3" controlId="entry.titleSearch">
              <Form.Label>Buscar por titulo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cien años de soledad"
                name="titulo"
                onChange={handleInputChange}
                value={searchForm.titulo}
                disabled={online === false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry.autorSearch">
              <Form.Label>Buscar por autor:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tolstoy"
                name="autor"
                onChange={handleInputChange}
                value={searchForm.autor}
                disabled={online === false}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry.contenidoSearch">
              <Form.Label>Buscar por contenido:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contenido.."
                name="contenido"
                onChange={handleInputChange}
                value={searchForm.contenido}
                disabled={online === false}
              />
            </Form.Group>
            <Button type="submit" disabled={disabled || online === false}>
              Buscar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mt-3 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit(handleCrear)}>
            <Form.Group className="mb-3" controlId="entry.title">
              <Form.Label>Titulo:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cien años de soledad"
                name="titulo"
                disabled={online === false}
                {...register("titulo", { required: true })}
              />
              {errors.titulo && <span>Este campo es requerido</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry.author">
              <Form.Label>Autor:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Gabriel Garcia"
                name="autor"
                disabled={online === false}
                {...register("autor", { required: true })}
              />
              {errors.autor && <span>Este campo es requerido</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry.publicationDate">
              <Form.Label>Fecha de publicación:</Form.Label>
              <Form.Control
                type="date"
                placeholder="11/11/2000"
                name="fechaPublicacion"
                disabled={online === false}
                {...register("fechaPublicacion", { required: true })}
              />
              {errors.fechaPublicacion && <span>Este campo es requerido</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="entry.content">
              <Form.Label>Contenido:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="contenido"
                disabled={online === false}
                {...register("contenido", { required: true })}
              />
              {errors.contenido && <span>Este campo es requerido</span>}
            </Form.Group>
            <Button type="submit" disabled={online === false}>
              Crear
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Home;
