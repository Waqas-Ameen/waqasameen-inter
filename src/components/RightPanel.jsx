import { useState } from 'react';
import InputField from './InputField';
import SocialLogin from './SocialLogin';
import Logo from './Logo';

const RightPanel = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Signup Successful!');
    }
  };

  return (
    <div className="right-panel">
      <div className="signup-card">
        <div className="logo-container">
          <Logo />
        </div>

        <h2 className="form-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <InputField 
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          <InputField 
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <InputField 
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <div className="password-hint">
            <span className="bullet-icon"></span>
            Must be at least 6 characters.
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="signin-prompt">
          Already have an account? <span className="signin-link">Sign In</span>
        </div>

        <div className="social-section">
          <p>You can also signin with</p>
          <div className="social-login-container">
             <SocialLogin provider="google" />
             <SocialLogin provider="linkedin" />
             <SocialLogin provider="apple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
