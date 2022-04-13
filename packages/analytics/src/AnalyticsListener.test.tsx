import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useEffect } from 'react';

import type { AnalyticsEventData } from '.';
import { AnalyticsListener, useAnalytics } from '.';

const FiringButton = ({ data }: { data?: AnalyticsEventData }) => {
  const { trackEvent } = useAnalytics();
  return (
    <button onClick={() => trackEvent('button-clicked', data)}>
      firing button
    </button>
  );
};

const FiringComponent = ({ data }: { data?: AnalyticsEventData }) => {
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    trackEvent('component-mounted', data);
  }, []);

  return null;
};

describe('AnalyticsListener', () => {
  afterEach(cleanup);

  it('should fire onEvent after triggered in useEffect() from nested component', () => {
    const onEvent = jest.fn();
    const data = { foo: 1, bar: 'baz' };
    render(
      <AnalyticsListener onEvent={onEvent}>
        <FiringComponent data={data} />
      </AnalyticsListener>
    );

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenLastCalledWith('component-mounted', data);
  });

  it('should fire onEvent after triggered from DOM event', () => {
    const onEvent = jest.fn();
    const data = { foo: 1, bar: 'baz' };
    render(
      <AnalyticsListener onEvent={onEvent}>
        <FiringButton data={data} />
      </AnalyticsListener>
    );
    fireEvent.click(screen.getAllByText('firing button')[0]);

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenLastCalledWith('button-clicked', data);
  });

  it('should bubble and fire all nested listeners', () => {
    const onEvent1 = jest.fn();
    const onEvent2 = jest.fn();
    const onEvent3 = jest.fn();
    const data = { foo: 1, bar: 'baz' };

    render(
      <AnalyticsListener onEvent={onEvent1}>
        <AnalyticsListener onEvent={onEvent2}>
          <AnalyticsListener onEvent={onEvent3}>
            <FiringComponent data={data} />
          </AnalyticsListener>
        </AnalyticsListener>
      </AnalyticsListener>
    );

    expect(onEvent1).toHaveBeenCalledTimes(1);
    expect(onEvent1).toHaveBeenLastCalledWith('component-mounted', data);
    expect(onEvent2).toHaveBeenCalledTimes(1);
    expect(onEvent2).toHaveBeenLastCalledWith('component-mounted', data);
    expect(onEvent3).toHaveBeenCalledTimes(1);
    expect(onEvent3).toHaveBeenLastCalledWith('component-mounted', data);
  });

  it('should work with no data and no context provided', () => {
    const onEvent = jest.fn();
    render(
      <AnalyticsListener onEvent={onEvent}>
        <FiringComponent />
      </AnalyticsListener>
    );

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenLastCalledWith('component-mounted', {});
  });
});
