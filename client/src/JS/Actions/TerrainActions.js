import {
  GET_TERRAIN,
  FAIL_TERRAIN,
  ADD_TERRAIN,
  DELETE_TERRAIN,
  LOAD_TERRAIN,
  SEARCH_TERR_FAIL,
  SEARCH_TERR_LOAD,
  SEARCH_TERR_SUCC,
  EDIT_TERRAIN,
  EDIT_TERRAIN_FAIL,
  EDIT_TERRAIN_SUCC,
} from "../Constants/TerrainConstants";
import axios from "axios";

//add a terrain

export const addTerrain = (terrain, history, id) => async (dispatch) => {
  dispatch({ type: LOAD_TERRAIN });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(
      `/terrain/${id}/createTerrain`,
      terrain,
      options
    ); //terrain, msg
    dispatch({ type: ADD_TERRAIN, payload: result.data });
    dispatch({ type: GET_TERRAIN });
    history.push(`/myTerrains`);
  } catch (error) {
    dispatch({ type: FAIL_TERRAIN, payload: error.response });
  }
};

// get all terrain

export const getTerrains = (id) => async (dispatch) => {
  dispatch({ type: LOAD_TERRAIN });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(`/terrain/${id}/myTerrains`, options);
    dispatch({ type: GET_TERRAIN, payload: result.data.response });
  } catch (error) {
    dispatch({ type: FAIL_TERRAIN, payload: error.response.data });
  }
};
//search terrain

export const searchTerrains = (searchAdr) => async (dispatch) => {
  dispatch({ type: SEARCH_TERR_LOAD });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(
      "/terrain/searchTerrains",
      searchAdr,
      options
    );

    dispatch({ type: SEARCH_TERR_SUCC, payload: result.data.data });
  } catch (error) {
    dispatch({ type: SEARCH_TERR_FAIL, payload: error.response });
  }
};

//udpate terrain
//toggle edit
export const toggleEdit = (userId, terrainId) => async (dispatch) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(
      `/terrain/findTerr/${userId}/${terrainId}`,
      options
    );
    dispatch({ type: EDIT_TERRAIN, payload: result.data.response });
  } catch (error) {
    dispatch({ type: SEARCH_TERR_FAIL, payload: error.response.msg });
  }
};
export const updateTerrain = (updateData, editedTerrId, history) => async (
  dispatch
) => {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.post(
      `/terrain/updateTerrain/${editedTerrId}`,
      updateData,
      options
    );
    dispatch({ type: EDIT_TERRAIN_SUCC });
    history.push(`/myTerrains`);
  } catch (error) {
    dispatch({ type: EDIT_TERRAIN_FAIL, payload: error });
  }
};

// delete a terrain

export const deleteTerrain = (id, terId) => async (dispatch) => {
  dispatch({ type: LOAD_TERRAIN });
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.delete(
      `/terrain/${id}/myTerrains/${terId}`,
      options
    );
    dispatch({ type: DELETE_TERRAIN });
    dispatch(getTerrains(id));
  } catch (error) {
    dispatch({ type: FAIL_TERRAIN, payload: error.reqponse.data });
  }
};
