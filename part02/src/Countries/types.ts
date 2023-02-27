type IName = {
  common: string;
  official: string;
};

type IFlag = {
  svg: string;
  png: string;
  alt: string;
};

type ICountry = {
  name: IName;
  capital: string;
  area: number;
  languages: any;
  flag: string;
  flags: IFlag;
  latlng: number[];
};

export default ICountry;