import { atomWithStorage } from 'jotai/utils';

export interface FormatConfig {
  date: string;
  locale?: string;
  maxDecimals?: number;
}

const localStorageKey = 'nites.format';

export const dataFormatAtom = atomWithStorage<FormatConfig>(
  localStorageKey,
  { date: 'DD.MMM.YYYY HH:mm' },
  undefined,
  { getOnInit: true }
);

dataFormatAtom.debugLabel = 'formats';
