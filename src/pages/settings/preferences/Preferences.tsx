import { useAtom } from 'jotai';

import {
  dataFormatAtom,
  FormatConfig
} from '../../../state/atoms/dataFormatAtom.ts';
import {
  preferencesAtom,
  ThemeConfiguration
} from '../../../state/atoms/preferencesAtom.ts';
import { DataFormat } from './DataFormat.tsx';
import { Theme } from './Theme.tsx';

export const Preferences = () => {
  const [themeConfig, setThemeConfig] = useAtom(preferencesAtom);
  const [format, setFormat] = useAtom(dataFormatAtom);
  const editProperty = (
    val: boolean | number | string,
    key: keyof ThemeConfiguration
  ) => {
    setThemeConfig((prev) => {
      return {
        ...prev,
        [key]: val
      };
    });
  };
  const editFormat = (val: number | string, key: keyof FormatConfig) => {
    setFormat((prev) => {
      return {
        ...prev,
        [key]: val
      };
    });
  };
  return (
    <div className={'grid md:grid-cols-2'}>
      <Theme switchAlgorithm={editProperty} themeConfig={themeConfig} />
      <DataFormat editFormat={editFormat} format={format} />
    </div>
  );
};
