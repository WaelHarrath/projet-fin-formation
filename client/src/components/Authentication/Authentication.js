import React, { useState } from "react";
import "./Authentication.css";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../JS/Actions/UserActions";
import { useHistory } from "react-router-dom";
function Authentication() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeState, setActiveState] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [role, setRole] = useState("footBaller");

  const toggleActive = () => {
    if (activeState === "active") {
      setActiveState("");
    } else {
      setActiveState("active");
    }
  };
  return (
    <section>
      <div className={`container ${activeState}`}>
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://i.pinimg.com/originals/92/98/2b/92982ba4dcd54d651070b81a9634a367.jpg"
              alt="login"
              width="400px"
              height="500px"
            />
          </div>
          <div className="formBx">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Sign In</h2>
              <input
                type="text"
                name=""
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                name=""
                value="Login"
                onClick={() =>
                  dispatch(loginUser({ email, password }, history))
                }
              />
              <p className="signup">
                Dont have an account?
                <button onClick={() => toggleActive()}>Sign Up.</button>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2>Create an account</h2>
              <input
                type="text"
                name=""
                placeholder="FullName"
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                name=""
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Create Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                name=""
                placeholder="Confirm Password"
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />
              <div
                className="roleBox"
                onChange={(e) => setRole(e.target.value)}
              >
                <input
                  name="role"
                  value="footBaller"
                  type="radio"
                  defaultChecked
                />{" "}
                FootBaller
                <input name="role" type="radio" value="terrainOwner" /> Terrain
                Owner
              </div>
              <input
                type="submit"
                name=""
                value="Sign Up"
                onClick={() => {
                  dispatch(
                    registerUser(
                      {
                        fullName,
                        email,
                        password,
                        confirmationPassword,
                        role,
                      },
                      history
                    )
                  );
                }}
              />
              <p className="signup">
                Already have an account?
                <button onClick={() => toggleActive()}>Sign In.</button>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://www.leparisien.fr/resizer/yx-d6t7muZRnqaCaGaIaYh41yO0=/932x582/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/QNKKWFCKPXRAUSRJGBARFGANMI.jpg"
              alt="SignUp"
              width="400px"
              height="500px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Authentication;
