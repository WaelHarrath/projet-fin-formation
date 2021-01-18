import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../JS/Actions/AdminActions";
function SingleUser({ user }) {
  const dispatch = useDispatch();
  return (
    <div className="reservation">
      <div className="reservation-info">
        <ul className="reseervation-list">
          <li className="text">ID</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{user._id}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">User Name</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{user.fullName}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">User Email</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{user.email}</li>
        </ul>
        <ul className="reseervation-list">
          <li className="text">User Role</li>
          <hr style={{ width: "100%" }} />
          <li className="text">{user.role}</li>
        </ul>
      </div>

      <button
        className="trash-btn"
        style={{ background: "blue", color: "white" }}
      >
        Update
      </button>
      <button
        className="trash-btn"
        onClick={() => dispatch(deleteUser(user._id))}
      >
        Delete
      </button>
    </div>
  );
}

export default SingleUser;
