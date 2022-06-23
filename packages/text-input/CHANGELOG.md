# @spark-web/text-input

## 2.0.0

### Major Changes

- [#158](https://github.com/brighte-labs/spark-web/pull/158)
  [`550b4b0`](https://github.com/brighte-labs/spark-web/commit/550b4b0509aba1f37d20fa8205ae01b2383eec5e)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Rename useInput
  to useInputStyles which now returns a tuple (boxProps and CSS object) and adds
  box shadow

### Patch Changes

- [#148](https://github.com/brighte-labs/spark-web/pull/148)
  [`ad02c82`](https://github.com/brighte-labs/spark-web/commit/ad02c8279d3813956d9372db5a69c361482b7f72)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Make Field a peer
  dep to avoid context bug

* [#154](https://github.com/brighte-labs/spark-web/pull/154)
  [`2ba486a`](https://github.com/brighte-labs/spark-web/commit/2ba486a504bd0704935aaad2b8442907dc1899ac)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Enable text
  truncation when input value is too long

- [#167](https://github.com/brighte-labs/spark-web/pull/167)
  [`4f79350`](https://github.com/brighte-labs/spark-web/commit/4f793508fdb43ddd452f0d59a3126101f9fa5459)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Update Babel

- Updated dependencies
  [[`4f79350`](https://github.com/brighte-labs/spark-web/commit/4f793508fdb43ddd452f0d59a3126101f9fa5459),
  [`f524009`](https://github.com/brighte-labs/spark-web/commit/f5240098cf731b0a2e351b7b585711e893a33736),
  [`60f7281`](https://github.com/brighte-labs/spark-web/commit/60f7281c4a194d934a2ce561cad47e737b0fb48e)]:
  - @spark-web/a11y@1.1.0
  - @spark-web/box@1.0.6
  - @spark-web/field@3.0.1
  - @spark-web/text@1.0.6
  - @spark-web/theme@3.0.2
  - @spark-web/utils@1.1.5

## 1.2.1

### Patch Changes

- Updated dependencies
  [[`3db131b`](https://github.com/brighte-labs/spark-web/commit/3db131bfadbc4149d05b7c74be1a3e68cdd5b18f)]:
  - @spark-web/field@3.0.0

## 1.2.0

### Minor Changes

- [#101](https://github.com/brighte-labs/spark-web/pull/101)
  [`08752c3`](https://github.com/brighte-labs/spark-web/commit/08752c350b53cde0657ec32f03f9932dec835e33)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Create
  InputContainer component and update focus and disabled styles

### Patch Changes

- [#105](https://github.com/brighte-labs/spark-web/pull/105)
  [`27bc235`](https://github.com/brighte-labs/spark-web/commit/27bc235168b09bf8c03710b5fcde6ea0fd70824c)
  Thanks [@nderkim](https://github.com/nderkim)! - Fix TextInput type

* [#113](https://github.com/brighte-labs/spark-web/pull/113)
  [`156236d`](https://github.com/brighte-labs/spark-web/commit/156236d2474aee66a0b8e2030635f9c08a5b78ba)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Update
  dependencies

- [#108](https://github.com/brighte-labs/spark-web/pull/108)
  [`efa263a`](https://github.com/brighte-labs/spark-web/commit/efa263aee2c33297edb19203ae1d82abd99d298d)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Refactor to work
  with updated field context

- Updated dependencies
  [[`08752c3`](https://github.com/brighte-labs/spark-web/commit/08752c350b53cde0657ec32f03f9932dec835e33),
  [`efa263a`](https://github.com/brighte-labs/spark-web/commit/efa263aee2c33297edb19203ae1d82abd99d298d),
  [`156236d`](https://github.com/brighte-labs/spark-web/commit/156236d2474aee66a0b8e2030635f9c08a5b78ba)]:
  - @spark-web/a11y@1.0.5
  - @spark-web/field@2.0.0
  - @spark-web/box@1.0.5
  - @spark-web/text@1.0.5
  - @spark-web/theme@3.0.1
  - @spark-web/utils@1.1.3

## 1.1.1

### Patch Changes

- [#94](https://github.com/brighte-labs/spark-web/pull/94)
  [`4ad9817`](https://github.com/brighte-labs/spark-web/commit/4ad9817d1f7acdecd3c8bbb3be517f5c11fe8d4b)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Fix alignment of
  icon adornments

* [#98](https://github.com/brighte-labs/spark-web/pull/98)
  [`4750af7`](https://github.com/brighte-labs/spark-web/commit/4750af73f0e3a82ebde940cb13659a21c7e88007)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Add aria-invalid
  attribute

- [#72](https://github.com/brighte-labs/spark-web/pull/72)
  [`dc53688`](https://github.com/brighte-labs/spark-web/commit/dc53688cc271316f00ef25f101e94c3891f4f75d)
  Thanks [@matildaPan](https://github.com/matildaPan)! - Add name and required
  to valid TextInput props

## 1.1.0

### Minor Changes

- [#50](https://github.com/brighte-labs/spark-web/pull/50)
  [`60372d0`](https://github.com/brighte-labs/spark-web/commit/60372d0538fe5e141c8dabc1b20c8e09d1f56c70)
  Thanks [@justinfaynhan](https://github.com/justinfaynhan)! - Added new
  currency input component. Some changes have been made to its underlying base
  textinput component to provide functionality to accomodate the adornments, in
  this case, a starting adornment currency symbol.

### Patch Changes

- [#87](https://github.com/brighte-labs/spark-web/pull/87)
  [`5744b68`](https://github.com/brighte-labs/spark-web/commit/5744b6820f626b93a14e11e1fbd96bcbe1b12b27)
  Thanks [@ChristopherMitchell242](https://github.com/ChristopherMitchell242)! -
  Data attribute added to component props to allow consumers to attach
  customattributes to components

* [#52](https://github.com/brighte-labs/spark-web/pull/52)
  [`82ab744`](https://github.com/brighte-labs/spark-web/commit/82ab744f198466810f3386bc459b8ab4d57c820e)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Add files array
  to package.json files

* Updated dependencies
  [[`60372d0`](https://github.com/brighte-labs/spark-web/commit/60372d0538fe5e141c8dabc1b20c8e09d1f56c70),
  [`1ef4f82`](https://github.com/brighte-labs/spark-web/commit/1ef4f82df999c487b79cd216c17ca5735e444fc5),
  [`182a53a`](https://github.com/brighte-labs/spark-web/commit/182a53a484892df48754e89dd714459a7f69fcff),
  [`5744b68`](https://github.com/brighte-labs/spark-web/commit/5744b6820f626b93a14e11e1fbd96bcbe1b12b27),
  [`82ab744`](https://github.com/brighte-labs/spark-web/commit/82ab744f198466810f3386bc459b8ab4d57c820e),
  [`df618d9`](https://github.com/brighte-labs/spark-web/commit/df618d92d534e06f06ecedc95ea6bdd51cdc906b)]:
  - @spark-web/field@1.1.0
  - @spark-web/text@1.0.4
  - @spark-web/theme@3.0.0
  - @spark-web/a11y@1.0.4
  - @spark-web/box@1.0.4
  - @spark-web/utils@1.1.2

## 1.0.3

### Patch Changes

- [#42](https://github.com/brighte-labs/spark-web/pull/42)
  [`435779a`](https://github.com/brighte-labs/spark-web/commit/435779aa42bd635bbf43e1fd41724c666402caa2)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Prevent multiple
  versions of React

- Updated dependencies
  [[`435779a`](https://github.com/brighte-labs/spark-web/commit/435779aa42bd635bbf43e1fd41724c666402caa2)]:
  - @spark-web/a11y@1.0.3
  - @spark-web/box@1.0.3
  - @spark-web/field@1.0.3
  - @spark-web/text@1.0.3
  - @spark-web/theme@2.0.2
  - @spark-web/utils@1.1.1

## 1.0.2

### Patch Changes

- [#40](https://github.com/brighte-labs/spark-web/pull/40)
  [`062c8ab`](https://github.com/brighte-labs/spark-web/commit/062c8ab8c7b4120f8d14c269b5f7801288c678ca)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Add
  @babel/transform-runtime

- Updated dependencies
  [[`062c8ab`](https://github.com/brighte-labs/spark-web/commit/062c8ab8c7b4120f8d14c269b5f7801288c678ca)]:
  - @spark-web/a11y@1.0.2
  - @spark-web/box@1.0.2
  - @spark-web/field@1.0.2
  - @spark-web/text@1.0.2
  - @spark-web/theme@2.0.1
  - @spark-web/utils@1.0.2

## 1.0.1

### Patch Changes

- [#36](https://github.com/brighte-labs/spark-web/pull/36)
  [`8546f8f`](https://github.com/brighte-labs/spark-web/commit/8546f8f05daaa79ea3ff954c6c4928a7a2d0622d)
  Thanks [@lukebennett88](https://github.com/lukebennett88)! - Update Babel
  config

- Updated dependencies
  [[`aebff30`](https://github.com/brighte-labs/spark-web/commit/aebff30c86cb0a9db22b545c46159ce0d1c14afb),
  [`8546f8f`](https://github.com/brighte-labs/spark-web/commit/8546f8f05daaa79ea3ff954c6c4928a7a2d0622d)]:
  - @spark-web/theme@2.0.0
  - @spark-web/a11y@1.0.1
  - @spark-web/box@1.0.1
  - @spark-web/field@1.0.1
  - @spark-web/text@1.0.1
  - @spark-web/utils@1.0.1

## 1.0.0

### Major Changes

- [#27](https://github.com/brighte-labs/spark-web/pull/27)
  [`4c8e398`](https://github.com/brighte-labs/spark-web/commit/4c8e3988f8a59d3dab60a6b67b1128b6ff2a5f2c)
  Thanks [@JedWatson](https://github.com/JedWatson)! - Initial Version

### Patch Changes

- Updated dependencies
  [[`4c8e398`](https://github.com/brighte-labs/spark-web/commit/4c8e3988f8a59d3dab60a6b67b1128b6ff2a5f2c)]:
  - @spark-web/a11y@1.0.0
  - @spark-web/box@1.0.0
  - @spark-web/field@1.0.0
  - @spark-web/text@1.0.0
  - @spark-web/theme@1.0.0
  - @spark-web/utils@1.0.0
