
import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="">SMART DRIVER</a>, <span style={{color:"#D35400"}}>Designed & Developed
                 Osama Ali Zaib & Hamza Ghaffar</span>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
