import { useEffect, useState } from "react";
import "./Insurance.css";
import { useLocation } from "react-router-dom";

const Insurance = () => {
  const [insurance, setInsurance] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  console.log(location.state);

  const password = location.state.password || location.state.generatedPassword;
  const auth = "Basic " + btoa(`${location.state.email}:${password}`);

  const fetchInsurance = async () => {
    try {
      const response = await fetch("http://api.qinsx.de/insurance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch insurance: ${response.status}`);
      }

      const insuranceVariable = await response.json();
      setInsurance(insuranceVariable);
    } catch (error) {
      console.error("Error fetching insurance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsurance();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Insurance</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {insurance.map((item) => (
            <li className="insurance" key={item.id}>
              {item.insurance_number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Insurance;
