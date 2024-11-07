import { Action, createReducer, on } from '@ngrx/store';
//import { CounterActions, INCREMENT, IncrementAction } from './counter.actions';
import { decrement, increment, set } from './counter.actions';

const initailState = 0;
export const counterReducer = createReducer(
  initailState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);

// export function counterReducer(
//   state = initailState,
//   action: CounterActions | Action
// ) {
//   //create your own reducer.
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
