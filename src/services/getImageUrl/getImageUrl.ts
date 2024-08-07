const getUrlImage = (id: string) => {
  return `https://apinobat.arenap.ir/publicstaticfiles/PhysicianProfileImages/${id}.jpg`;
};

const getUrlExtraImage = (props: { id: string; physicianId: string }) => {
  const { id, physicianId } = props;
  return `https://apinobat.arenap.ir/publicstaticfiles/${physicianId}/${id}.jpg`;
};

export { getUrlImage , getUrlExtraImage };
