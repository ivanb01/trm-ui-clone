import { ConnectedLocationDTO } from '../../model/interface/usagePoint/ConnectedLocationDTO';
import { axiosClickerInstance } from '../axios/axiosClickerApi';

const connectionsCache: Record<
  string,
  Record<string, ConnectedLocationDTO>
> = {};

export async function getConnectedLocations(locationId: string) {
  if (connectionsCache[locationId]) return connectionsCache[locationId];
  const res = await axiosClickerInstance.get<ConnectedLocationDTO[]>(
    `/location/usagePoints/${locationId}`
  );
  const hash: Record<string, ConnectedLocationDTO> = {};
  res.data.forEach((l) => {
    /**remove self connection */
    if (l.location.id !== locationId) hash[l.location.id] = l;
  });
  connectionsCache[locationId] = hash;
  return hash;
}
