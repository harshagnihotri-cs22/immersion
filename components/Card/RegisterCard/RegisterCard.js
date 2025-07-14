import { Link, useNavigate } from "react-router-dom";
import "./RegisterCard.css";
import { useState } from "react";

const RegisterCard = () => {
  const [formData, setformData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (ev) => {
    setformData({ ...formData, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errors = {};

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (!nameRegex.test(formData.firstName)) {
      errors.firstName = "First name must contain only letters";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    } else if (!nameRegex.test(formData.lastName)) {
      errors.lastName = "Last name must contain only letters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/account/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header"><h1>Create Account</h1></div>
        <form onSubmit={handleSubmit} className="register__inputs">
          <div className={`reg__input__container ${formErrors.firstName ? "error" : ""}`}>
            <label>First name</label>
            <input name="firstName" onChange={handleChange} />
            {formErrors.firstName && <p className="error__msg">{formErrors.firstName}</p>}
          </div>
          <div className={`reg__input__container ${formErrors.lastName ? "error" : ""}`}>
            <label>Last name</label>
            <input name="lastName" onChange={handleChange} />
            {formErrors.lastName && <p className="error__msg">{formErrors.lastName}</p>}
          </div>
          <div className={`reg__input__container ${formErrors.email ? "error" : ""}`}>
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} />
            {formErrors.email && <p className="error__msg">{formErrors.email}</p>}
          </div>
          <div className={`reg__input__container ${formErrors.password ? "error" : ""}`}>
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} />
            {formErrors.password && <p className="error__msg">{formErrors.password}</p>}
          </div>
          <div className="register__button__container">
            <button type="submit">Create Account</button>
          </div>
        </form>
        <div className="register__other__actions">
          <div>Already have an account? <Link to="/account/login">Login</Link></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
