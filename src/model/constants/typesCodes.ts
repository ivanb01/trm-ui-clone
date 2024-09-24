export const codesMap = new Map();
const allTypes = [
  {
    id: 1,
    typeName: 'Distribucija, kontrolno'
  },
  {
    id: 2,
    typeName: 'Distribucija, kupac'
  },
  {
    id: 3,
    typeName: 'Distribucija, kupac - proizvodac'
  },
  {
    id: 4,
    typeName: 'Distribucija, proizvođač'
  },
  {
    id: 5,
    typeName: 'Distribucija, razmena'
  },
  {
    id: 6,
    typeName: 'Distributivna trafostanica'
  },
  {
    id: 7,
    typeName: 'Distributivna trafostanica 110kV'
  },
  {
    id: 8,
    typeName: 'DISTRIBUTIVNA TRAFOSTANICA 10/0,4 KV'
  },
  {
    id: 9,
    typeName: 'Distributivna trafostanica 35kV'
  }
];
allTypes.forEach((c) => codesMap.set(c.id, c.typeName));
const customerTypes = [
  {
    id: 1,
    kindName: 'Distribution, control'
  },
  {
    id: 2,
    kindName: 'Distribution, exchange'
  },
  {
    id: 3,
    kindName: 'Low voltage consumption'
  },
  {
    id: 4,
    kindName: 'Middle voltage consumption'
  },
  {
    id: 5,
    kindName: 'Streetligts'
  },
  {
    id: 6,
    kindName: 'Wide consumption'
  }
];
export const customerTypeMap = new Map();
customerTypes.forEach((c) => customerTypeMap.set(c.id, c.kindName));
