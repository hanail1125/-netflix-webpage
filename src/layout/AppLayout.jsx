import React, {useState} from 'react';
import {Button, Container, Nav, Navbar, Form} from 'react-bootstrap';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import NetflixLogo from '../images/netflix-logo.png';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  };

  return (
    <div>
      <Navbar
        expand="lg"
        variant='dark'
        style={{
          width: '100%',
          position: 'fixed', top: 0, left: 0,
          zIndex: 10, padding: '15px 0',
          backgroundColor: '#0d0d0d'
        }}
      >
        <Container fluid>
          <Navbar.Brand href="/" className='logo'>
            <img src={NetflixLogo} height={28} alt='logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{maxHeight: '100px'}}
              navbarScroll
            >
              <Link to="/" style={{padding: '5px 10px', color: 'white'}}>Home</Link>
              <Link to="/movies" style={{padding: '5px 10px', color: 'white'}}>Movies</Link>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="영화검색"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type='submit' variant="outline-danger" style={{minWidth: 60}}>검색</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      <div
        style={{
          textAlign: 'center',
          fontSize: 14,
          padding: '30px 0',
          color: 'red',
          borderTop: '1px solid #111'
        }}
      >
        @NETFLIX
      </div>
    </div>
  );
};

export default AppLayout;