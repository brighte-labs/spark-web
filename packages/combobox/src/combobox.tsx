import { useFieldContext } from '@spark-web/field';
import { useEffect, useRef, useState } from 'react';
import type { GetOptionLabel, GetOptionValue } from 'react-select';
import ReactSelect from 'react-select';

import {
  reactSelectComponentsOverride,
  useReactSelectStylesOverride,
  useReactSelectThemeOverride,
} from './react-select-overrides';

type Nullable<T> = T | null;

type Awaitable<T> = T | Promise<T>;

export type ComboboxProps<Item = unknown> = {
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

  /** Array of items for the user to select from. */
  items: Awaitable<Item[]>;

  /** When true, shows a loading indicator in the dropdown instead of results. */
  isLoading?: boolean;

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

const useAwaitableItems = <Item,>(awaitableItems: Awaitable<Item[]>) => {
  const ref = useRef<Awaitable<Item[]>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      ref.current = awaitableItems;
      setLoading(true);
      const items = await awaitableItems;
      if (ref.current !== awaitableItems) return;
      setItems(items);
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
}: ComboboxProps<Item>) => {
  const [{ disabled, invalid }, { id: inputId, ...a11yProps }] =
    useFieldContext();

  const stylesOverride = useReactSelectStylesOverride<Item>({ invalid });
  const themeOverride = useReactSelectThemeOverride();

  const { items, loading } = useAwaitableItems(_items);

  return (
    <ReactSelect<Item>
      {...a11yProps}
      components={reactSelectComponentsOverride}
      inputId={inputId}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      styles={stylesOverride}
      value={value}
      options={items}
      isDisabled={disabled}
      isLoading={isLoading ?? loading}
      placeholder={placeholder}
      theme={themeOverride}
      menuPortalTarget={isBrowser ? document.body : undefined}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
    />
  );
};
