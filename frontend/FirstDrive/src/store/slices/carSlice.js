import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carService from '../../services/carService';

// Async thunks
export const getAllCars = createAsyncThunk(
  'cars/getAll',
  async (filters, thunkAPI) => {
    try {
      return await carService.getAllCars(filters);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCarById = createAsyncThunk(
  'cars/getById',
  async (id, thunkAPI) => {
    try {
      return await carService.getCarById(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCar = createAsyncThunk(
  'cars/create',
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.createCar(carData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCar = createAsyncThunk(
  'cars/update',
  async ({ id, carData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.updateCar(id, carData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCar = createAsyncThunk(
  'cars/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.deleteCar(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveCar = createAsyncThunk(
  'cars/save',
  async (carId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.saveCar(carId, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSavedCars = createAsyncThunk(
  'cars/getSaved',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.getSavedCars(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const compareCars = createAsyncThunk(
  'cars/compare',
  async (carIds, thunkAPI) => {
    try {
      return await carService.compareCars(carIds);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveComparison = createAsyncThunk(
  'cars/saveComparison',
  async ({ carIds, name }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.saveComparison(carIds, name, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSavedComparisons = createAsyncThunk(
  'cars/getSavedComparisons',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.getSavedComparisons(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  cars: [],
  car: null,
  savedCars: [],
  savedComparisons: [],
  comparisonResults: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    clearCar: (state) => {
      state.car = null;
    },
    clearComparison: (state) => {
      state.comparisonResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Cars
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Car By Id
      .addCase(getCarById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Car
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Car
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = state.cars.map(car => 
          car._id === action.payload._id ? action.payload : car
        );
        if (state.car && state.car._id === action.payload._id) {
          state.car = action.payload;
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Car
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = state.cars.filter(car => car._id !== action.payload.id);
        if (state.car && state.car._id === action.payload.id) {
          state.car = null;
        }
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Save Car
      .addCase(saveCar.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.savedCars = action.payload.savedCars;
      })
      // Get Saved Cars
      .addCase(getSavedCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedCars = action.payload;
      })
      .addCase(getSavedCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Compare Cars
      .addCase(compareCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(compareCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comparisonResults = action.payload;
      })
      .addCase(compareCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Save Comparison
      .addCase(saveComparison.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.savedComparisons = action.payload.savedComparisons;
      })
      // Get Saved Comparisons
      .addCase(getSavedComparisons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSavedComparisons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.savedComparisons = action.payload;
      })
      .addCase(getSavedComparisons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearCar, clearComparison } = carSlice.actions;
export default carSlice.reducer; 