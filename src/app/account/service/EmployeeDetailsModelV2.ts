export class EmployeeDetailsModelV2 {
  private _dateOfBirth: string;
  private _firstName: string;
  private _lastName: string;
  private _profilePicture: string;
  private _jobTitle: string;
  private _startDate: string;


  // constructor(dateOfBirth: string, firstName: string, lastName: string, profilePicture: string, jobTitle: string, startDate: string) {
  //   this._dateOfBirth = dateOfBirth;
  //   this._firstName = firstName;
  //   this._lastName = lastName;
  //   this._profilePicture = profilePicture;
  //   this._jobTitle = jobTitle;
  //   this._startDate = startDate;
  // }

  constructor() {}

  get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  set dateOfBirth(value: string) {
    this._dateOfBirth = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get profilePicture(): string {
    return this._profilePicture;
  }

  set profilePicture(value: string) {
    this._profilePicture = value;
  }

  get jobTitle(): string {
    return this._jobTitle;
  }

  set jobTitle(value: string) {
    this._jobTitle = value;
  }

  get startDate(): string {
    return this._startDate;
  }

  set startDate(value: string) {
    this._startDate = value;
  }
}
