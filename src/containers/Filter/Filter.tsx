import Button from 'components/Button';
import CheckboxGroup from 'components/CheckboxGroup';
import Drop from 'components/Drop';
import FilterItem from 'components/FilterItem';
import Icon from 'components/Icon';
import Radio from 'components/Radio';
import RadioGroup from 'components/RadioGroup';
import Switch from 'components/Switch';
import { initialFormData } from 'constants/searchFilter';
import { FC, memo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilterSlice } from 'store/reducers/searchFilter';
import { getSearchFilterData, getSearchFilterValue } from 'store/selectors/searchFilter';

import { getLabelsFromValues } from './utils/getLabelsFromValues';

import './Filter.scss';

type Props = {
  className?: string;
};

const Filter: FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const filterValues = useSelector(getSearchFilterValue);
  const filterData = useSelector(getSearchFilterData);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialFormData,
  });

  const onSubmit = handleSubmit((values) => {
    dispatch(searchFilterSlice.actions.setFilterValue(values));
  });

  const handleReset = useCallback(
    (values = initialFormData) => {
      reset(values);
      dispatch(searchFilterSlice.actions.setFilterValue(values));
    },
    [reset, dispatch],
  );

  return (
    <form className={className} styleName="filter" onSubmit={onSubmit}>
      <Drop
        styleName="select"
        placeholder="Availability"
        values={getLabelsFromValues(
          [...filterData.availabilityByDate, ...filterData.availability],
          [...filterValues.availabilityByDate, ...filterValues.availability],
        )}
        onReset={() => {
          handleReset({ ...filterValues, availabilityByDate: [], availability: [] });
        }}
        onClose={onSubmit}
      >
        <Controller
          control={control}
          name="availabilityByDate"
          render={({ onChange, value }) => (
            <CheckboxGroup
              styleName="group"
              onChange={onChange}
              value={value}
              options={filterData.availabilityByDate.map(({ count, label, value }) => ({
                children: <FilterItem count={count}>{label}</FilterItem>,
                label,
                value,
              }))}
            />
          )}
        />
        <Controller
          control={control}
          name="availability"
          render={({ onChange, value }) => (
            <CheckboxGroup
              styleName="group"
              onChange={onChange}
              value={value}
              options={filterData.availability.map(({ count, label, value, icon }) => ({
                label,
                value,
                children: (
                  <FilterItem count={count}>
                    <div styleName="with-icon">
                      {icon && (
                        <div styleName="icon-wrapper">
                          <Icon icon={icon} styleName="icon" color="#244D51" />
                        </div>
                      )}
                      {label}
                    </div>
                  </FilterItem>
                ),
              }))}
            />
          )}
        />
      </Drop>
      <Drop
        styleName="select"
        placeholder="Speciality"
        values={getLabelsFromValues(filterData.speciality, filterValues.speciality)}
        onReset={() => {
          handleReset({ ...filterValues, speciality: [] });
        }}
        onClose={onSubmit}
      >
        <Controller
          control={control}
          name="speciality"
          render={({ onChange, value }) => (
            <CheckboxGroup
              isSearchable
              searchPlaceholder="Filter by speciality"
              styleName="group"
              onChange={onChange}
              value={value}
              options={filterData.speciality.map(({ count, label, value }) => ({
                label,
                value,
                children: <FilterItem count={count}>{label}</FilterItem>,
              }))}
            />
          )}
        />
      </Drop>
      <Drop
        styleName="select"
        placeholder="Insurance"
        values={getLabelsFromValues(filterData.insurance, filterValues.insurance)}
        onReset={() => {
          handleReset({ ...filterValues, insurance: [] });
        }}
        onClose={onSubmit}
      >
        <div styleName="no-insurance">
          <div styleName="no-insurance-text">Provides other than insurance payment options</div>
          <Controller
            name="noInsurance"
            control={control}
            render={({ onChange, value }) => <Switch onChange={onChange} value={value} />}
          />
        </div>
        <Controller
          control={control}
          name="insurance"
          render={({ onChange, value }) => (
            <CheckboxGroup
              isSearchable
              searchPlaceholder="Filter by insurance carrier"
              styleName="group"
              onChange={onChange}
              value={value}
              options={filterData.insurance.map(({ count, label, value }) => ({
                label,
                value,
                children: <FilterItem count={count}>{label}</FilterItem>,
              }))}
            />
          )}
        />
      </Drop>
      <Drop
        styleName="select"
        dropWidth={266}
        placeholder="Sort"
        theme="outline"
        hideOnClick
        icon="sorting"
        onClose={onSubmit}
      >
        <Controller
          control={control}
          name="sort"
          render={({ onChange, value }) => (
            <RadioGroup onChange={onChange} value={value} styleName="group">
              <Radio styleName="group-item" value="availability">
                Next available
              </Radio>
              <Radio styleName="group-item" value="experience">
                Most Experienced
              </Radio>
            </RadioGroup>
          )}
        />
      </Drop>
      <Button
        theme="link"
        onClick={() => {
          handleReset();
        }}
      >
        Clear filters
      </Button>
    </form>
  );
};

export default memo(Filter);
