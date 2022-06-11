export const mapContainer = {
  width: '100%',
  height: '85vh',
  mt: 3,
  p: 1,

  backgroundColor: 'rgba(103, 58, 183, 0.7)',
  boxShadow: '0 0 15px #673ab7',
};

export const markerContainer = {
  position: 'absolute',
  zIndex: 1,

  transform: 'translate(-50%, -50%)',

  transition: '0.3s',
  '&:hover': { zIndex: 2 },
};

export const marker = {
  width: 100,
  height: 100,

  borderRadius: '50%',
  boxShadow: '0 0 15px #673ab7',

  opacity: 0.8,

  cursor: 'pointer',

  transition: '0.5s',
  '&:hover': { opacity: 1 },
};

export const card = {
  position: 'absolute',
  top: '75%',
  left: '75%',

  width: '300%',
  height: '180%',

  overflow: 'auto',

  borderRadius: '5px',
  boxShadow: '0 0 10px #673ab7',
  backgroundColor: 'rgba(255,255,255,0.8)',

  cursor: 'help',

  opacity: 0,
  visibility: 'hidden',
  transition: '0.5s',
  '&:hover': { backgroundColor: '#fff' },
};
