type IName = {
  common: string;
  official: string;
};

type ICountry = {
  name: IName;
  capital: string;
  area: number;
  languages: any;
  flag: string;
};

export default ICountry;