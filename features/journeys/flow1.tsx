import {Machine} from 'xstate';

export const routeMachine = Machine({
  id: 'route',
  initial: 'Screen1',
  states: {
    Screen1: {
      on: {NEXT: 'Screen2'},
    },
    Screen2: {
      on: {NEXT: 'Screen3'},
    },
    Screen3: {
      on: {NEXT: 'Screen1'},
    },
  },
});
