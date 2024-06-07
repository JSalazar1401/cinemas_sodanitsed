import { useEffect, useState } from 'react';
import { cinemas_sodanitsed_backend } from 'declarations/cinemas_sodanitsed_backend';
import { Container, Row, Col, Card, Table, Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"
import FormMovie from './FormMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState(false);

  const navigate = useNavigate()
  useEffect(() => {
    getMovies();
  }, []);


  function getMovies() {
    Swal.fire("Cargando peliculas, por favor espere...");
    Swal.showLoading();
    cinemas_sodanitsed_backend.getAllMovies().then(movies => {
      setMovies(movies);
      Swal.close();
    });
  }

  function getMovie(id) {
    Swal.fire("Cargando pelicula, por favor espere...");
    Swal.showLoading();
    cinemas_sodanitsed_backend.getMovieById(BigInt(id)).then(movie => {
      setMovie(movie.shift());
      Swal.close();
      setShow(true);
    });
  }

  function deleteMovie(id) {
    Swal.fire("Eliminando pelicula, por favor espere...");
    Swal.showLoading();
    cinemas_sodanitsed_backend.deleteMovie(BigInt(id)).then(() => {
      getMovies();
    });
  }

  return (
    <Container fluid>
      <Row className='m-5'>
        <Card>
          <Card.Body>
            <Row className='m-3'>
              <Col>
                <Card.Title>Listado de peliculas</Card.Title>
              </Col>
              <Col>
                <Button variant="success" onClick={() => navigate('/crear-pelicula')}>Agregar pelicula</Button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Rating</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  movies?.map((movie) => (
                    <tr>
                      <td>{Number(movie.id)}</td>
                      <td>{movie.title}</td>
                      <td>{movie.description}</td>
                      <td>{Number(movie.rating)}</td>
                      <td>
                        <Row>
                          <Col>
                            <Button variant="info" onClick={() => getMovie(Number(movie.id))}>Editar</Button>
                          </Col>
                          <Col>
                            <Button variant="danger" onClick={()=>deleteMovie(Number(movie.id))}>Eliminar</Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Editar pelicula!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormMovie
            id={Number(movie.id)}
            pTitle={movie.title}
            pDescription={movie.description}
            pRating={Number(movie.rating)}
            isEditable={true}
            getMovies={getMovies}
            setShow={setShow}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default App;
