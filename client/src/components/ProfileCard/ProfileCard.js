import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@material-ui/core/Popover";
import { useHistory } from "react-router-dom";
import { changeAvatar } from "../../JS/Actions/UserActions";
function ProfileCard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [avatar, setAvatar] = useState("");
  const User = useSelector((state) => state.userReducer.user);
  const name = User && User.fullName;
  const nameCapitalized = User && name.charAt(0).toUpperCase() + name.slice(1);
  const email = User && User.email;
  const role = User && User.role;
  const userAvatar = User && User.avatar;
  const userId = User && User._id;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleAvatar = async (e) => {
    const data = new FormData();
    data.append("avatar", avatar);
    dispatch(changeAvatar(userId, data, history));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  return (
    <div className="container emp-profile">
      <form>
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              {userAvatar ? (
                <img
                  src={process.env.REACT_APP_IMG_URL + userAvatar}
                  alt="avatar"
                />
              ) : (
                <img
                  src="https://cdn4.iconfinder.com/data/icons/generic-users-essentials-colored/48/JD-01-512.png"
                  alt="avatar"
                />
              )}
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input
                  type="file"
                  name="avatar"
                  onChange={(e) => {
                    onSelectFile(e);
                    handleClick(e);
                    setAvatar(e.target.files[0]);
                  }}
                  onClick={() => setEdit(true)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h5>{nameCapitalized}</h5>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <h2 style={{ textAlign: "center" }}>Image Preview</h2>
                <img src={preview} width="300px" height="250px" />
              </Popover>
            </div>
          </div>
          <div className="col-md-2">
            {edit ? (
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Save"
                onClick={() => {
                  setEdit(false);
                  setSelectedFile(undefined);
                  handleAvatar();
                }}
              />
            ) : null}
          </div>
        </div>

        <div className="col-md-8">
          <div className="tab-content profile-tab" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="row">
                <div className="col-md-6">
                  <label>Name</label>
                </div>
                <div className="col-md-6">
                  <p>{nameCapitalized}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Email</label>
                </div>
                <div className="col-md-6">
                  <p>{email}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label>Profession</label>
                </div>
                <div className="col-md-6">
                  <p>{role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileCard;
