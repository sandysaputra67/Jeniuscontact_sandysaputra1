// @flow
type SplashScreenStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: SplashScreenStateType = {};

export const ACTION = 'SplashScreenState/ACTION';

export function actionCreator(): ActionType {
  return {
    type: ACTION,
  };
}

export default function SplashScreenStateReducer(state: SplashScreenStateType = initialState, action: ActionType): SplashScreenStateType {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
