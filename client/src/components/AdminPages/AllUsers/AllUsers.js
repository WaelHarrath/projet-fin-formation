import React, { useEffect } from "react";
import "./AllUsers.css";
import { Button } from "react-bootstrap";
import SingleUser from "./SingleUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, addUser } from "../../../JS/Actions/AdminActions";
function AllUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminReducer.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="reservations-container">
      <Button variant="success" onClick={() => dispatch(addUser())}>
        ADD USER
      </Button>
      <ul className="reseervation-list">
        {users && users.map((el) => <SingleUser key={el._id} user={el} />)}
      </ul>
    </div>
  );
}

export default AllUsers;
