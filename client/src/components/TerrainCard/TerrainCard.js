import React from "react";
import "./TerrainCard.css";
import { Carousel, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTerrain, toggleEdit } from "../../JS/Actions/TerrainActions";
import { useHistory } from "react-router-dom";
function TerrainCard({ terrain, role, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const imgs = [];
  terrain.terrainImages.map((el) => imgs.push(el));
  const handleDeleteShow = (e) => {
    if (role === "terrainOwner") {
      dispatch(deleteTerrain(userId, terrain._id));
    }
  };
  const handleEditBook = (e) => {
    if (role === "terrainOwner") {
      dispatch(toggleEdit(userId, terrain._id));
    }
  };
  return (
    <div className="terrain-card-container">
      <Card
        className="terr-card"
        style={{
          width: "20rem",
          height: "37rem",
          borderRadius: "10px",
        }}
      >
        <Card.Header>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[0]}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[1]}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={process.env.REACT_APP_IMG_URL + imgs[2]}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Card.Header>
        <Card.Body>
          <div className="first-section">
            <Card.Text>
              <span style={{ fontSize: "15px" }}>
                <b>Terrain Name</b>
              </span>
              <br />
              {terrain.name}
            </Card.Text>
            <Card.Text>
              <span>
                <b>Terrain Address</b>
              </span>
              <br />

              {terrain.address}
            </Card.Text>
            <Card.Text>
              <span>
                <b>Contact Phone</b>
              </span>
              <br />

              {terrain.phone}
            </Card.Text>
          </div>
          <div className="terrain-carac">
            <p>
              <b>Format </b>
              <br />
              <span>{terrain.format}</span>
            </p>
            <p>
              <b>Type</b>
              <br />
              <span>{terrain.type}</span>
            </p>
            <p>
              <b>Surface</b>
              <br />
              <span>{terrain.surface}</span>
            </p>
            <p>
              <b>price</b>
              <br />
              <span>{terrain.price}/h</span>
            </p>
          </div>
        </Card.Body>
        <div className="buttons">
          <Button
            variant="outline-primary edit-button"
            onClick={(e) => {
              handleEditBook(e);
              history.push(`/editTerrain/${terrain._id}`);
            }}
          >
            {role === "terrainOwner" ? "Edit" : "Book"}
          </Button>

          <Button
            variant={
              role === "terrainOwner"
                ? "outline-danger edit-button"
                : "outline-primary edit-button"
            }
            onClick={handleDeleteShow}
          >
            {role === "terrainOwner" ? "Delete" : "Show"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TerrainCard;
