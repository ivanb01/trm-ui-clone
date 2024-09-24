import { atom } from 'jotai/index';

export const SelectedUsagePointsAtom = atom<Array<number>>([]);
SelectedUsagePointsAtom.debugLabel = 'usage points';
