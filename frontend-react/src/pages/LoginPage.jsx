import React from 'react';

function LoginPage() {
  return (
    <div className="container mt-5 pt-5">
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Username" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
