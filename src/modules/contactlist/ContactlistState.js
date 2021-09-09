// @flow
type ContactlistStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: ContactlistStateType = {
  loading: true,
  error: false,
  data: [],
};

export const ACTION_SET_LOADING = 'ContactlistState/ACTION_SET_LOADING';
export const ACTION_SET_DATA = 'ContactlistState/ACTION_SET_DATA';
export const ACTION_SET_ERROR = 'ContactlistState/ACTION_SET_ERROR';

export function setLoading(payload): ActionType {
  return {
    type: ACTION_SET_LOADING,
    payload,
  };
}

export function setData(payload): ActionType {
  return {
    type: ACTION_SET_DATA,
    payload,
  };
}

export function setError(payload): ActionType {
  return {
    type: ACTION_SET_ERROR,
    payload,
  };
}

export default function ContactlistStateReducer(state: ContactlistStateType = initialState, action: ActionType): ContactlistStateType {
  switch (action.type) {
    case ACTION_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
