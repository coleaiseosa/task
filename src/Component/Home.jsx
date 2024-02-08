import { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [userExist, setUserExist] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email) {
        const generatedPassword = "securepassword";
        const response = await fetch("http://api.qinsx.de/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: generatedPassword,
          }),
        });

        if (response.ok) {
          navigate("/insurance", { state: { email, generatedPassword } });
        } else {
          console.error("API error:", response.status);

          if (response.status === 409) {
            setUserExist(true);
          } else {
            setUserExist(false);
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleLogin = async () => {
    const auth = "Basic " + btoa(`${email}:${password}`);
    try {
      const response = await fetch("http://api.qinsx.de/insurance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });
      if (response.ok) {
        navigate("/insurance", { state: { email, password } });
      } else {
        alert("Username or Password is invalid");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="contact-form">
        <h1 className="home-title">QInsX</h1>
        <form>
          <div>
            <input
              onChange={handleChange}
              type="email"
              placeholder="anna@gmail.com"
              required
              className="email"
              autoComplete="off"
            />
          </div>

          {userExist && (
            <div>
              <input
                onChange={handlePassword}
                type="password"
                placeholder="****"
                required
                className="password"
                autoComplete="off"
              />
            </div>
          )}

          <div>
            {userExist ? (
              <button onClick={handleLogin} type="button" className="submit">
                Log in
              </button>
            ) : (
              <button onClick={handleSubmit} type="button" className="submit">
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
