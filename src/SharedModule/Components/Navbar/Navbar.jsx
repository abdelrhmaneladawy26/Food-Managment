import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar({ adminData }) {
  console.log(adminData);
  return (
    <div>
      <div className="navbar-container">
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Nav className="ms-auto">
              <Nav.Link href="#">{adminData.userName}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}
