let tree = [];
//Record Title
tree["name"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Record Title"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//3. Names and Identifiers
//3.1 Computed Descriptors
//IUPAC Name
tree["iupac name"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Computed Descriptors"
}, {
  type: "Section",
  key: "IUPAC Name"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//InChI
tree["inchi"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Computed Descriptors"
}, {
  type: "Section",
  key: "InChI"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//InChI
tree["inchi key"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Computed Descriptors"
}, {
  type: "Section",
  key: "InChI Key"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Molecular Formula
tree["molecular formula"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Molecular Formula"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Canonical SMILES
tree["canonical smiles"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Computed Descriptors"
}, {
  type: "Section",
  key: "Canonical SMILES"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Molecular Formula
// tree["Molecular Formula"] = [{
//   type: "Section",
//   key: "Names and Identifiers"
// }, {
//   type: "Section",
//   key: "Computed Descriptors"
// }, {
//   type: "Section",
//   key: "Molecular Formula"
// }, {
//   type: "Information",
//   index: 0
// }, {
//   type: "ParseStringValue"
// }];
//3.3 Other Identifiers
//CAS
tree["cas"] = [{
  type: "Section",
  key: "Names and Identifiers"
}, {
  type: "Section",
  key: "Other Identifiers"
}, {
  type: "Section",
  key: "CAS"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//ICSC Number
//RTECS Number
//UN Number
//UNII

//4. Chemical and Physical Properties
//4.1 Computed Properties
tree["molecular weight"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Computed Properties"
},  {
  type: "Information",
  index: 0
}, {
  type: "Table",
  key: "Molecular Weight"
}, {
  type: "ParseNumAndUnitValue"
}];
//Hydrogen Bond Donor Count
tree["hydrogen bond donor count"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Computed Properties"
},  {
  type: "Information",
  index: 0
}, {
  type: "Table",
  key: "Hydrogen Bond Donor Count"
}, {
  type: "ParseNumValue"
}];
//Hydrogen Bond Acceptor Count
tree["hydrogen bond acceptor count"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Computed Properties"
},  {
  type: "Information",
  index: 0
}, {
  type: "Table",
  key: "Hydrogen Bond Donor Count"
}, {
  type: "ParseNumValue"
}];
//Rotatable Bond Count
//Complexity
//CACTVS Substructure Key Fingerprint
//Topological Polar Surface Area
//Monoisotopic Mass
//Exact Mass
//XLogP3-AA
//Compound Is Canonicalized
//Formal Charge
//Heavy Atom Count
//Defined Atom Stereocenter Count
//Undefined Atom Stereocenter Count
//Defined Bond Stereocenter Count
//Undefined Bond Stereocenter Count
//Isotope Atom Count
//Covalently-Bonded Unit Count

//4.2 Experimental Properties
tree["physical description"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Physical Description"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["odor"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Odor"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["color"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Color"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["boiling point"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Boiling Point"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["melting point"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Melting Point"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["flash point"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Flash Point"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["solubility"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Solubility"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["density"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Density"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["vapor density"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Vapor Density"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["vapor pressure"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Vapor Pressure"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["logp"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "LogP"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["auto ignition"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Auto-Ignition"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["decomposition"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Decomposition"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["viscosity"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Viscosity"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["corrosivity"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Corrosivity"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["heat of combustion"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Heat of Combustion"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["heat of vaporization"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Heat of Vaporization"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["surface tension"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Surface Tension"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["ionization potential"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Ionization Potential"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
tree["odor threshold"] = [{
  type: "Section",
  key: "Chemical and Physical Properties"
}, {
  type: "Section",
  key: "Experimental Properties"
}, {
  type: "Section",
  key: "Odor Threshold"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Dissociation Constants
//Relative Evaporation Rate
//Health Hazard
tree["health hazard"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Health Hazard"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Fire Hazard
tree["fire hazard"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Fire Hazard"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Explosion Hazard
tree["explosion hazard"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Explosion Hazard"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//13 Safety and Hazards
//13.1 Hazards Identification
//Hazards Summary
tree["hazards summary"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Hazards Summary"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Fire Potential
tree["fire potential"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Fire Potential"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Skin, Eye, and Respiratory Irritations
tree["skin, eye, and respiratory irritations"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Hazards Identification"
}, {
  type: "Section",
  key: "Skin, Eye, and Respiratory Irritations"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//13.3 First Aid Measures
//First Aid
tree["first aid"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "First Aid Measures"
}, {
  type: "Section",
  key: "First Aid"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Inhalation First Aid
tree["inhalation first aid"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "First Aid Measures"
}, {
  type: "Section",
  key: "Inhalation First Aid"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Skin First Aid
tree["skin first aid"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "First Aid Measures"
}, {
  type: "Section",
  key: "Skin First Aid"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Eye First Aid
tree["eye first aid"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "First Aid Measures"
}, {
  type: "Section",
  key: "Eye First Aid"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//Ingestion First Aid
tree["ingestion first aid"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "First Aid Measures"
}, {
  type: "Section",
  key: "Ingestion First Aid"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.4 Fire Fighting Measures
//11.4.1 Fire Fighting
tree["fire fighting"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Fire Fighting Measures"
}, {
  type: "Section",
  key: "Fire Fighting"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.4.2 Explosion Fire Fighting
tree["explosion fire fighting"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Fire Fighting Measures"
}, {
  type: "Section",
  key: "Explosion Fire Fighting"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.4.3 Other Fire Fighting Hazards
tree["other fire fighting hazards"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Fire Fighting Measures"
}, {
  type: "Section",
  key: "Other Fire Fighting Hazards"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.5 Accidental Release Measures
//11.5.1 Isolation and Evacuation
tree["isolation and evacuation"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Accidental Release Measures"
}, {
  type: "Section",
  key: "Isolation and Evacuation"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.5.2 Spillage Disposal
tree["spillage disposal"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Accidental Release Measures"
}, {
  type: "Section",
  key: "Spillage Disposal"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.5.3 Cleanup Methods
tree["cleanup methods"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Accidental Release Measures"
}, {
  type: "Section",
  key: "Cleanup Methods"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.5.4 Disposal Methods
tree["disposal methods"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Accidental Release Measures"
}, {
  type: "Section",
  key: "Disposal Methods"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.5.5 Other Preventative Measures
tree["other preventative measures"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Accidental Release Measures"
}, {
  type: "Section",
  key: "Other Preventative Measures"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.6 Handling and Storage
//11.6.1 Nonfire Spill Response
tree["nonfire spill response"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Handling and Storage"
}, {
  type: "Section",
  key: "Nonfire Spill Response"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.6.2 Safe Storage
tree["safe storage"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Handling and Storage"
}, {
  type: "Section",
  key: "Safe Storage"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//11.6.3 Storage Conditions
tree["storage conditions"] = [{
  type: "Section",
  key: "Safety and Hazards"
}, {
  type: "Section",
  key: "Handling and Storage"
}, {
  type: "Section",
  key: "Storage Conditions"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12 Toxicity
//12.1 Toxicological Information
//12.1.1 NIOSH Toxicity Data
//12.1.2 Carcinogen
tree["carcinogen"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Carcinogen"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.3 Health Effects
tree["health effects"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Health Effects"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.5 Exposure Routes
tree["exposure routes"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Exposure Routes"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.5 Symptoms
tree["symptoms"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Symptoms"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.6 Inhalation Symptoms
tree["inhalation symptoms"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Inhalation Sypmtoms"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.7 Skin Symptoms
tree["skin symptoms"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Skin Symptoms"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.8 Eye Symptoms
tree["eye symptoms"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Eye Symptoms"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.9 Ingestion Symptoms
tree["ingestion symptoms"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Ingestion Symptoms"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.10 Target Organs
tree["target organs"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Target Organs"
},  {
  type: "Section",
  key: "Carcinogen"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.11 Acute Effects
tree["acute effects"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Acute Effects"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.12 Chronic Effects
tree["chronic effects"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Chronic Effects"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.13 Cancer Risk
tree["cancer risks"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Cancer Risks"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.14 Reproductive and Developmental Effects
tree["reproductive and developmental effects"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Reproductive and Developmental Effects"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.15 Toxicity Summary
tree["toxicity summary"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Toxicity Summary"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.16 Antidote and Emergency Treatment
tree["antidote and emergency treatment"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Antidote and Emergency Treatment"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.17 Medical Surveillance
tree["medical surveillance"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Medical Surveillance"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.18 Human Toxicity Excerpts
tree["human toxicity excerpts"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Human Toxicity Excerpts"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
//12.1.19 Non-Human Toxicity Excerpts
tree["non-human toxicty excerpts"] = [{
  type: "Section",
  key: "Toxicity"
}, {
  type: "Section",
  key: "Toxicological Information"
},  {
  type: "Section",
  key: "Non-Human Toxicity Excerpts"
}, {
  type: "Information",
  index: 0
}, {
  type: "ParseStringValue"
}];
module.exports = tree;
