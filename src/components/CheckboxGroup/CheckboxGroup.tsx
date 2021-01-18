import Checkbox from 'components/Checkbox/Checkbox';
import Input from 'components/Input';
import { FC, memo, SyntheticEvent, useState } from 'react';
import { SelectOption } from 'types';

import './CheckboxGroup.scss';

type Props = {
  value: string[];
  onChange: (value: string[]) => void;
  options: SelectOption[];
  className?: string;
  isSearchable?: boolean;
  searchPlaceholder?: string;
};

const CheckboxGroup: FC<Props> = ({ value, onChange, options, className, isSearchable = false, searchPlaceholder }) => {
  const [search, setSearch] = useState('');
  const searchRegExp = new RegExp(search, 'i');

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value: itemValue } = event.currentTarget;

    if (value.includes(itemValue)) {
      onChange(value.filter((value) => value !== itemValue));
    } else {
      onChange([...value, itemValue]);
    }
  };

  const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  };

  return (
    <div className={className}>
      {isSearchable && (
        <div styleName="search-wrapper">
          <Input
            styleName="search"
            onChange={handleSearch}
            value={search}
            placeholder={searchPlaceholder}
            type="search"
          />
        </div>
      )}
      {options
        .filter(({ label }) => searchRegExp.test(label))
        .map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            onChange={handleChange}
            styleName="item"
            checked={!!option.value && value.includes(option.value)}
          >
            {option.children || option.label}
          </Checkbox>
        ))}
    </div>
  );
};

export default memo(CheckboxGroup);
