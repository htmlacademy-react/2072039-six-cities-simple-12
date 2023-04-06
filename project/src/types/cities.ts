export type City ={
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
};

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type Points = Point[];
