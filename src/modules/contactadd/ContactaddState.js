// @flow
type ContactaddStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: ContactaddStateType = {
  firstName: '',
  lastName: '',
  age: '',
  photo: '',
  loading: false,
  editMode: false,
  errors: {
    firstName: false,
    lastName: false,
    age: false,
    submit: '',
  }
};

export const ACTION_SET_FIRST_NAME = 'ContactaddState/ACTION_SET_FIRST_NAME';
export const ACTION_SET_LAST_NAME = 'ContactaddState/ACTION_SET_LAST_NAME';
export const ACTION_SET_AGE = 'ContactaddState/ACTION_SET_AGE';
export const ACTION_SET_ERRORS = 'ContactaddState/ACTION_SET_ERRORS';
export const ACTION_SET_LOADING = 'ContactaddState/ACTION_SET_LOADING';
export const ACTION_RESET_CONTACT = 'ContactaddState/ACTION_RESET_CONTACT';
export const ACTION_LOAD_CONTACT = 'ContactaddState/ACTION_LOAD_CONTACT';
export const ACTION_EDIT_CONTACT = 'ContactaddState/ACTION_EDIT_CONTACT';

export function setContactFirstName(payload): ActionType {
  return {
    type: ACTION_SET_FIRST_NAME,
    payload,
  };
}

export function setContactLastName(payload): ActionType {
  return {
    type: ACTION_SET_LAST_NAME,
    payload,
  };
}

export function setContactAge(payload): ActionType {
  return {
    type: ACTION_SET_AGE,
    payload,
  };
}

export function setContactErrors(payload): ActionType {
  return {
    type: ACTION_SET_ERRORS,
    payload,
  };
}

export function setContactLoading(payload): ActionType {
  return {
    type: ACTION_SET_LOADING,
    payload,
  };
}

export function resetContactAdd(): ActionType {
  return {
    type: ACTION_RESET_CONTACT,
  };
}

export function loadContactAdd(payload): ActionType {
  return {
    type: ACTION_LOAD_CONTACT,
    payload,
  };
}

export function setEditMode(payload): ActionType {
  return {
    type: ACTION_EDIT_CONTACT,
    payload,
  };
}

export default function ContactaddStateReducer(
  state: ContactaddStateType = initialState,
  action: ActionType,
): ContactaddStateType {
  switch (action.type) {
    case ACTION_SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload,
      };
    case ACTION_SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload,
      };
    case ACTION_SET_AGE:
      return {
        ...state,
        age: action.payload,
      };
    case ACTION_SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTION_EDIT_CONTACT:
      return {
        ...state,
        editMode: action.payload,
      };
    case ACTION_SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case ACTION_LOAD_CONTACT:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_RESET_CONTACT:
      return initialState;
    default:
      return state;
  }
}
