import React from "react";
import NavBar from "../components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

function userMainPage() {
  return (
    <div>
      <NavBar />
      <div>
        <div
          id="carouselExampleAutoplaying"
          class="carousel slide"
          data-bs-ride="true"
          style={{ margin: "-50px auto 0px" }}
        >
          <div class="carousel-inner" style={{ height: "500px" }}>
            <div class="carousel-item active" data-bs-interval="5000">
              <img
                src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=sph"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21202.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=sph"
                class="d-block w-100"
                alt="..."
              />
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img
                src="https://img.freepik.com/free-photo/medium-shot-nurses-wearing-masks_23-2149484058.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
                class="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "gray",
                padding: "20px",
                height: "50px",
                maxWidth: "5px",
              }}
            ></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
              style={{
                backgroundColor: "gray",
                padding: "20px",
                height: "50px",
                maxWidth: "5px",
              }}
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div>
        <Container className="my-5" style={{ width: "70%" }}>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-3">Welcome to HCMS</h2>
              <p style={{ fontSize: "17px" }}>
                Welcome to HCMS, a leading healthcare provider committed to
                delivering exceptional medical services to our patients. At
                HCMS, we believe that every patient deserves the highest quality
                care, and we strive to provide just that through our
                state-of-the-art facilities and highly trained medical
                professionals.
              </p>
              <p style={{ fontSize: "17px" }}>
                Our facilities are equipped with the latest medical
                technologies, allowing us to provide advanced medical services
                to our patients. We have a team of highly skilled physicians,
                surgeons, nurses, and other medical professionals who are
                dedicated to providing the best possible care to our patients.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container className="my-5">
          <h2 className="text-center mb-5">Our Services</h2>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=sph"
                />
                <Card.Body>
                  <Card.Title>Primary Care</Card.Title>
                  <Card.Text>
                    Our primary care physicians provide comprehensive care to
                    patients of all ages, from infants to seniors.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/coworkers-discussing-about-business-report_1098-347.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
                />
                <Card.Body>
                  <Card.Title>Risk Evaluation</Card.Title>
                  <Card.Text>
                    Our team of medical professionals assess the risk of
                    potential medical conditions for our patients, allowing us
                    to take preventative measures and provide early intervention
                    when necessary.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/full-shot-women-working-together_23-2148476542.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
                />
                <Card.Body>
                  <Card.Title>Specialized Care</Card.Title>
                  <Card.Text>
                    Our team of medical specialists provide expert care for a
                    wide range of medical conditions, including stress
                    management, obesity controlling.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/medical-practitioner-answering-phone-calls_482257-6464.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=sph"
                />
                <Card.Body>
                  <Card.Title>
                    Appointment and Medical Report Analysis Services
                  </Card.Title>
                  <Card.Text>
                    We offer online appointment scheduling for our patients,
                    making it easy to book appointments at a time that works for
                    them. <br />
                    Our medical team analyzes patient medical reports to provide
                    accurate diagnoses and effective treatment plans.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/sided-view-hand-typing-keyboard_23-2149445753.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
                />
                <Card.Body>
                  <Card.Title>
                    Schedule Providing with Progress Tracking
                  </Card.Title>
                  <Card.Text>
                    We provide daily schedules for our patients to help them
                    manage their appointments and treatments, ensuring they
                    receive the best possible care. In addition, our patients
                    can track their progress through our online platform,
                    allowing them to monitor their health and stay on track with
                    their treatment plans. Our progress tracking system helps
                    patients to stay motivated and engaged in their health
                    journey, promoting better outcomes and improved quality of
                    life.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://img.freepik.com/free-photo/female-pharmacist-working-drugstore_259150-57972.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
                />
                <Card.Body>
                  <Card.Title>Pharmaceutical Ordering</Card.Title>
                  <Card.Text>
                    We offer an easy and convenient way for our patients to
                    order their prescription medications online, ensuring they
                    receive their medications on time and without any hassle.
                    Our online pharmacy also provides access to a wide range of
                    prescription and over-the-counter medications, allowing our
                    patients to conveniently order all of their medications in
                    one place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div>
          <footer className="py-3" style={{ backgroundColor: "#eef4ed" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <p>HCMS &copy; {new Date().getFullYear()}</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <p>123 Main Street, Sri Lanka</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default userMainPage;
