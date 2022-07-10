
export interface EntityConfigModel {
  bankDetails: {
    accountNumber: string,
      accountType: string,
      bankName: string,
      branchNumber: string
  },
  employeeDetails: {
    dateOfBirth: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    jobTitle: string,
    startDate: string
  },
  salaryData: {
    overtimeHourlyRate: number,
    standardHourlyRate: number
  }
}
