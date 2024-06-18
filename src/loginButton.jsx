import React from 'react';

function LoginButton() {
  return (
    <button
      className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
      onClick={() => window.login()}
    >
      Login with Spotify
    </button>
  );
}

export default LoginButton;
