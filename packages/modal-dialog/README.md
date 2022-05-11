---
title: Modal Dialog
storybookPath: feedback-overlays-content-dialog--default
---

## Content Dialog

Content dialog is a window overlaid on either the primary window or another
dialog window, rendering the content inside.

### Examples

#### Controlled example

```jsx live
// import { useDisclosure } from '@spark-web/utils';

const { isOpen, onOpen, onToggle } = useDisclosure();

return (
  <>
    <Button onClick={onOpen}>Open dialog</Button>
    <ContentDialog
      title="Title"
      description="Controlled example"
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <Text>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
        optio molestiae dolorem qui omnis reiciendis dignissimos numquam
        aperiam, rem natus, totam, repudiandae cum voluptatibus quos? Dicta,
        odio! Accusantium, reiciendis quidem.
      </Text>
    </ContentDialog>
  </>
);
```

#### Uncontrolled example

```jsx live
<ContentDialog
  title="Title"
  description="Uncontrolled example"
  trigger={<Button>Open dialog</Button>}
>
  <Text>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur optio
    molestiae dolorem qui omnis reiciendis dignissimos numquam aperiam, rem
    natus, totam, repudiandae cum voluptatibus quos? Dicta, odio! Accusantium,
    reiciendis quidem.
  </Text>
</ContentDialog>
```

#### Overflow

The content dialog will fill the available vertical space. When this happens the
"body" section will become scrollable.

```jsx live
<ContentDialog
  title="Title"
  description="Overflow example"
  trigger={<Button>Open dialog</Button>}
>
  <Stack gap="large">
    <Text>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis
      molestiae neque sint odit similique eaque, id sapiente ipsam ut tenetur
      impedit facere aliquid exercitationem architecto voluptate obcaecati dicta
      mollitia quod?
    </Text>
    <Text>
      Fugit aut autem molestias expedita similique aspernatur saepe nobis
      inventore illo maiores? Unde perspiciatis corporis voluptatum aut veniam
      voluptatibus culpa, perferendis fuga quos quae officia iste minus ducimus.
      Eius, impedit.
    </Text>
    <Text>
      Fugit libero quas veniam unde reiciendis beatae reprehenderit nobis ab
      debitis sapiente tempora voluptatem et, earum deserunt voluptate sunt modi
      accusantium totam in doloribus. Repellendus officiis nostrum facere neque
      amet.
    </Text>
    <Text>
      Labore repudiandae, ullam eveniet deserunt quaerat iste dignissimos
      assumenda voluptate ducimus veniam cum? Rerum dicta quo alias impedit
      possimus molestiae, facilis fuga sequi! Eius, officiis expedita explicabo
      odio amet possimus!
    </Text>
    <Text>
      Accusamus, explicabo corporis, harum id saepe neque doloremque, adipisci
      sapiente magnam est quisquam incidunt nisi ducimus mollitia quasi voluptas
      iure veritatis quo repellendus modi quae ab doloribus nam. Repellendus,
      velit!
    </Text>
    <Text>
      Laboriosam dicta amet quos aspernatur error, alias distinctio itaque
      libero molestias nulla hic nemo quaerat vero atque beatae nobis dolorem
      recusandae quas at in, impedit reiciendis? Animi sint aspernatur illo!
    </Text>
    <Text>
      Sit ex at placeat odit tenetur delectus voluptatibus omnis consequuntur
      cum quidem velit aspernatur sequi asperiores minima mollitia excepturi
      nemo, repellat sed vel magnam accusantium exercitationem obcaecati harum
      id? Dolorum?
    </Text>
    <Text>
      Excepturi fugiat recusandae dicta, ut, sequi omnis magni necessitatibus
      voluptatem eius impedit cupiditate hic nemo nisi! Harum et, cum
      voluptatibus quaerat dolorum vel quis aperiam soluta, labore neque ipsa
      ab?
    </Text>
    <Text>
      Rerum dolor aliquid ad delectus magni ipsum modi aspernatur pariatur odit
      ipsa expedita doloribus itaque numquam sed quisquam, recusandae possimus
      tenetur, voluptates, aut distinctio! Quisquam aliquam cupiditate
      aspernatur quae quo?
    </Text>
    <Text>
      Similique perferendis dolorum recusandae sequi consequuntur commodi harum
      quos. Mollitia soluta accusantium, hic aperiam corporis magni ducimus sint
      laudantium. Est omnis odit cumque fuga enim totam quam. Nihil, veniam
      atque!
    </Text>
    <Text>
      Laboriosam velit totam non et incidunt ipsum, tempora, aspernatur culpa
      fuga voluptate exercitationem porro accusantium distinctio id! Dolorem,
      quos. Eveniet ullam dolore quas vero fugit. Repellat ea laudantium
      deleniti esse.
    </Text>
    <Text>
      Accusantium fugit commodi totam harum ipsa quo sunt, similique
      reprehenderit sit ratione. Distinctio accusantium aut, quibusdam itaque
      praesentium nemo aspernatur temporibus beatae suscipit autem, doloremque
      ad assumenda, dignissimos molestias esse?
    </Text>
    <Text>
      Recusandae, accusantium maiores. Blanditiis, ipsam voluptas aspernatur
      quisquam deserunt fugiat ratione dicta, aut quae libero rerum? Aspernatur
      rem repellendus quo eaque, voluptates ipsum iusto aut, provident veniam
      consequatur ullam maiores?
    </Text>
    <Text>
      Incidunt maiores odit doloribus, molestiae sequi corrupti dolore illum
      accusamus quo blanditiis fugiat aut illo eligendi soluta voluptatibus
      officiis dolores reiciendis esse cumque sunt magni tenetur. Porro aliquid
      illum ab?
    </Text>
    <Text>
      Consequatur qui ducimus omnis assumenda pariatur quo repellat dolore
      perspiciatis, temporibus error quibusdam vitae porro deleniti voluptates
      molestias sed aliquam quasi blanditiis hic nulla, quae excepturi
      necessitatibus vero ex. Porro?
    </Text>
    <Text>
      Iste harum quibusdam reiciendis itaque perspiciatis vel fugit! Adipisci
      dolorem quam impedit consequatur natus molestias laudantium suscipit
      inventore sapiente eligendi ipsa, vitae labore esse eos quis corporis
      nulla? Quisquam, ipsam.
    </Text>
    <Text>
      Laudantium dolor repudiandae repellat. Unde consectetur, totam, velit vel,
      nam nemo debitis sit officiis fugit consequatur numquam esse recusandae?
      Voluptatibus atque assumenda vel quae quis veniam ducimus unde aliquid
      fugit?
    </Text>
    <Text>
      Aut distinctio atque blanditiis modi nemo, tempore ex rerum temporibus
      minus eum pariatur earum eligendi excepturi libero. Et, eos ipsum,
      deleniti doloremque consectetur, fugiat est exercitationem quidem odit
      minus hic.
    </Text>
    <Text>
      Laudantium id dolores earum pariatur eius repellendus incidunt accusantium
      perferendis obcaecati maxime ullam architecto commodi, blanditiis dolorem!
      Est ea, neque sint, voluptate, ipsam aliquam dolorem inventore quisquam
      aspernatur debitis eligendi?
    </Text>
    <Text>
      Illo nobis quia saepe ea dolorum quaerat fugit incidunt minima aliquid
      optio, corporis, culpa, sint voluptates. Vitae perspiciatis totam, dolorum
      beatae voluptate vero, maiores, natus at qui consequuntur officiis
      repellat.
    </Text>
  </Stack>
</ContentDialog>
```

### Props

| Prop         | Type                                                | Default | Description                                                                                       |
| ------------ | --------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| children     | React.ReactNode                                     |         | Children elements to be rendered as content inside the modal.                                     |
| size?        | keyof [BrighteTheme][brighte-theme]['contentWidth'] |         | Sets the width of the modal.                                                                      |
| title        | string                                              |         | Sets the title of the modal.                                                                      |
| description? | string                                              |         | Sets a description for the modal.                                                                 |
| isOpen       | boolean                                             |         | Sets whether the modal should be open or not. Used only for controlled modal dialogs.             |
| onToggle     | () => void                                          |         | Callback function called upon modal dialog being toggled. Used only for controlled modal dialogs. |
| trigger      | React.ReactNode                                     |         | Component that toggles the modal. Used by uncontrolled modal dialogs.                             |
| data?        | [DataAttributeMap][data-attribute-map]              |         | Sets data attributes on the component.                                                            |

## DialogCloseButton

Alternate method of closing the ContentDialog. Useful when you need to dismiss
the modal instead of continuing completing the primary action.

### Props

The `DialogCloseButton` accepts native HTML `button` props and are not listed
here.

[brighte-theme]:
  https://github.com/brighte-labs/spark-web/blob/e503bea4f7668d187ec7a78f99c5ed374417588b/packages/theme/src/makeTheme.ts#L158
[data-attribute-map]:
  https://github.com/brighte-labs/spark-web/blob/e7f6f4285b4cfd876312cc89fbdd094039aa239a/packages/utils/src/internal/buildDataAttributes.ts#L1
