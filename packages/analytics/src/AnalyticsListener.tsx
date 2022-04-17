import type { ReactNode } from 'react';
import { useContext } from 'react';

import type {
  AnalyticsEventData,
  AnalyticsEventHandler,
  AnalyticsEventName,
} from './AnalyticsListenerContext';
import { AnalyticsListenerContext } from './AnalyticsListenerContext';

export type AnalyticsListenerProps = {
  children: ReactNode;
  onEvent: AnalyticsEventHandler;
};

export function AnalyticsListener({
  children,
  onEvent,
}: AnalyticsListenerProps): JSX.Element {
  const parentContext = useContext<AnalyticsEventHandler>(
    AnalyticsListenerContext
  );
  const handleEvent = (
    eventName: AnalyticsEventName,
    eventData: AnalyticsEventData
  ): void => {
    onEvent(eventName, eventData);

    // Bubble up the event to another listener up in the tree
    if (parentContext) parentContext(eventName, eventData);
  };

  return (
    <AnalyticsListenerContext.Provider value={handleEvent}>
      {children}
    </AnalyticsListenerContext.Provider>
  );
}
