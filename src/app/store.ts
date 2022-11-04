import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cityDataReducer from '../features/cityData/cityDataSlice';
import mapReducer from '../features/map/mapSlice';
import themeReducer from "../features/navigation/themeSlice"
import routeReducer from "../features/navigation/routeSlice"

export const store = configureStore({
  reducer: {
    cityData: cityDataReducer,
    map: mapReducer,
    theme: themeReducer,
    route: routeReducer
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
