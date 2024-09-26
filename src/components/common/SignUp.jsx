import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { createUserAccount } from "../../api/security/security";
import { useNavigate, useLocation } from "react-router-dom";
import VerificationModal from "./VerificationModal";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user_code, setUserCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { username, email, password, password_confirmation } = values;

  const navigate = useNavigate();
  const location = useLocation();
  const userRole = location.pathname.split("/");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  function getRole() {
    let user;
    if (userRole[1] === "org-signup") {
      user = "ORGANIZER";
    } else if (userRole[1] === "part-signup") {
      user = "PARTICIPANT";
    } else {
      user = null;
    }
    return user;
  }

  const onCloseVerificationModal = () => {
    setShowVerificationModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const role = getRole();
    createUserAccount(username, email, password, password_confirmation, role)
      .then((res) => {
        if (res.status === 201) {
          setUserCode(res.data.id);
          setSuccessMessage("Verification code sent successfully!");
          setTimeout(() => {
            setShowVerificationModal(true);
          }, 1500);

          setValues({
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
          });
        }
      })
      .catch((error) => {
        let usernameError = "";
        let passwordError = "";
        let errorMessage = "Error creating account. Please try again.";

        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors[0];

          if (errors.password) {
            passwordError = `Password ${errors.password}`;
          }
          if (errors.username) {
            usernameError = `Username ${errors.username}`;
          }

          if (usernameError && passwordError) {
            errorMessage = "Username and password errors. Please try again.";
          } else if (usernameError) {
            errorMessage = usernameError;
          } else if (passwordError) {
            errorMessage = passwordError;
          }
        }

        setErrorMessage(errorMessage);
        setUsernameError(usernameError);
        setPasswordError(passwordError);

        setValues({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center mt-16 bg-light-blue">
        <div className="bg-white p-8 rounded shadow-md w-100 border border-custom-blue overflow-y-auto ">
          <h2 className="mb-6 font-semibold">
            Sign up to UNITAR hackathon platform
          </h2>

          {successMessage && (
            <div className="mt-4 text-green-600 mb-4 border p-5 rounded border-green-600">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-red-600 mb-4 border p-5 rounded border-red-600">
              {errorMessage}
            </div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block text-md mb-2">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                placeholder="Pietro Schirano"
                value={username}
                onChange={handleChange("username")}
              />
              {usernameError && (
                <p className="text-red-600 text-xs mt-1">{usernameError}</p>
              )}
              <label className="block text-md mb-2 mt-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                placeholder="pietroschirano@gmail.com"
                value={email}
                onChange={handleChange("email")}
              />
              <label className="block text-md mb-2 mt-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                  placeholder="******"
                  value={password}
                  onChange={handleChange("password")}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm focus:outline-none"
                >
                  {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-600 text-xs mt-1">{passwordError}</p>
              )}
              <label className="block text-md mb-2 mt-2">
                {" "}
                Confirm password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                  placeholder="******"
                  value={password_confirmation}
                  onChange={handleChange("password_confirmation")}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-custom-blue text-white py-2 mt-4 rounded hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue "
              >
                Sign me up
              </button>
              <p className="mt-5 text-md text-gray-600">
                Already have a unitar account?
                <Link to="/login" className="text-blue-500 ml-1">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {showVerificationModal && (
        <VerificationModal
          onClose={onCloseVerificationModal}
          user_code={user_code}
        />
      )}
    </div>
  );
};

export default SignUp;
