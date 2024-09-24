import {
  ColorPicker,
  Divider,
  InputNumber,
  Select,
  Switch,
  Typography
} from 'antd';
import { FC } from 'react';

import { fontFamilies } from '../../../assets/fonts/fontFamilies.ts';
import { ThemeConfiguration } from '../../../state/atoms/preferencesAtom.ts';
import { colorSchemes } from '../../../utility/variables/graphs/LineChart';

const { Text, Title } = Typography;

interface ThemeProps {
  switchAlgorithm: (
    e: boolean | number | string,
    prop: keyof ThemeConfiguration
  ) => void;
  themeConfig: ThemeConfiguration;
}

const Distance = () => <Divider className={'col-span-2'} />;
export const Theme: FC<ThemeProps> = ({ switchAlgorithm, themeConfig }) => {
  const fontOptions = fontFamilies.map((font) => {
    return {
      label: <span style={{ fontFamily: font.cssName }}>{font.name}</span>,
      value: font.cssName
    };
  });
  const graphSchemes = colorSchemes.map((graphTheme) => {
    return {
      label: graphTheme,
      value: graphTheme
    };
  });
  return (
    <div className={'grid h-fit grid-cols-1 gap-6 md:grid-cols-2'}>
      <Title className={'col-span-2'} level={3}>
        Theme
      </Title>
      <Text>Dark mode:</Text>
      <div className={'h-8'}>
        <Switch
          checked={themeConfig.darkMode}
          data-cy="theme-switch"
          onChange={(e) => switchAlgorithm(e, 'darkMode')}
        />
      </div>
      <Distance />
      <Text>Primary color:</Text>
      <div className={'h-8'}>
        <ColorPicker
          data-cy="theme-color"
          value={themeConfig.primaryColor}
          onChange={(_color, value) => switchAlgorithm(value, 'primaryColor')}
        />
      </div>
      <Distance />
      <Text>Compact:</Text>
      <div className={'h-8'}>
        <Switch
          checked={themeConfig.size}
          data-cy="theme-size"
          onChange={(e) => switchAlgorithm(e, 'size')}
        />
      </div>
      <Distance />
      <Text>Font size:</Text>
      <div className={'h-8'}>
        <InputNumber
          data-cy="theme-font-size"
          max={20}
          min={10}
          value={themeConfig.fontSize}
          onChange={(e) => e && switchAlgorithm(e, 'fontSize')}
        />
      </div>
      <Distance />
      <Text>Font family:</Text>
      <div className={'h-8'}>
        <Select
          className={'w-full max-w-[300px]'}
          data-cy="theme-font-family"
          options={fontOptions}
          value={themeConfig.fontFamily}
          onChange={(e) => e && switchAlgorithm(e, 'fontFamily')}
        />
      </div>
      <Distance />
      <Text>Graph scheme:</Text>
      <div className={'h-8'}>
        <Select
          className={'w-full max-w-[300px]'}
          data-cy="theme-graph-style"
          options={graphSchemes}
          value={themeConfig.graphScheme}
          onChange={(e) => e && switchAlgorithm(e, 'graphScheme')}
        />
      </div>
    </div>
  );
};
