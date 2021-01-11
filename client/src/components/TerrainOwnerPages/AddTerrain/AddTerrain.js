import React, { useState, useEffect } from "react";
import "./AddTerrain.css";
import { Button, Form, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTerrain, updateTerrain } from "../../../JS/Actions/TerrainActions";
import { EDIT_TERRAIN_FAIL } from "../../../JS/Constants/TerrainConstants";

function AddTerrain() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userId = user && user._id;
  const [terrName, setTerrName] = useState("");
  const [terrAdress, setTerrAdress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [terrFormat1, setTerrFormat1] = useState("");
  const [terrFormat2, setTerrFormat2] = useState("");
  const [terrType, setTerrType] = useState("Indoor");
  const [terrSurface, setTerrSurface] = useState("Grass");
  const [terrPrice, setTerrPrice] = useState("");
  const [terrImages, setTerrImages] = useState(null);
  const editTerr = useSelector((state) => state.terrainReducer.editTerr);
  const editedTerr = useSelector((state) => state.terrainReducer.editedTerr);
  const editedTerrId = editedTerr && editedTerr._id;
  const clearData = () => {
    setTerrName("");
    setTerrAdress("");
    setContactPhone("");
    setTerrFormat1("");
    setTerrFormat2("");
    setTerrType("Indoor");
    setTerrSurface("Grass");
    setTerrPrice("");
    setTerrImages(null);
  };
  const handleSubmit = async (e) => {
    // const data = new FormData();
    // data.append("name", terrName);
    // data.append("address", terrAdress);
    // data.append("phone", contactPhone);
    // data.append("format", `${terrFormat1}X${terrFormat2}mètres`);
    // data.append("type", terrType);
    // data.append("surface", terrSurface);
    // data.append("price", terrPrice);
    // if (terrImages) {
    //   Array.from(terrImages).forEach((el) => {
    //     data.append("terrainImages", el);
    //   });
    // }
    // console.log(data);
    if (editTerr && editTerr === true) {
      console.log("updating ...");
      const updateData = new FormData();
      updateData.append("name", terrName);
      updateData.append("address", terrAdress);
      updateData.append("phone", contactPhone);
      updateData.append("format", `${terrFormat1}X${terrFormat2}mètres`);
      updateData.append("type", terrType);
      updateData.append("surface", terrSurface);
      updateData.append("price", terrPrice);
      if (terrImages) {
        Array.from(terrImages).forEach((el) => {
          updateData.append("terrainImages", el);
        });
      }
      dispatch(updateTerrain(updateData, editedTerrId, history));
    } else {
      const data = new FormData();
      data.append("name", terrName);
      data.append("address", terrAdress);
      data.append("phone", contactPhone);
      data.append("format", `${terrFormat1}X${terrFormat2}mètres`);
      data.append("type", terrType);
      data.append("surface", terrSurface);
      data.append("price", terrPrice);
      if (terrImages) {
        Array.from(terrImages).forEach((el) => {
          data.append("terrainImages", el);
        });
      }
      console.log(data);
      dispatch(addTerrain(data, history, userId));
    }
  };
  useEffect(() => {
    clearData();
    if (editTerr && editTerr === true && editedTerr) {
      setTerrName(editedTerr.name);
      setTerrAdress(editedTerr.address);
      setContactPhone(editedTerr.phone);
      setTerrFormat1(
        editedTerr.format.substring(0, editedTerr.format.indexOf("X"))
      );
      setTerrFormat2(
        editedTerr.format.substring(
          editedTerr.format.indexOf("X") + 1,
          editedTerr.format.indexOf("mètres")
        )
      );
      setTerrType(editedTerr.type);
      setTerrSurface(editedTerr.surface);
      setTerrPrice(editedTerr.price);
      // setTerrImages(editedTerr.terrImages);
    }
  }, [editTerr, editedTerr]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="terrain-form-add"
    >
      <Card
        style={{
          width: "30rem",
          height: "45.6rem",
          marginRight: "30px",
          marginBottom: "20px",

          backgroundColor: "white",

          border: "transparent",
        }}
      >
        <Card.Header
          style={{
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            textAlign: "center",
            color: "black",
          }}
        >
          {editTerr && editTerr ? "EDIT A TERRAIN" : "ADD A NEW TERRAIN"}
        </Card.Header>

        <Card.Body>
          <Form encType="multipart/form-data">
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Terrain name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={terrName}
                onChange={(e) => {
                  setTerrName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Terrain address :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Terrain address"
                name="terrAdress"
                value={terrAdress}
                onChange={(e) => setTerrAdress(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Contact Phone :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="contactPhone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Terrain Format :</Form.Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="20"
                  name="terrFormat1"
                  value={terrFormat1}
                  style={{ width: "50px", marginRight: "2%" }}
                  onChange={(e) => setTerrFormat1(e.target.value)}
                />
                <span style={{ color: "black" }}>X</span>
                <Form.Control
                  type="text"
                  placeholder="50"
                  name="terrFormat2"
                  value={terrFormat2}
                  style={{ width: "50px", marginRight: "2%", marginLeft: "2%" }}
                  onChange={(e) => setTerrFormat2(e.target.value)}
                />
                <span style={{ color: "black" }}>mètres</span>
              </div>
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Terrain Type :</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                custom
                onChange={(e) => setTerrType(e.target.value)}
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Terrain Surface :</Form.Label>
              <Form.Control
                as="select"
                size="sm"
                custom
                onChange={(e) => setTerrSurface(e.target.value)}
              >
                <option value="Grass">Grass</option>
                <option value="Acrylic">Acrylic</option>
                <option value="EPDM">EPDM</option>
              </Form.Control>
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Reservation Price :</Form.Label>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="30"
                  name="terrPrice"
                  value={terrPrice}
                  style={{ width: "100px", marginRight: "2%" }}
                  onChange={(e) => setTerrPrice(e.target.value)}
                />
                <span style={{ color: "black" }}>TND/Heure</span>
              </div>
            </Form.Group>
            <Form.Group
              controlId="formUploadImages"
              style={{ textAlign: "left" }}
              encType="multipart/form-data"
            >
              <Form.Label>Terrain Images :</Form.Label>
              <input
                type="file"
                name="terrainImages"
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => {
                  setTerrImages(e.target.files);
                }}
              />
            </Form.Group>
          </Form>
        </Card.Body>
        <div className="buttons">
          <Button
            variant="outline-primary edit-button"
            type="submit"
            onClick={handleSubmit}
          >
            {editTerr && editTerr ? "EDIT" : "ADD"}
          </Button>

          <Button
            variant="outline-primary edit-button"
            onClick={() => {
              clearData();
              dispatch({ type: EDIT_TERRAIN_FAIL });
              history.push("/myTerrains");
            }}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AddTerrain;
