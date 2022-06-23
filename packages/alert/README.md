---
title: Alert
storybookPath: feedback-overlays-alert--info
isExperimentalPackage: true
---

Alert displays a short and concise message to draw a users' attention without
interrupting their current task.

## Examples

### Tones

The component offers several levels of tonal severity.

```jsx live
<Stack gap="large">
  <Alert tone="caution" heading="This is a caution alert">
    Caution message
  </Alert>
  <Alert tone="positive" heading="This is a positive alert">
    Positive message
  </Alert>
  <Alert tone="info" heading="This is an info alert">
    Info message
  </Alert>
  <Alert tone="critical" heading="This is a critical alert">
    Critical message
  </Alert>
</Stack>
```

### Closing

You can also set an `onClose` prop callback function which will render a close
icon button on the alert. The callback function will be called upon the button
being pressed.

```jsx live
const [isOpen, setIsOpen] = React.useState(true);

React.useEffect(() => {
  const timeout = setTimeout(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, 2000);

  return () => clearTimeout(timeout);
}, [isOpen]);

if (!isOpen) {
  return null;
}

return (
  <Alert
    tone="caution"
    heading="This is a caution alert"
    onClose={() => setIsOpen(false)}
  >
    Click the button on the right to dismiss this notification
  </Alert>
);
```

### Custom icons

In rare cases, you may need to provide a custom icon. To do so, we expose an
`icon` prop. You can pass it any icon from the [Icon package](/package/icon).

```jsx live
<Alert heading="This an info alert" icon={LightBulbIcon}>
  Did you know that Alert components can have custom icons?
</Alert>
```

## Props

| Prop        | Type                                            | Default       | Description                                                                                                                                                                      |
| ----------- | ----------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children    | string \| React.ReactNode                       |               | The body content of the alert.                                                                                                                                                   |
| tone        | 'caution' \| 'critical' \| 'info' \| 'positive' | 'info'        | Sets the tone of the alert.                                                                                                                                                      |
| data?       | [DataAttributeMap][data-attribute-map]          |               | Sets data attributes on the component.                                                                                                                                           |
| id?         | string                                          |               | Sets a unique indentifier on the component.                                                                                                                                      |
| onClose?    | () => void                                      |               | Sets a callback function when the alert close icon button is pressed. If the onClose function is not defined, the close icon button will not be rendered on the alert component. |
| closeLabel? | string                                          | 'Close alert' | Sets a label for the close button if the close icon button is present.                                                                                                           |
| heading     | string                                          |               | Sets a heading for the alert.                                                                                                                                                    |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
