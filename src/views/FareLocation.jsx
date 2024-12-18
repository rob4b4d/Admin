import React, { useState, useEffect, Fragment } from 'react';
import axiosClient from '../axios-client'; // Your axios setup
import Loader from '../app/Loader.jsx/Loader.jsx'; // Ensure the path to Loader is correct

const FareLocationComponent = () => {
  const [fareLocations, setFareLocations] = useState([]);
  const [fareLocationForm, setFareLocationForm] = useState({
    fare_location: '',
    regular_price: '',
    discounted_price: '',
    fare_id: '', // This will hold the fare_id
  });
  const [editingFareLocation, setEditingFareLocation] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // To capture error messages

  const fareNames = {
    1: "Asingan",
    2: "Sta Maria",
    3: "Urdaneta",
    4: "Dagupan",
    // Add more mappings as needed
  };

  useEffect(() => {
    fetchFareLocations();
  }, []);

  const fetchFareLocations = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await axiosClient.get('/fare-locations');
      setFareLocations(response.data);
    } catch (error) {
      console.error('Error fetching fare locations:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingFareLocation) {
        const response = await axiosClient.put(
          `/fare-locations/${editingFareLocation.id}`,
          fareLocationForm
        );
        setFareLocations(fareLocations.map((location) =>
          location.id === response.data.id ? response.data : location
        ));
      } else {
        const response = await axiosClient.post('/fare-locations', fareLocationForm);
        setFareLocations([...fareLocations, response.data]);
      }
      setFareLocationForm({
        fare_location: '',
        regular_price: '',
        discounted_price: '',
        fare_id: '',
      });
      setEditingFareLocation(null);
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        console.error('Error submitting fare location:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/fare-locations/${id}`);
      setFareLocations(fareLocations.filter((location) => location.id !== id));
    } catch (error) {
      console.error('Error deleting fare location:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFareLocationForm({
      ...fareLocationForm,
      [name]: value,
    });
  };

  const handleFareIdChange = (e) => {
    const selectedFareId = e.target.value;
    setFareLocationForm({
      ...fareLocationForm,
      fare_id: selectedFareId,
    });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="fare-container">
            <div className="fare-main">
              <h1 className="fare-title">Fare Management</h1>

              <div className="fare-card">
                <h2>{editingFareLocation ? 'Edit Fare Location' : 'Create Fare Location'}</h2>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="fare-form">
                  <input
                    className="fare-input"
                    type="text"
                    name="fare_location"
                    value={fareLocationForm.fare_location}
                    onChange={handleChange}
                    placeholder="Fare Location"
                  />
                  <input
                    className="fare-input"
                    type="number"
                    name="regular_price"
                    value={fareLocationForm.regular_price}
                    onChange={handleChange}
                    placeholder="Regular Price"
                  />
                  <input
                    className="fare-input"
                    type="number"
                    name="discounted_price"
                    value={fareLocationForm.discounted_price}
                    onChange={handleChange}
                    placeholder="Discounted Price"
                  />
                  <select
                    className="fare-input"
                    name="fare_id"
                    value={fareLocationForm.fare_id}
                    onChange={handleFareIdChange}
                  >
                    <option value="">Select Fare</option>
                    {Object.keys(fareNames).map((id) => (
                      <option key={id} value={id}>
                        {fareNames[id]}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="fare-button">
                    {editingFareLocation ? 'Update' : 'Create'}
                  </button>
                </form>
              </div>

              <h2>Existing Fare Locations</h2>
              {fareLocations.length === 0 ? (
                <div className="fare-no-data">No fare locations available</div>
              ) : (
                <ul className="fare-list">
                  {fareLocations.map((location) => (
                    <li key={location.id} className="fare-list-item">
                      <div className="fare-card">
                        <div>
                          <strong>{location.fare_location}</strong>
                          <p>Regular Price: {location.regular_price}</p>
                          <p>Discounted Price: {location.discounted_price}</p>
                          <p>Fare Name: {fareNames[location.fare_id] || "Unknown"}</p>
                        </div>
                        <div className="fare-card-buttons">
                          <button
                            className="fare-button-edit"
                            onClick={() => {
                              setEditingFareLocation(location);
                              setFareLocationForm({
                                fare_location: location.fare_location,
                                regular_price: location.regular_price,
                                discounted_price: location.discounted_price,
                                fare_id: location.fare_id,
                              });
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="fare-button-delete"
                            onClick={() => handleDelete(location.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FareLocationComponent;
