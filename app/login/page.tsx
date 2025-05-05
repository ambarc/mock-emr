'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-left">
          <div className="resource-center">
            <h2>RESOURCE CENTER</h2>
            <h1>Welcome to oneEMR</h1>
            <p>
              oneEMR is a cloud-based electronic medical record (EMR) system designed to streamline healthcare operations and improve patient care.
            </p>
          </div>
          <Image
            src="/doctors.jpg"
            alt="Healthcare professionals"
            width={800}
            height={600}
            className="login-image"
            priority
          />
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-logo">
              <h1>oneEMR</h1>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                  />
                  <button type="button" className="password-toggle">
                    <i className="fa fa-eye"></i>
                  </button>
                </div>
              </div>
              <div className="forgot-password-container">
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="login-button">Log In</button>
            </form>
            <div className="login-footer">
              <p>
                Your access and use of applications with this account is subject 
                to the Terms of Use and Privacy Policy applicable to and found 
                within those applications.
              </p>
              <div className="footer-links">
                <a href="#">Configure Browser</a>
                <a href="#">Introduce Us to a Colleague</a>
              </div>
              <div className="copyright">
                © 2025 oneEMR, Inc
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 