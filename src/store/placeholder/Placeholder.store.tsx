import { createAction, createReducer, PayloadAction } from "typesafe-actions";

export const LOAD_DATA = "placeholder/LOAD_DATA";
export const LOAD_DATA_SUCCESS = "placeholder/LOAD_DATA_SUCCESS";
export const LOAD_DATA_ERROR = "placeholder/LOAD_DATA_ERROR";

type PlaceholderAction =
  | ReturnType<typeof loadData>
  | ReturnType<typeof loadDataSuccess>
  | ReturnType<typeof loadDataError>;

type PlaceholderState = {
  data?: any;
  error?: any;
};

const initialState: any = {
  data: null,
  error: false
};

const placeholder = createReducer<PlaceholderState, PlaceholderAction>(
  initialState,
  {
    [LOAD_DATA_SUCCESS]: (state: PlaceholderState, action: any) => ({
      data: action.payload.data
    }),
    [LOAD_DATA_ERROR]: (state: PlaceholderState, action: any) => ({
      error: action.payload.error
    })
  }
);

export const loadData = createAction(LOAD_DATA)();
export const loadDataSuccess = (data: any) => ({
  type: LOAD_DATA_SUCCESS,
  payload: {
    data
  }
});
export const loadDataError = (error: any) => ({
  type: LOAD_DATA_ERROR,
  payload: {
    error
  }
});
export default placeholder;
