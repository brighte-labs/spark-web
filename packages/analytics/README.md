---
title: Analytics
---

Set of unopinionated, lightweight React components for implementing analytics
tracking with composable event contexts.

## AnalyticsListener

To use Analytics please wrap your app with at least one `AnalyticsListener`,
which allows you to provide a callback for tracking events.

For example:

```jsx
// hypothetical analytics backend
import analyticsClient from './utils/analytics';

export function App({ Component, pageProps }) {
  // Here is where we handle events
  const handleAnalyticsEvent = (eventName, eventData) => {
    console.log(`Received event ${eventName}`);
    analyticsClient.sendEvent(eventName, eventData);
  };

  return (
    <AnalyticsListener onEvent={handleAnalyticsEvent}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnalyticsListener>
  );
}
```

It's possible to nest and stack multiple listeners, which will be invoked
independently whenever an event is fired, i.e.:

```jsx
<AnalyticsListener onEvent={sendToLegacyBackend}>
  <AnalyticsListener onEvent={sendToNewBackend}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AnalyticsListener>
</AnalyticsListener>
```

### Props

| Prop    | Type                                                                    | Default | Description                                               |
| ------- | ----------------------------------------------------------------------- | ------- | --------------------------------------------------------- |
| onEvent | (eventName: string, eventData: Record\<string, string\|number>) => void |         | Callback that will be invoked with fired analytics events |

## AnalyticsContext

`AnalyticsContext` allows transient, universal analytics properties that will be
automatically appended to all fired events. This is useful to reduce duplication
and automatically include global properties such as configuration or
environment.

```jsx
<AnalyticsListener onEvent={sendToAnalyticsBackend}>
  <AnalyticsContext data={{ browser: navigator, isLoggedIn }}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AnalyticsContext>
</AnalyticsListener>
```

Context can be nested to append additional data inside the component structure.

```jsx
<AnalyticsListener onEvent={sendToAnalyticsBackend}>
  <AnalyticsContext data={{ browser: navigator, isLoggedIn }}>
    <Header>
      <AnalyticsContext data={{ usingNavbar: 'main-navbar' }}>
        <Navbar id="main-navbar">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
        </Navbar>
      </AnalyticsContext>
    </Header>
    <MainContent />
    <Footer>
      <AnalyticsContext data={{ usingNavbar: 'footer-navbar' }}>
        <Navbar id="footer-navbar">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
        </Navbar>
      </AnalyticsContext>
    </Footer>
  </AnalyticsListener>
</AnalyticsListener>
```

## useAnalytics hook

`useAnalytics` provides a function to fire events from custom components.

Example usage:

```jsx
function ExpandingContainer({ children, id }) {
  const { expanded, setExpanded } = useState(false);
  const { trackEvent } = useAnalytics();

  const onClick = useCallback(() => {
    setExpanded(previousState => {
      const nextState = !previousState;
      const eventName = nextState
        ? 'container-expanded'
        : 'container-collapsed';

      trackEvent(eventName, { containerId: id });

      return nextState;
    });
  }, [id]);

  return (
    <>
      <button onClick={onClick}>
        {expanded ? 'Collapse' : 'Expand'} container
      </button>
      <Container>{expanded ? children : null}</Container>
    </>
  );
}
```
