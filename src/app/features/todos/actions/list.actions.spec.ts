import * as actions from './list.actions';

describe('list actions', () => {
  it('can add item', () => {
    const result = actions.listItemAdded({ description: 'First item' });

    expect(result).toEqual({
      type: '[todos] list item added',
      payload: { id: 'T0', description: 'First item', completed: false }
    });
  });
});
