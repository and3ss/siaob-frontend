import React from 'react';

import AsyncSelect from 'react-select/async';
import FixRequiredSelect from "./FixRequiredSelect";

const AsyncSelectRC = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={AsyncSelect}
    options={props.options}
  />
);

export default AsyncSelectRC;