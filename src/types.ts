export type ClassificationState = {
  name: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

/* Countries type */
export type Country = {
  Code: string;
  Name: string;
};

/* Species type */
export type Classification = {
  key: number;
  nubKey: number;
  nameKey: number;
  taxonID: string;
  sourceTaxonKey: number;
  kingdom: string;
  phylum: string;
  kingdomKey: number;
  phylumKey: number;
  datasetKey: string;
  constituentKey: string;
  parentKey: number;
  parent: string;
  scientificName: string;
  canonicalName: string;
  vernacularName: string;
  authorship: string;
  nameType: string;
  rank: string;
  origin: string;
  taxonomicStatus: string;
  nomenclaturalStatus: any[];
  remarks: string;
  numDescendants: number;
  lastCrawled: Date;
  lastInterpreted: Date;
  issues: string[];
  synonym: boolean;
  publishedIn: string;
  family: string;
  familyKey?: number;
};

export type Species = {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  results: Classification[];
};

/* Occurence results type */
export type HttpRsGbifOrgTerms10Multimedia = {
  'http://purl.org/dc/terms/title': string;
  'http://purl.org/dc/terms/format': string;
  'http://purl.org/dc/terms/license': string;
  'http://purl.org/dc/terms/references': string;
  'http://purl.org/dc/terms/creator': string;
  'http://purl.org/dc/terms/rightsHolder': string;
  'http://purl.org/dc/terms/identifier': string;
};

export type Extensions = {
  'http://rs.gbif.org/terms/1.0/Multimedia'?: HttpRsGbifOrgTerms10Multimedia[];
};

export type Medium = {
  type: string;
  format: string;
  identifier: string;
  references: string;
  title: string;
  creator: string;
  license: string;
  rightsHolder: string;
};

export type Level0 = {
  gid: string;
  name: string;
};

export type Level1 = {
  gid: string;
  name: string;
};

export type Level2 = {
  gid: string;
  name: string;
};

export type Level3 = {
  gid: string;
  name: string;
};

export type Gadm = {
  level0?: Level0;
  level1?: Level1;
  level2?: Level2;
  level3?: Level3;
};

export type Occurence = {
  key: number;
  datasetKey: string;
  publishingOrgKey: string;
  networkKeys: string[];
  installationKey: string;
  publishingCountry: string;
  protocol: string;
  lastCrawled: Date;
  lastParsed: Date;
  crawlId: number;
  hostingOrganizationKey: string;
  extensions: Extensions;
  basisOfRecord: string;
  occurrenceStatus: string;
  lifeStage: string;
  taxonKey: number;
  kingdomKey: number;
  phylumKey: number;
  classKey: number;
  orderKey: number;
  familyKey: number;
  genusKey: number;
  speciesKey: number;
  acceptedTaxonKey: number;
  scientificName: string;
  acceptedScientificName: string;
  kingdom?: string;
  phylum?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  genericName: string;
  specificEpithet: string;
  taxonRank: string;
  taxonomicStatus: string;
  decimalLongitude: number;
  decimalLatitude: number;
  coordinatePrecision: number;
  coordinateUncertaintyInMeters: number;
  stateProvince: string;
  year: number;
  month: number;
  day: number;
  eventDate: Date;
  issues: string[];
  lastInterpreted: Date;
  license: string;
  identifiers: any[];
  media: Medium[];
  facts: any[];
  relations: any[];
  gadm: Gadm;
  institutionKey: string;
  isInCluster: boolean;
  geodeticDatum: string;
  class: string;
  countryCode: string;
  recordedByIDs: any[];
  identifiedByIDs: any[];
  country: string;
  identifier: string;
  eventID: string;
  'http://unknown.org/taxonRankID': string;
  dynamicProperties: string;
  collectionCode: string;
  verbatimLocality: string;
  gbifID: string;
  occurrenceID: string;
  'http://unknown.org/subspecies': string;
  catalogNumber: string;
  recordedBy: string;
  vernacularName: string;
  otherCatalogNumbers: string;
  institutionCode: string;
  taxonConceptID: string;
  'http://unknown.org/species': string;
  identifiedBy: string;
  individualCount?: number;
  associatedReferences: string;
  county: string;
  locality: string;
  municipality: string;
  verbatimElevation: string;
  iucnRedListCategory: string;
  waterBody: string;
  verbatimEventDate: string;
  datasetName: string;
  eventRemarks: string;
  language: string;
  type: string;
  occurrenceRemarks: string;
  projectId: string;
  establishmentMeans: string;
  rightsHolder: string;
  dataGeneralizations: string;
  verbatimCoordinateSystem: string;
  identificationVerificationStatus: string;
  dateIdentified?: Date;
  continent: string;
  modified?: Date;
  fieldNumber: string;
  earliestEraOrLowestErathem: string;
  earliestEpochOrLowestSeries: string;
  preparations: string;
  lowestBiostratigraphicZone: string;
  locationID: string;
  earliestPeriodOrLowestSystem: string;
  group: string;
  elevation?: number;
  habitat: string;
  nomenclaturalCode: string;
  ownerInstitutionCode: string;
  samplingProtocol: string;
  higherClassification: string;
  fieldNotes: string;
  eventTime: string;
  behavior: string;
  identificationQualifier: string;
  'http://unknown.org/rightsHolder': string;
  'http://unknown.org/license': string;
  taxonID: string;
  datasetID: string;
  references: string;
  organismQuantity?: number;
  organismQuantityType: string;
  'http://rs.tdwg.org/dwc/terms/organismQuantity': string;
  organismName: string;
  'http://rs.tdwg.org/dwc/terms/organismQuantityType': string;
};

export type Occurences = {
  offset: number;
  limit: number;
  endOfRecords: boolean;
  count: number;
  results: Occurence[];
  facets: any[];
};
