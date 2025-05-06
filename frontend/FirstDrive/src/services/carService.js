import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

// Get all cars with optional filters
const getAllCars = async (filters = {}) => {
  const response = await axios.get(API_URL + 'cars', { params: filters });
  return response.data;
};

// Get car by ID
const getCarById = async (id) => {
  const response = await axios.get(API_URL + `cars/${id}`);
  return response.data;
};

// Create a new car (admin only)
const createCar = async (carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'cars', carData, config);
  return response.data;
};

// Update a car (admin only)
const updateCar = async (id, carData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + `cars/${id}`, carData, config);
  return response.data;
};

// Delete a car (admin only)
const deleteCar = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `cars/${id}`, config);
  return response.data;
};

// Save a car to user's saved cars
const saveCar = async (carId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + `users/saved-cars/${carId}`, {}, config);
  return response.data;
};

// Get user's saved cars
const getSavedCars = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'users/saved-cars', config);
  return response.data;
};

// Compare cars
const compareCars = async (carIds) => {
  const response = await axios.post(API_URL + 'cars/compare', { carIds });
  return response.data;
};

// Save a comparison
const saveComparison = async (carIds, name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + 'users/saved-comparisons', { cars: carIds, name }, config);
  return response.data;
};

// Get user's saved comparisons
const getSavedComparisons = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'users/saved-comparisons', config);
  return response.data;
};

const carService = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  saveCar,
  getSavedCars,
  compareCars,
  saveComparison,
  getSavedComparisons,
};

export default carService; 