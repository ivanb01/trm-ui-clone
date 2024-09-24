import { atom } from 'jotai';

export interface FilterAtom {
  ckIds: Array<number>;
  fromDt?: null | string;
  psIds: Array<number>;
  rtIds: Array<number>;
  toDt?: null | string;
  ugIds: Array<number>;
  upIds: Array<number>;
}
export const filterAtom = atom<FilterAtom>({
  ckIds: [],
  fromDt: null,
  psIds: [],
  rtIds: [115],
  toDt: new Date().toISOString(),
  ugIds: [],
  upIds: []
});
filterAtom.debugLabel = 'filter';
