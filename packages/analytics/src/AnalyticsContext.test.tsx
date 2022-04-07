import { cleanup, render } from '@testing-library/react';
import { useEffect } from 'react';

import {
  AnalyticsContext,
  AnalyticsEventData,
  AnalyticsListener,
  useAnalytics,
} from '.';

const FiringComponent = ({ data }: { data?: AnalyticsEventData }) => {
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    trackEvent('component-mounted', data);
  }, []);

  return null;
};

describe('AnalyticsContext', () => {
  afterEach(cleanup);

  it('should have merged data from contexts in hierarchical order', () => {
    const onEvent = jest.fn();
    const data = { foo: 1 };
    render(
      <AnalyticsListener onEvent={onEvent}>
        <AnalyticsContext data={{ bar: '2' }}>
          <AnalyticsContext data={{ bar: '3' }}>
            <AnalyticsContext data={{ baz: '4' }}>
              <FiringComponent data={data} />
            </AnalyticsContext>
          </AnalyticsContext>
        </AnalyticsContext>
      </AnalyticsListener>
    );

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenLastCalledWith('component-mounted', {
      foo: 1,
      bar: '3',
      baz: '4',
    });
  });

  it('should work with context, but no data provided', () => {
    const onEvent = jest.fn();
    render(
      <AnalyticsListener onEvent={onEvent}>
        <AnalyticsContext data={{ bar: '2' }}>
          <FiringComponent />
        </AnalyticsContext>
      </AnalyticsListener>
    );

    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent).toHaveBeenLastCalledWith('component-mounted', { bar: '2' });
  });
});
