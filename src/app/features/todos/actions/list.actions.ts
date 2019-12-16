import { createAction } from '@ngrx/store';

let tempId = 0;

export const listItemAdded = createAction(
  '[todo] list item added',
  ({ description }: { description: string }) => ({
    payload: {
      id: 'T' + tempId++,
      description,
      completed: false
    }
  })
);
