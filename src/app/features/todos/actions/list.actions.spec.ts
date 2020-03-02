import * as actions from './list.actions';

describe('list actions', () => {
  it('can add item', () => {
    const result = actions.listItemAdded({ description: 'First item' });

    expect(result).toEqual({
      type: '[todos] list item added',
      payload: { id: result.payload.id, description: 'First item', completed: false }
    });
  });

  it('can add item successfully', () => {
    const result = actions.listItemAddedSucceeded({
      oldId: 'T0',
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    expect(result).toEqual({
      type: '[todos] list item added successfully', oldId: 'T0', payload: { id: 'T0', description: 'First item', completed: false } as any
    });
  });

  it('add item failure', () => {
    const result = actions.listItemAddedFailure({
      message: 'failed',
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    expect(result).toEqual({
      type: '[todos] list item added failure', message: 'failed', payload: { id: 'T0', description: 'First item', completed: false } as any
    });
  });

  it('can load list data', () => {
    const result = actions.loadListData();

    expect(result).toEqual({
      type: '[todos] load list data'
    });
  });

  it('can load list data succeeded successfully', () => {
    const result = actions.loadListDataSucceeded({
      payload: [{ id: 'T0', description: 'First item', completed: false } as any]
    });

    expect(result).toEqual({
      type: '[todos] load list data succeeded', payload: [{ id: 'T0', description: 'First item', completed: false } as any]
    });
  });

  it('load list data failed', () => {
    const result = actions.loadListDataFailure({ message: 'failed' });

    expect(result).toEqual({
      type: '[todos] load list data failed', message: 'failed'
    });
  });

  it('can get todo from websock', () => {
    const result = actions.gotTodoFromWebSocket({
      payload: { id: 'T0', description: 'First item', completed: false } as any
    });

    expect(result).toEqual({
      type: '[todos] got todo from websock', payload: { id: 'T0', description: 'First item', completed: false } as any
    });
  });
});
