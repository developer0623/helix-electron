import Lab from '../app/models/lab';
const LabFactory = {
  createLab: (company) => {
    return new Promise((resolve, reject) => {
      const lab = new Lab();
      lab.lab_name = "Rhodes Lab";
      lab.description = "test lab space";
      lab.keywords = "Ospc, Lyme Disease";
      lab.owner = company;
      lab.owner_type = "Company";

      lab.save()
      .then(() => {
        resolve(lab);
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = LabFactory;
