import { Select, SelectProps } from 'antd';
import { FC } from 'react';

export const NumberFormatPicker: FC<SelectProps> = ({ ...props }) => {
  const locales = ['en-US', 'de-DE', 'fr-FR'];
  const options = locales.map((locale) => {
    return {
      label: (10000).toLocaleString(locale, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }),
      value: locale
    };
  });
  return (
    <div className={'flex flex-col gap-2'} style={{ maxWidth: 300 }}>
      <Select options={options} {...props} />
    </div>
  );
};
