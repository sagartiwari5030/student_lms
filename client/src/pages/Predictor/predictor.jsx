import React, { useState } from "react";
import axios from "axios";

const PredictorPage = () => {
  const [formData, setFormData] = useState({
    rank: "",
    category: "OPEN",
    gender: "Gender-Neutral",
    quota: "AI",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://student-lms-hrm4.onrender.com/api/predict", formData);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <h1>College Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rank:</label>
          <input
            type="number"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="OPEN">OPEN</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Gender-Neutral">Gender-Neutral</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Quota:</label>
          <select name="quota" value={formData.quota} onChange={handleChange}>
            <option value="AI">All India</option>
            <option value="HS">Home State</option>
          </select>
        </div>
        <button type="submit">Predict</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div>
          <h2>Results:</h2>
          <table>
            <thead>
              <tr>
                <th>Institute</th>
                <th>Program</th>
                <th>Quota</th>
                <th>Seat Type</th>
                <th>Gender</th>
                <th>Opening Rank</th>
                <th>Closing Rank</th>
              </tr>
            </thead>
            <tbody>
              {results.map((college, index) => (
                <tr key={index}>
                  <td>{college.institute}</td>
                  <td>{college.program}</td>
                  <td>{college.quota}</td>
                  <td>{college.seat_type}</td>
                  <td>{college.gender}</td>
                  <td>{college.opening_rank}</td>
                  <td>{college.closing_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PredictorPage;
