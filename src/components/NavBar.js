import { useRouter } from 'next/router';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from '../styles/NavBar.module.css'; // Import the custom CSS module

function NavBar() {
  const router = useRouter();
  const isLocal = process.env.NODE_ENV === 'development';
    return (
    <>
      <style type="text/css">
        {`
        .nav-pills .dropdown-toggle.show {
          background-color: #ff6000;
          color: black;
          font-weight: 500;
          border-radius: 5px;
        }

        .nav-pills .dropdown-menu .dropdown-item.active,
        .nav-pills .dropdown-menu .dropdown-item:active {
          background-color: #ff6000;
          color: black;
          font-weight: 500;
        }

        .nav-pills .nav-link.active {
          margin-left: 5px;
          margin-right: 5px;
        }

        .nav-pills .nav-link.active {
          background-color: #ff6000;
          color: black;
          font-weight: 500;
          border-radius: 5px;
        }
        `}
      </style>
      <Navbar sticky="top" expand="lg" className={`${styles.float} bg-body-tertiary`} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="/images/general/PorretGaming_Logo_cut.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Porret Gaming logo"
            />
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="me-auto">
              <NavDropdown title="Games" id="basic-nav-dropdown" className={router.pathname.includes('/games') ? 'active' : ''}>
                <NavDropdown.Item href="#action/3.2">Squiggle</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="UE Plugins" id="basic-nav-dropdown" className={router.pathname.includes('/plugins') ? 'active' : ''}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href={isLocal ? '/release_notes' : '/release_notes.html'} className={router.pathname === '/release_notes' ? 'active' : ''}>Release Notes</Nav.Link>
            </Nav>
            <Nav variant="pills" className="ms-auto">
              <Nav.Link href={isLocal ? '/about' : '/about.html'} className={router.pathname === '/about' ? 'active' : ''}>About</Nav.Link>
              <div className={styles.verticalDivider}></div>
              <Nav.Link href={isLocal ? '/contact' : '/contact.html'} className={router.pathname === '/contact' ? 'active' : ''}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
