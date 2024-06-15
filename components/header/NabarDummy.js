import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HEADER_ITEMS } from './HeaderItems';
import Link from 'next/link';

function NavigationbarDummy() {
    return (
        <>
          {['xl'].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand className='ms-5' href="#">Navbar</Navbar.Brand>
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Offcanvas
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="pe-5 ps-5 ms-5">
                      {
                        HEADER_ITEMS.map((tabObj) => (
                          tabObj.hasChildren ?
                          <NavDropdown
                            title={tabObj.name} id={`offcanvasNavbarDropdown-expand-${expand}`} >
                            <NavDropdown.Divider />
                            {
                              tabObj.children.map((child) => (
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                              ))
                            }
                          </NavDropdown>
                          :
                          <Nav.Link className='text-dark p-4' href="#f">{tabObj.name}</Nav.Link>
                        ))
                      }
                      <div className='d-xl-none'>
                        <Nav.Link href="/customer/login" className='text-dark p-4'>SIGN IN</Nav.Link>
                        <Nav.Link href="/customer/create" className='text-dark p-4'>SIGN UP</Nav.Link>
                      </div>
                    </Nav>
                    <Nav className='ms-auto d-none d-xl-block p-3'>
                      <div className='me-5'>
                        <Button className='btn-outline-primary btn-light rounded-pill me-3'>SIGN IN</Button>
                        <Link href="/customer/create">
                            <Button className='rounded-pill'>SIGN UP</Button>
                        </Link>
                      </div>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              </Container>
            </Navbar>
          ))}
        </>
      );
}

export default NavigationbarDummy