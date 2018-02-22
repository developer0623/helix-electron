import Company from '../app/models/company';

const CompanyFactory = {
  createCompany: () => {
    const company = new Company();
    company.name = "Company";

    return company.save()
  }
}

module.exports = CompanyFactory;
