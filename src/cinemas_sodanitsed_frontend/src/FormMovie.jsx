import React, { useState } from 'react'
import { Form, Button, Container, Card, Row } from 'react-bootstrap';
import { cinemas_sodanitsed_backend } from 'declarations/cinemas_sodanitsed_backend';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const FormMovie = (
    {
        id = null,
        pTitle = null,
        pImageUrl = null,
        pDescription = null,
        pRating = null,
        isEditable = null,
        getMovies = null,
        setShow = null
    }
) => {
    const [title, setTitle] = useState(pTitle ? pTitle : "");
    const [urlImage, setUrlImage] = useState(pImageUrl ? pImageUrl : "");
    const [description, setDescription] = useState(pDescription ? pDescription : "");
    const [rating, setRating] = useState(pRating ? pRating : 0);

    const navigate = useNavigate()

    const onChangeTitle = (e) => {
        e.preventDefault();
        const preTitle = e.target.value;
        setTitle(preTitle);
    }
    const onChangeImageUrl = (e) => {
        e.preventDefault();
        const preImageUrl = e.target.value;
        setTitle(preImageUrl);
    }

    const onChangeDescription = (e) => {
        e.preventDefault();
        const preDescription = e.target.value;
        setDescription(preDescription);
    }
    const onChangeRating = (e) => {
        e.preventDefault();
        const preRating = e.target.value;
        setRating(preRating);
    }

    function createMovie() {
        Swal.fire("Guardando pelicula, por favor espere...");
        Swal.showLoading();
        cinemas_sodanitsed_backend.addMovie(BigInt(rating), title, urlImage, description).then(() => {
            Swal.fire({
                icon: "success",
                title: "Pelicula guardada con exito!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => navigate('/'))
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Opsss ocurrio un error!",
            });
            console.log("Error al intentar crear pelicula", err)
        })
    }

    function updateMovie() {
        Swal.fire("Actualizando pelicula, por favor espere...");
        Swal.showLoading();
        cinemas_sodanitsed_backend.updateMovie(BigInt(id), title, urlImage, description, BigInt(rating)).then(() => {
            Swal.fire({
                icon: "success",
                title: "Pelicula se actualizo con exito!",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                setShow(false);
                getMovies();
            })
        }).catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Opsss ocurrio un error!",
            });
            console.log("Error al intentar crear pelicula", err)
        })
    }

    return (
        <Container className='m-5'>
            <Card className='w-50' style={{margin:'auto'}}>
                <Card.Body>
                    <Card.Title>{isEditable ? "Editar" : "Agregar"} pelicula</Card.Title>
                    <Form className='w-50' style={{margin:'auto'}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa el titulo de la pelicula:</Form.Label>
                            <Form.Control defaultValue={title} name="title" onChange={onChangeTitle} type="text" placeholder="Ingresa titulo" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa la url de una imagen sobre de la pelicula:</Form.Label>
                            <Form.Control defaultValue={urlImage} name="urlImage" onChange={onChangeImageUrl} type="text" placeholder="Ingresa la url" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa la descripcion de la pelicula:</Form.Label>
                            <Form.Control defaultValue={description} name="description" onChange={onChangeDescription} as="textarea" placeholder="Ingresa descripcion" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ingresa el rating de la pelicula:</Form.Label>
                            <Form.Control
                                name="rating"
                                defaultValue={rating}
                                onChange={onChangeRating}
                                type="number"
                                placeholder="Ingresa rating"
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={isEditable ? updateMovie : createMovie}>
                            {isEditable ? "Editar" : "Guardar"} pelicula
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    );
}

export default FormMovie;