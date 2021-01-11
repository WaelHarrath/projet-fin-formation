import React, { useState, useEffect } from "react";
import "./SearchTerrains.css";
import { Form, Button, FormControl, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchTerrains } from "../../../JS/Actions/TerrainActions";
import TerrainCard from "../../TerrainCard/TerrainCard";
function SearchTerrains() {
  const dispatch = useDispatch();
  const [searchAdr, setSearchAdr] = useState({ searchAdr: "" });
  const searchLoad = useSelector((state) => state.terrainReducer.searchLoad);
  const searchedTerrs = useSelector(
    (state) => state.terrainReducer.searchedTerr
  );
  const searchedError = useSelector(
    (state) => state.terrainReducer.searchTerError
  );
  useEffect(() => {
    dispatch(searchTerrains(searchAdr));
  }, [searchAdr]);
  return (
    <div className="search-container">
      <Form
        inline
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormControl
          type="text"
          placeholder="Enter your current adress"
          className=" mr-sm-2"
          onChange={(e) => setSearchAdr({ searchAdr: e.target.value })}
        />
        <Button type="submit" disabled>
          Search
        </Button>
      </Form>
      <div className="search-rst">
        {searchedError && searchedError ? (
          <p>{searchedError.data.msg}</p>
        ) : searchLoad && searchLoad ? (
          <Spinner animation="border" variant="success" />
        ) : (
          searchedTerrs &&
          searchedTerrs.map((el, i) => <TerrainCard key={i} terrain={el} />)
        )}
      </div>
    </div>
  );
}

export default SearchTerrains;
