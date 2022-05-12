---
title: Link
storybookPath: navigation-link--default
---

Link is used for taking users to destinations, or moving from one page to
another.

In cases where you'd like a button styled like a Link, see
[`ButtonLink`](/package/button#buttonlink).

## Props

| Prop  | Type                                   | Default | Description                                                            |
| ----- | -------------------------------------- | ------- | ---------------------------------------------------------------------- |
| href  | string                                 |         | URL to be used for the link (passed to the underlying anchor element). |
| data? | [DataAttributeMap][data-attribute-map] |         | Sets data attributes on the component.                                 |

[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1

The `Link` component also accepts HTML `a` anchor props and are not listed here.
