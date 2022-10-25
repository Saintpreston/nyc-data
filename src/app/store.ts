import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cityDataReducer from '../features/cityData/cityDataSlice';
import mapReducer from '../features/map/mapSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cityData: cityDataReducer,
    map: mapReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
