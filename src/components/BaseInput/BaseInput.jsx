import React from 'react';
import { Input as AntInput } from 'antd';

export const { TextArea } = AntInput;

export const BaseInput = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <AntInput ref={ref} className={`base-input ${className}`} {...props}>
    {children}
  </AntInput>
));
