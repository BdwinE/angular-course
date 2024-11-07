import { Action, createAction, props } from '@ngrx/store';

const increment = createAction(
  '[Counter] Increment',
  props<{ value: number }>()
);
const decrement = createAction(
  '[Counter] Decrement',
  props<{ value: number }>()
);

export const init = createAction('[Counter] Init');
export const set = createAction('[Counter] Set', props<{ value: number }>());

export { increment, decrement };

//  export const INCREMENT = '[Counter] Increment';
// export class IncrementAction implements Action {
//   //create your own action
//   readonly type: string = INCREMENT;
//   constructor(public value: number) {}
// }

// export type CounterActions = IncrementAction;
