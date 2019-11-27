export interface IBaseStructureMapping {
  [key: string]: IBaseStructureMappingSingleElement;
}

export interface IBaseStructureMappingSingleElement {
  key: string;
  name: string;
  description: string;
  default: unknown;
}
