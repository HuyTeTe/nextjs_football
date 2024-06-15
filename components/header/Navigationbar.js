import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HEADER_ITEMS } from './HeaderItems';
import { connect } from 'react-redux';
import { signOutAPI } from '../../actions';
import { NOT_LOGIN } from "../../actions/actionType";
import styles from "../../styles/navbar.module.scss";

function Navigationbar(props) {
  return (
      <>
        {['xl'].map((expand) => (
          <Navbar key={expand} bg="light" expand={expand}
          //  className="mb-3 navbar fixed-top"
           className={styles["nav-bar-top"]}
          >
            <Container fluid>
              <Navbar.Brand className='ms-2' href="/"><img width={80} src="/favicon.ico"/></Navbar.Brand>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                className={styles["nav-off-canvas"]}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <img width={80} src="/favicon.ico"/>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={styles["nav-body"]}>
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
                        <Nav.Link key={tabObj.key} className='text-light font-weight-bold p-4' href={tabObj.url}>{tabObj.name}</Nav.Link>
                      ))
                    }
                    {props.user == null ? 
                      <></> :
                      (props.user == NOT_LOGIN ?
                        <div className='d-xl-none'>
                        <Nav.Link href="/customer/login" className='text-light font-weight-bold p-4'>Sign In</Nav.Link>
                        {/* <Nav.Link href="/customer/create" className='text-light font-weight-bold p-4'>Sign Up</Nav.Link> */}
                      </div> : 
                      <div className='d-xl-none'>
                        <Nav.Link onClick={() => props.signOut()} className='text-light font-weight-bold p-4'>Sign Out</Nav.Link>
                      </div>)
                    }
                  </Nav>
                  <Nav className='ms-auto d-none d-xl-block p-3'>
                  {props.user == null ? 
                    <></> :
                    (props.user == NOT_LOGIN ?
                      <div className='me-5'>
                        <Button href="/customer/login" className={styles["btn-sign-in"]}>Sign In</Button>
                        {/* <Button href="/customer/create" className={styles["btn-sign-up"]}>Sign Up</Button> */}
                    </div> : 
                    <div className='me-5'>
                        <Button onClick={() => props.signOut()} className='rounded-pill'>Sign Out</Button>
                    </div>)
                  }
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              <Navbar.Toggle className='bg-light me-3' aria-controls={`offcanvasNavbar-expand-${expand}`} />
            </Container>
          </Navbar>
        ))}
      </>
    );
}

const mapStateToProps = (state) => {
  return { user: state.userState.user };
}

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar);