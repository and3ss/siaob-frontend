import React from 'react';

import CreatableSelect from 'react-select/creatable';
import FixRequiredSelect from "./FixRequiredSelect";

const CreatableSelectRC = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={CreatableSelect}
    options={props.options}
  />
);

export default CreatableSelectRC;