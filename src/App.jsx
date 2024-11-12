import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const requestGoogle = (token) => {
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
    .then((response) => response.json())
    .then((data) => {
      setIsLoggedIn(true);
      setUserInfo({
        email: data.email,
        name: data.name,
        picture: data.picture,
      });
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
  };

  useEffect(()=> {
    const token_local = localStorage.getItem("userToken");
    if (token_local){ requestGoogle(token_local)}
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      requestGoogle(token);
      localStorage.setItem('userToken', token);
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      {isLoggedIn && userInfo ? (
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <img
            src={userInfo.picture}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
          />
          <h1 className="text-xl font-semibold text-gray-700">
            Hoş geldiniz, <span className="text-blue-500">{userInfo.name}</span>!
          </h1>
          <p className="text-gray-600 mt-2">{userInfo.email}</p>
        </div>
      ) : (
        <button
          onClick={login}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Google ile giriş yap
        </button>
      )}
    </div>
  );
}

export default App;