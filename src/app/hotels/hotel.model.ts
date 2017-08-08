export class Hotel {
  public name: string;
  public country: string;
  public city: string;
  public rooms: number;
  public facilities: string[];


  constructor(name: string, country: string, city: string, rooms: number, facilities: string[]) {
    this.name = name;
    this.country = country;
    this.city = city;
    this.rooms = rooms;
    this.facilities = facilities;
  }
}
