import { useContext } from 'react';

import { AnalyticsContextContext } from './AnalyticsContext';
import type {
  AnalyticsEventData,
  AnalyticsEventName } from './AnalyticsListenerContext';
import {
  AnalyticsListenerContext,
} from './AnalyticsListenerContext';

export type AnalyticsHookType = {
  trackEvent: (name: AnalyticsEventName, data?: AnalyticsEventData) => void;
};

export function useAnalytics(): AnalyticsHookType {
  const analyticsContext = useContext(AnalyticsContextContext);
  const listenerContext = useContext(AnalyticsListenerContext);
  const trackEvent = (
    name: AnalyticsEventName,
    data?: AnalyticsEventData
  ): void => {
    if (!listenerContext) return;
    listenerContext(name, { ...analyticsContext, ...data });
  };

  return {
    trackEvent,
  };
}

export default useAnalytics;
