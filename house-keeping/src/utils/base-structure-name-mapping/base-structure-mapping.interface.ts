export interface IBaseStructureMapping {
  [key: string]: IBaseStructureMappingSingleElement;
}

interface IBaseStructureMappingSingleElement {
  key: string;
  name: string;
  description: string;
  default: unknown;
}
