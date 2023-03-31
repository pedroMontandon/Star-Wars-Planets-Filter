const rectifyingWords = (word) => {
  if (word === 'name') return 'Name';
  if (word === 'rotation_period') return 'Rotation Period';
  if (word === 'orbital_period') return 'Orbital Period';
  if (word === 'diameter') return 'Diameter';
  if (word === 'climate') return 'Climate';
  if (word === 'gravity') return 'Gravity';
  if (word === 'terrain') return 'Terrain';
  if (word === 'surface_water') return 'Surface Water';
  if (word === 'population') return 'Population';
};

export default rectifyingWords;
