import React from 'react';

import { components} from "react-select";

const SelectRCOption = props => {
  return (
    <components.Option {...props}>
    <div>{props.data.label}<div>{props.data.sublabel}</div></div>
    </components.Option>
  );
};

export default SelectRCOption;