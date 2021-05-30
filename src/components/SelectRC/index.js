import React from 'react';

import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";

const SelectRC = props => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={props.options}
  />
);

export default SelectRC;