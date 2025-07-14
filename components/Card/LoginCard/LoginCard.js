import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../../redux/userSlice";

const LoginCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data.user));
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const getUserInitials = (name) => {
    if (name) {
      const nameParts = name.split(" ");
      const initials = nameParts.map((part) => part[0]).join("");
      return initials.toUpperCase();
    }
    return "";
  };

  return (
    <div className="login__card">
      <div className="login__header">
        {!currentUser ? (
          <h2>Login</h2>
        ) : (
          <div className="user__icon">
            {getUserInitials(currentUser.name)}
          </div>
        )}
      </div>

      {!currentUser ? (
        <form onSubmit={handleSubmit}>
          <div className={`input__container ${formErrors.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
            {formErrors.email && <p className="error__text">{formErrors.email}</p>}
          </div>

          <div className={`input__container ${formErrors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="*********"
            />
            {formErrors.password && <p className="error__text">{formErrors.password}</p>}
          </div>

          <button type="submit" className="btn__login">LOGIN</button>
        </form>
      ) : (
        <div className="user__info">
          <p>Welcome, {currentUser.name}!</p>
        </div>
      )}

      {!currentUser && (
        <>
          <p><Link to="/forgot-password">Forgot password?</Link></p>
          <p>
            Don't have an account? <Link to="/account/register">Create account</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginCard;
