import { useFieldContext } from '@spark-web/field';
import type { DataAttributeMap } from '@spark-web/utils/internal';
import { useEffect, useRef, useState } from 'react';
import type { GetOptionLabel, GetOptionValue, GroupBase } from 'react-select';
import ReactSelect from 'react-select';

import {
  useReactSelectComponentsOverride,
  useReactSelectStylesOverride,
  useReactSelectThemeOverride,
} from './react-select-overrides';

type Nullable<T> = T | null;

type Awaitable<T> = T | Promise<T>;

export type ComboboxProps<Item = unknown> = {
  /** Sets data attributes on the component. */
  data?: DataAttributeMap;

  /**
   * Resolves option data to a string to be displayed as the label by components.
   *
   * Note: Failure to resolve to a string type can interfere with filtering and
   * screen reader support.
   */
  getOptionLabel?: GetOptionLabel<Item>;

  /** Resolves option data to a string to compare options and specify value attributes. */
  getOptionValue?: GetOptionValue<Item>;

  /** The value of the input. */
  inputValue?: string;

  /** When true, shows a loading indicator in the dropdown instead of results. */
  isLoading?: boolean;

  /** Array of items for the user to select from. */
  items: Awaitable<(Item | GroupBase<Item>)[]>;

  /** Called when an item is selected. */
  onChange?: (value: Nullable<Item>) => void;

  /** Called whenever the input value changes. Use to filter the items. */
  onInputChange?: (inputValue: string) => void;

  /** The text that appears in the form control when it has no value set. */
  placeholder?: string;

  /** The selected item. */
  value?: Nullable<Item>;
};

const isBrowser = typeof window !== 'undefined';

export const useAwaitableItems = <Item,>(awaitableItems: Awaitable<Item[]>) => {
  const ref = useRef<Awaitable<Item[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      ref.current = awaitableItems;
      setLoading(true);
      const itemsResult = await awaitableItems;
      if (ref.current !== awaitableItems) return;
      setItems(itemsResult);
      setLoading(false);
    })();
  }, [awaitableItems]);

  return { loading, items };
};

export const Combobox = <Item,>({
  placeholder,
  inputValue,
  items: _items,
  onChange,
  onInputChange,
  getOptionLabel,
  getOptionValue,
  isLoading,
  value,
  data,
}: ComboboxProps<Item>) => {
  const [{ disabled, invalid }, { id: inputId }] = useFieldContext();
  const { items, loading } = useAwaitableItems(_items);

  const components = useReactSelectComponentsOverride(data);
  const styles = useReactSelectStylesOverride<Item>({ invalid });
  const theme = useReactSelectThemeOverride();

  return (
    <ReactSelect<Item>
      components={components}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      inputId={inputId}
      inputValue={inputValue}
      isDisabled={disabled}
      isLoading={isLoading ?? loading}
      menuPortalTarget={isBrowser ? document.body : undefined}
      onChange={onChange}
      onInputChange={onInputChange}
      options={items}
      placeholder={placeholder}
      styles={styles}
      theme={theme}
      value={value}
    />
  );
};
