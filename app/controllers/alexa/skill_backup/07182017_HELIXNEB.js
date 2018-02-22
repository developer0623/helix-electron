{
  "intents": [
    {
      "name": "AbstractIntent",
      "samples": [
        "Play my new abstracts",
        "Are there any journal articles available",
        "Do I have any new journal articles"
      ],
      "slots": [
        {
          "name": "ReadJournalArticles",
          "type": "OKTYPE",
          "samples": []
        }
      ]
    },
    {
      "name": "AMAZON.CancelIntent",
      "samples": []
    },
    {
      "name": "AMAZON.HelpIntent",
      "samples": []
    },
    {
      "name": "AMAZON.MoreIntent",
      "samples": []
    },
    {
      "name": "AMAZON.NavigateHomeIntent",
      "samples": []
    },
    {
      "name": "AMAZON.NavigateSettingsIntent",
      "samples": []
    },
    {
      "name": "AMAZON.NextIntent",
      "samples": []
    },
    {
      "name": "AMAZON.PageDownIntent",
      "samples": []
    },
    {
      "name": "AMAZON.PageUpIntent",
      "samples": []
    },
    {
      "name": "AMAZON.PauseIntent",
      "samples": []
    },
    {
      "name": "AMAZON.PreviousIntent",
      "samples": []
    },
    {
      "name": "AMAZON.ResumeIntent",
      "samples": []
    },
    {
      "name": "AMAZON.ScrollDownIntent",
      "samples": []
    },
    {
      "name": "AMAZON.ScrollLeftIntent",
      "samples": []
    },
    {
      "name": "AMAZON.ScrollRightIntent",
      "samples": []
    },
    {
      "name": "AMAZON.ScrollUpIntent",
      "samples": []
    },
    {
      "name": "AMAZON.StopIntent",
      "samples": []
    },
    {
      "name": "AutoIgnitionIntent",
      "samples": [
        "What is the auto ignition of {Entity}",
        "What's the auto ignition of {Entity}",
        "Tell me about the auto ignition of {Entity}",
        "What is the ignition point of {Entity}",
        "What is the ignition point for {Entity}",
        "Tell me about the auto ignition for {Entity}",
        "What's the auto ignition for {Entity}",
        "What is the auto ignition for {Entity}",
        "What's the ignition point of {Entity}",
        "What is the ignition point {Entity}",
        "Tell me about the ignition point for {Entity}",
        "Tell me about the ignition point of {Entity}",
        "What is the kindling point of {Entity}",
        "Tell me about the kindling point of {Entity}",
        "What's the kindling point of {Entity}",
        "What is the kindling point for {Entity}",
        "What's the kindling point for {Entity}",
        "Tell me about the kindling point for {Entity}",
        "What is {Entity} auto ignition point",
        "What's {Entity} auto ignition point",
        "Tell me {Entity} auto ignition point",
        "What is {Entity} ignition point",
        "What's {Entity} ignition point",
        "Tell me {Entity} ignition point",
        "What is {Entity} kindling point",
        "What's {Entity} kindling point",
        "Tell me {Entity} kindling point",
        "{Entity} auto ignition",
        "{Entity} auto ignition point",
        "{Entity} ignition point",
        "{Entity} kindling point"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "BoilingPointIntent",
      "samples": [
        "What's the boiling point of {Entity}",
        "What is the boiling point of {Entity}",
        "What is the boiling point for {Entity}",
        "What's the boiling point for {Entity}",
        "boiling point {Entity}",
        "What is {Entity} boiling point",
        "Tell me {Entity} boiling point",
        "What's {Entity} boiling point",
        "Tell me about {Entity} boiling point",
        "Tell me the boiling point of {Entity}",
        "Tell me the boiling point for {Entity}",
        "{Entity} boiling point"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "CalculationIntent",
      "samples": [
        "I need to do a calculation",
        "I need to {CalculationName}",
        "I want to {CalculationName}",
        "How do i calculate the {CalculationName}"
      ],
      "slots": [
        {
          "name": "CalculationName",
          "type": "CALCULATIONNAME",
          "samples": []
        },
        {
          "name": "CalculationType",
          "type": "CALCULATIONTYPE",
          "samples": []
        },
        {
          "name": "Mass",
          "type": "AMOUNT",
          "samples": []
        },
        {
          "name": "Volume",
          "type": "AMOUNT",
          "samples": []
        },
        {
          "name": "Concentration",
          "type": "AMOUNT",
          "samples": []
        }
      ]
    },
    {
      "name": "CanonicalSmilesIntent",
      "samples": [
        "What's the canonical smiles for {Entity}",
        "What is the canonical smiles for {Entity}",
        "What is {Entity} canonical smiles",
        "What's {Entity} canonical smiles",
        "Tell me {Entity} canonical smiles",
        "What's the canonical smiles of {Entity}",
        "What is the canonical smiles of {Entity}",
        "Tell me the canonical smiles for {Entity}",
        "Tell me the canonical smiles of {Entity}",
        "{Entity} canonical smiles"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "CasNumberIntent",
      "samples": [
        "What is the CAS Number for {Entity}",
        "What's the CAS Number for {Entity}",
        "What is the CAS for {Entity}",
        "What's the CAS for {Entity}",
        "What is the CAS Number of {Entity}",
        "What's the CAS Number of {Entity}",
        "What is the CAS Registry Number for {Entity}",
        "What's the CAS Registry Number of {Entity}",
        "What is the CAS Registry Number of {Entity}",
        "What's the CAS Registry Number for {Entity}",
        "Tell me the CAS Registry Number of {Entity}",
        "Tell me the CAS Register Number for {Entity}",
        "What's {Entity} CAS",
        "What is {Entity} CAS",
        "What is {Entity} CAS Registry Number",
        "What's {Entity} CAS Registry Number",
        "What is {Entity} CAS Number",
        "What's {Entity} CAS Number",
        "Tell me {Entity} CAS",
        "Tell me {Entity} CAS Registry Number",
        "Tell me {Entity} CAS Number",
        "CAS for {Entity}",
        "CAS Registry Number for {Entity}",
        "CAS Number for {Entity}",
        "CAS of {Entity}",
        "CAS Registry Number of {Entity}",
        "CAS Number of {Entity}",
        "{Entity} CAS Number",
        "{Entity} CAS Registry Number",
        "{Entity} CAS",
        "{Entity} Chemical Abstract Number",
        "What is {Entity} Chemical Abstract Number",
        "What's {Entity} Chemical Abstract Number",
        "What is the Chemical Abstract Number for {Entity}",
        "What's the Chemical Abstract Number of {Entity}",
        "CAS Number",
        "Chemical Abstract Service Number",
        "CAS Registry Number",
        "Look up a CAS Number",
        "Lookup a CAS Registry Number"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "ColorIntent",
      "samples": [
        "What is the color of {Entity}",
        "What's the color of {Entity}",
        "{Entity} color",
        "What is the color for {Entity}",
        "What's the color for {Entity}",
        "What is {Entity} color",
        "What's {Entity} color",
        "Tell me {Entity} color"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "DecompositionIntent",
      "samples": [
        "What's the decomposition of {Entity}",
        "What is the decomposition of {Entity}",
        "{Entity} decomposition",
        "What is the decomposition for {Entity}",
        "What's the decomposition for {Entity}",
        "Tell me {Entity} decomposition",
        "Tell me about the decomposition of {Entity}",
        "Tell me the decomposition of {Entity}",
        "Tell me about the decomposition for {Entity}",
        "Tell me the decomposition for {Entity}",
        "Tell me about the decomposition {Entity}",
        "Tell me the decomposition {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "DensityIntent",
      "samples": [
        "What is the density of {Entity}",
        "What's the density of {Entity}",
        "Lookup {Entity} density",
        "Lookup the {Entity} density",
        "Tell me {Entity} density",
        "Tell me about {Entity} density",
        "What is {Entity} density",
        "What is the density for {Entity}",
        "What's the density for {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "ExplosionsHazardIntent",
      "samples": [
        "What are the explosion hazards of {Entity}",
        "What is the explosion hazards of {Entity}",
        "Will {Entity} explode",
        "What's the explosion harzard of {Entity}",
        "Tell me about the explosiveness of {Entity}",
        "Tell me about the explosion hazards of {Entity}",
        "Tell me the explosion harzards of {Entity}",
        "Is {Entity} explosive",
        "Are there any explosion harzards of {Entity}",
        "Is there any explosion harards of {Entity}",
        "Is there an explosion hazard of {Entity}",
        "Are there any explosion hazards when using {Entity}",
        "Is there any explosion hazards with using {Entity}",
        "{Entity} explosiveness",
        "{Entity} explosion harzards"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "EyeFirstAidIntent",
      "samples": [
        "What is the eye first aid for {Entity}",
        "What's the eye first aid for {Entity}",
        "What is the eye first aid of {Entity}",
        "What should I do if I got {Entity} in my eye",
        "What should I do if I get {Entity} in my eye",
        "What should I do if I got {Entity} in the eye",
        "What should I do if I get {Entity} in the eye",
        "How should I rinse my eye",
        "How should I rinse out my eye",
        "What is {Entity} eye first aid",
        "What's {Entity} first aid",
        "I got {Entity} in my eye",
        "I spilled {Entity} in my eye",
        "{Entity} in eye",
        "{Entity} eye first aid"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "FireHazardIntent",
      "samples": [
        "What is the fire hazard for {Entity}",
        "What's the fire hazard of {Entity}",
        "What's the fire hazard for {Entity}",
        "What is the fire hazard of {Entity}",
        "Is {Entity} a fire hazard",
        "Will {Entity} start a fire"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "FirePotentialIntent",
      "samples": [
        "What is the fire potential of {Entity}",
        "What's the fire potential of {Entity}",
        "Is there a fire potential with {Entity}",
        "What's {Entity} fire potential",
        "What is {Entity} fire potential",
        "What's the fire potential for {Entity}",
        "What is the fire potential for {Entity}",
        "Is {Entity} a fire potential",
        "Can {Entity} start a fire",
        "{Entity} fire potential",
        "Tell me about the fire potential of {Entity}",
        "Tell me the fire potential of {Entity}",
        "Will {Entity} cause a fire"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "FirstAidIntent",
      "samples": [
        "What is the first aid for {Entity}",
        "What's the first aid for {Entity}",
        "What is the first aid of {Entity}",
        "What's the first aid of {Entity}",
        "What's {Entity} first aid",
        "What is {Entity} first aid",
        "Tell me the first aid for {Entity}",
        "Tell me the first aid of {Entity}",
        "Tell me about the first aid of {Entity}",
        "Tell me about the first aid for {Entity}",
        "What are the first aid procedures for {Entity}",
        "What is the first aid procedure for {Entity}",
        "{Entity} first aid",
        "I need first aid for {Entity}",
        "I need first aid of {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "FlashPointIntent",
      "samples": [
        "What's the flash point of {Entity}",
        "What is the flash point of {Entity}",
        "What is the flash point for {Entity}",
        "What's the flash point for {Entity}",
        "What's the flashpoint of {Entity}",
        "What is the flashpoint of {Entity}",
        "What is the flashpoint for {Entity}",
        "What's the flashpoint for {Entity}",
        "Lookup the flashpoint for {Entity}",
        "Lookup the flash point for {Entity}",
        "Lookup the flashpoint of {Entity}",
        "Lookup the flash point of {Entity}",
        "{Entity} flash point",
        "{Entity} flashpoint",
        "What's {Entity} flashpoint",
        "What's {Entity} flash point",
        "What is {Entity} flashpoint",
        "What is {Entity} flash point",
        "Tell me {Entity} flash point",
        "Tell me {Entity} flashpoint",
        "Tell me about {Entity} flashpoint",
        "Tell me about {Entity} flash point"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HazardsSummaryIntent",
      "samples": [
        "What is the hazards summary of {Entity}",
        "What's the hazards summary of {Entity}",
        "Give me the hazards of {Entity}",
        "What are the hazards of {Entity}",
        "What is the hazards summary for {Entity}",
        "What's the hazards summary for {Entity}",
        "Give me the hazards summary for {Entity}",
        "Give me the hazards for {Entity}",
        "Tell me the hazards of {Entity}",
        "Tell me the hazards for {Entity}",
        "What are {Entity} hazards",
        "What is {Entity} hazards",
        "{Entity} hazards summary",
        "{Entity} hazards"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HealthHazardIntent",
      "samples": [
        "What is the health hazard of {Entity}",
        "What's the health hazard of {Entity}",
        "What are the health hazards of {Entity}",
        "What are the health hazards for {Entity}",
        "What are {Entity} health hazards",
        "What is {Entity} health hazards",
        "Tell me about {Entity} health hazards",
        "Tell me {Entity} health hazards",
        "What's the health hazards of {Entity}",
        "What is the health hazards of {Entity}",
        "What is the health hazard for {Entity}",
        "What's the health hazard for {Entity}",
        "Look up {Entity} health hazards",
        "Lookup {Entity} health hazards",
        "Lookup {Entity} health hazard"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HeatOfCombustionIntent",
      "samples": [
        "What is the heat of combustion of {Entity}",
        "What's the heat of combustion of {Entity}",
        "What is {Entity} heat of combustion",
        "What's {Entity} heat of combustion",
        "{Entity} heat of combustion",
        "Lookup {Entity} heat of combustion",
        "Look up {Entity} heat of combustion",
        "Tell me the heat of combustion of {Entity}",
        "Tell me about the heat of combustion of {Entity}",
        "What is the heat of combustion for {Entity}",
        "What's the heat of combustion for {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HeatOfVaporizationIntent",
      "samples": [
        "What is the heat of vaporization of {Entity}",
        "What's the heat of vaporization of {Entity}",
        "What is the heat of vaporization for {Entity}",
        "What's the heat of vaporization for {Entity}",
        "What's {Entity} heat of vaporization",
        "What is {Entity} heat of vaporization",
        "Tell me the heat of vaporization for {Entity}",
        "Lookup the heat of vaporization for {Entity}",
        "Look up the heat of vaporization for {Entity}",
        "Tell me about the heat of vaporization of {Entity}",
        "Tell me about the heat of vaporization for {Entity}",
        "{Entity} heat of vaporization",
        "Lookup {Entity} heat of vaporization"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HydrogenBondAcceptorCountIntent",
      "samples": [
        "What is the hydrogen bond acceptor count of {Entity}",
        "What's the hydrogen bond acceptor count of {Entity}",
        "What is the hydrogen bond acceptor count for {Entity}",
        "What's the hydrogen bond acceptor count for {Entity}",
        "Look up the hydrogen bond acceptor count of {Entity}",
        "Lookup the hydrogen bond acceptor count for {Entity}",
        "What's {Entity} hydrogen bond acceptor count",
        "What is {Entity} hydrogen bond acceptor count",
        "{Entity} hydrogen bond acceptor count",
        "Tell me {Entity} hydrogen bond acceptor count",
        "Tell me about {Entity} hydrogen bond acceptor count"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "HydrogenBondDonorCount",
      "samples": [
        "What's the hydrogen bond donor count of {Entity}",
        "What is the hydrogen bond donor count of {Entity}",
        "What is the hydrogen bond donor count for {Entity}",
        "What's the hydrogen bond donor count for {Entity}",
        "What is {Entity} hydrogen bond donor count",
        "What's {Entity} hydrogen bond donor count",
        "{Entity} hydrogen bond donor count",
        "Tell me the hydrogen bond donor count of {Entity}",
        "Tell me the hydrogen bond donor count for {Entity}",
        "Lookup the hydrogen bond donor count for {Entity}",
        "Look up the hydrogen bond donor count for {Entity}",
        "Lookup the hydrogen bond donor count of {Entity}",
        "Look up the hydrogen bond donor count of {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "InchiIntent",
      "samples": [
        "What's the inchi for {Entity}",
        "What is the inchi for {Entity}",
        "What's the inchi of {Entity}",
        "What is the inchi of {Entity}",
        "What's {Entity} inchi",
        "What is {Entity} inchi",
        "Look up {Entity} inchi",
        "Lookup {Entity} inchi",
        "{Entity} inchi"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "InchiKeyIntent",
      "samples": [
        "What is the inchi key of {Entity}",
        "What's the inchi key of {Entity}",
        "What's the inchi key for {Entity}",
        "What is the inchi key for {Entity}",
        "Lookup the inchi key of {Entity}",
        "Lookup the inchi key for {Entity}",
        "{Entity} inchi key",
        "What's {Entity} inchi key",
        "What is {Entity} inchi key"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "IngestionFirstAidIntent",
      "samples": [
        "What is the ingestion first aid for {Entity}",
        "What's the ingestion first aid for {Entity}",
        "What's the ingestion first aid of {Entity}",
        "What is the ingestion first aid of {Entity}",
        "Tell me the ingestion first aid for {Entity}",
        "Tell me the ingestion first aid of {Entity}",
        "What {Entity} ingestion first aid",
        "What is {Entity} ingestion first aid",
        "Help I ingested {Entity}",
        "{Entity} ingestion first aid"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "InhalationFirstAidIntent",
      "samples": [
        "What is the inhalation first aid of {Entity}",
        "What's the inhalation first aid of {Entity}",
        "What's the inhalation first aid for {Entity}",
        "What is the inhalation first aid for {Entity}",
        "Tell me the inhalation first aid of {Entity}",
        "Tell me the inhalation first aid for {Entity}",
        "What's {Entity} inhalation first aid",
        "What is {Entity} inhalation first aid",
        "Help I inhaled {Entity}",
        "{Entity} inhalation first aid"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "InventoryItemLocationIntent",
      "samples": [
        "Where are some {ProductName}",
        "Where is {ProductName}",
        "What shelf is {ProductName} on",
        "Help me find a product",
        "Help me find something",
        "Help me locate something",
        "Help me locate a product",
        "I need help with Inventory",
        "Inventory",
        "Help me find my {ProductName}",
        "Help me locate my {ProductName}",
        "Where can I find my {ProductName}",
        "I need help finding {ProductName}",
        "Where is my {ProductName}",
        "Where are my {ProductName}",
        "Where are some of my {ProductName}",
        "I can't find {ProductName}",
        "I can't find where {ProductName} is",
        "I'm missing {ProductName}",
        "I'm missing my {ProductName}"
      ],
      "slots": [
        {
          "name": "ProductName",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "IonizationPotentialIntent",
      "samples": [
        "What is the ionization potential of {Entity}",
        "What's the ionization potential of {Entity}",
        "What is the ionization potential for {Entity}",
        "What's the ionization potential for {Entity}",
        "Tell me the ionization potential for {Entity}",
        "Tell me the ionization potential of {Entity}",
        "Tell me about the ionization potential of {Entity}",
        "What's {Entity} ionization potential",
        "What is {Entity} ionization potential",
        "Lookup {Entity} ionization potential",
        "Look up {Entity} ionization potential",
        "{Entity} ionization potential"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "IUPACNameIntent",
      "samples": [
        "What's the IUPac Name of {Entity}",
        "What is the IUPac Name of {Entity}",
        "What is the IUPac Name for {Entity}",
        "What's the IUPac Name for {Entity}",
        "Lookup the IUPac Name for {Entity}",
        "Look up the UIPac Name for {Entity}",
        "What is {Entity} IUPac Name",
        "What's {Entity} UIPac name",
        "{Entity} UIPac name"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "LogPIntent",
      "samples": [
        "What is the log p. of {Entity}",
        "What's the log p. of {Entity}",
        "Look up the log p. of {Entity}",
        "Lookup the log p. of {Entity}",
        "Tell me the log p. of {Entity}",
        "What is the log p. for {Entity}",
        "What's the log p. for {Entity}",
        "Look up the log p. for {Entity}",
        "Lookup the log p. for {Entity}",
        "What is {Entity} log p.",
        "What's {Entity} log p.",
        "{Entity} log p.",
        "What is the Partition coefficient of {Entity}",
        "What's the Partition coefficient of {Entity}",
        "Tell me the partition coefficient of {Entity}",
        "Lookup the partition coefficient of {Entity}",
        "Look up the partition coefficient of {Entity}",
        "What is the Partition coefficient for {Entity}",
        "What's the Partition coefficient for {Entity}",
        "Tell me the Partition coefficient for {Entity}",
        "Lookup the Partition coefficient for {Entity}",
        "Look up the Partition coefficient for {Entity}",
        "What is {Entity} Partition coefficient",
        "What's {Entity} Partition coefficient",
        "Tell me {Entity} Partition coefficient",
        "Lookup {Entity} Partition coefficient",
        "Look up {Entity} Partition coefficient",
        "{Entity} Partition coefficient"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "MeltingPointIntent",
      "samples": [
        "What is the melting point of {Entity}",
        "What's the melting point of {Entity}",
        "What is the melting point for {Entity}",
        "What's the melting point for {Entity}",
        "Lookup the melting point of {Entity}",
        "Look up the melting point of {Entity}",
        "Lookup the melting point for {Entity}",
        "Look up the melting point for {Entity}",
        "What's {Entity} melting point",
        "What is {Entity} melting point",
        "{Entity} melting point",
        "Tell me the melting point for {Entity}",
        "Tell me the melting point of {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "MolecularWeightIntent",
      "samples": [
        "What is the molecular weight of {Entity}",
        "What's the molecular weight of {Entity}",
        "Look up the molecular weight of {Entity}",
        "Lookup the molecular weight of {Entity}",
        "Tell me the molecular weight of {Entity}",
        "What is the molecular weight for {Entity}",
        "What's the molecular weight for {Entity}",
        "Look up the molecular weight for {Entity}",
        "Lookup the molecular weight for {Entity}",
        "Tell me the molecular weight for {Entity}",
        "What's {Entity} molecular weight",
        "What is {Entity} molecular weight",
        "{Entity} molecular weight",
        "Lookup {Entity} molecular weight",
        "Look up {Entity} molecular weight",
        "Tell me {Entity} molecular weight"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "NextStepIntent",
      "samples": [
        "Next {StepType}",
        "OK now what",
        "Next step please",
        "Tell me the next",
        "Tell me the next step",
        "Helix what's the next step ",
        "Say the next step",
        "Give me the next step"
      ],
      "slots": [
        {
          "name": "StepType",
          "type": "STEPTYPE",
          "samples": []
        }
      ]
    },
    {
      "name": "OdorIntent",
      "samples": [
        "What is the odor of {Entity}",
        "What's the odor of {Entity}",
        "Describe the odor of {Entity}",
        "What is the odor for {Entity}",
        "What's the odor for {Entity}",
        "Describe the odor for {Entity}",
        "What's {Entity} odor",
        "What is {Entity} odor",
        "{Entity} odor",
        "Tell me about the odor {Entity}",
        "Tell me the odor {Entity}",
        "Tell me the odor of {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "OdorThresholdIntent",
      "samples": [
        "What's the odor threshold for {Entity}",
        "What is the odor threshold for {Entity}",
        "What's the odor threshold of {Entity}",
        "What is the odor threshold of {Entity}",
        "Lookup the odor threshold of {Entity}",
        "Look up the odor threshold of {Entity}",
        "Tell me the odor threshold of {Entity}",
        "Tell me the odor threshold for {Entity}",
        "What is {Entity} odor threshold",
        "What's {Entity} odor threshold",
        "{Entity} odor threshold",
        "Tell me {Entity} odor threshold",
        "Look up {Entity} odor threshold",
        "Lookup {Entity} odor threshold"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "PageIntent",
      "samples": [
        "I need {Name}",
        "Can you get {Name} ",
        "Page {Name}",
        "Get {Name}",
        "To Get {Name} ",
        "Get Help",
        "I Need Help",
        "I need assistance",
        "Oh Fuck",
        "I fucked up"
      ],
      "slots": [
        {
          "name": "Name",
          "type": "AMAZON.US_FIRST_NAME",
          "samples": [
            "{Name}"
          ]
        }
      ]
    },
    {
      "name": "PhysicalDescriptionIntent",
      "samples": [
        "What is the physical description of {Entity}",
        "What's the physical description of {Entity}",
        "Tell me about {Entity}",
        "Describe {Entity}",
        "Look up {Entity}",
        "What do you know about {Entity}",
        "Do you know about {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "PlayVideoIntent",
      "samples": [
        "Play my video"
      ],
      "slots": []
    },
    {
      "name": "PreviousStepIntent",
      "samples": [
        "Previous {StepType}",
        "Helix go back a step",
        "Go back one step",
        "Go one step back",
        "One step back please",
        "Please go back a step",
        "Helix please go back a step",
        "Go back a step",
        "Tell me the previous step",
        "Please tell me the previous step",
        "Go back to the previous step"
      ],
      "slots": [
        {
          "name": "StepType",
          "type": "STEPTYPE",
          "samples": []
        }
      ]
    },
    {
      "name": "ProtocolIntent",
      "samples": [
        "What's the protocol for {ProtocolName}",
        "What is the protocol for a {ProtocolName}",
        "How do I do a {ProtocolName}",
        "Help me do a {ProtocolName}",
        "How do I do {ProtocolName}",
        "Help me do {ProtocolName}",
        "Help me with a {ProtocolName}",
        "Start a protocol",
        "Lookup a protocol",
        "Let's do a protocol",
        "Help me with a protocol",
        "I need to do a protocol",
        "I need help with a protocol",
        "How do I make a {ProtocolName} with {FirstEnzyme} and {SecondEnzyme}",
        "How do i make a {ProtocolName} with {FirstEnzyme}",
        "How do i make a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "How do I make a {ProtocolName} using {FirstEnzyme}",
        "How do I make a {ProtocolType} {ProtocolName} with {FirstEnzyme}",
        "How do I make a {ProtocolType} {ProtocolName} with {FirstEnzyme} and {SecondEnzyme}",
        "Help me with a {ProtocolName} using {FirstEnzyme}",
        "Help me with a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "Let's do a {ProtocolName} using {FirstEnzyme}",
        "Let's do {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What is the protocol for a {ProtocolName} using {FirstEnzyme}",
        "What is the protocol for {ProtocolName} using {FirstEnzyme}",
        "What is the protocol for a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What is the protocol for {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What's the protocol for {ProtocolName} using {FirstEnzyme}",
        "What's the protocol for {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What's the protocol for a {ProtocolName} using {FirstEnzyme}",
        "What's the protocol for a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What's the protocol for {ProtocolType} {ProtocolName}",
        "What's the protocol for {ProtocolType} {ProtocolName} using {FirstEnzyme}",
        "What's the protocol for {ProtocolType} {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "What's the protocol for a {ProtocolType} {ProtocolName} using {FirstEnzyme}",
        "What's the protocol for a {ProtocolType} {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "I want to do a {ProtocolName}",
        "I want to do a {ProtocolType} {ProtocolName}",
        "I want to do a {ProtocolName} using {FirstEnzyme}",
        "I want to do a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "I want to do a {ProtocolType} {ProtocolName} using {FirstEnzyme}",
        "I want to do a {ProtocolType} {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "I need to do a {ProtocolName}",
        "I need to do {ProtocolName} using {FirstEnzyme}",
        "I need to do a {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}",
        "I need to do  {ProtocolName} using {FirstEnzyme}",
        "I need to do {ProtocolName} using {FirstEnzyme} and {SecondEnzyme}"
      ],
      "slots": [
        {
          "name": "ProtocolName",
          "type": "PROTOCOL",
          "samples": []
        },
        {
          "name": "ProtocolType",
          "type": "PROTOCOLTYPE",
          "samples": []
        },
        {
          "name": "FirstEnzyme",
          "type": "ENTITY",
          "samples": []
        },
        {
          "name": "SecondEnzyme",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "RecipeIntent",
      "samples": [
        "Start a Recipe",
        "Make a solution",
        "Help me make a solution",
        "Tell me how to make a solution",
        "Start a solution for a recipe"
      ],
      "slots": [
        {
          "name": "RecipeName",
          "type": "SOLUTION",
          "samples": [
            "{RecipeName}"
          ]
        },
        {
          "name": "SendRecipe",
          "type": "OKTYPE",
          "samples": []
        }
      ]
    },
    {
      "name": "RecordNoteIntent",
      "samples": [
        "Record a note",
        "Start a new note",
        "Take a note",
        "Record"
      ],
      "slots": [
        {
          "name": "note",
          "type": "NOTE",
          "samples": [
            "{note}"
          ]
        }
      ]
    },
    {
      "name": "RepeatIntent",
      "samples": [
        "Repeat {StepType}",
        "Please repeat the step",
        "Repeat current step",
        "Repeat current step pleas",
        "Repeat again the step",
        "Helix tell me the step again",
        "Helix repeat the step for me",
        "Helix repeat me the step",
        "Repeat the step"
      ],
      "slots": [
        {
          "name": "StepType",
          "type": "STEPTYPE",
          "samples": []
        }
      ]
    },
    {
      "name": "SkinEyeRespiratoryIntent",
      "samples": [
        "What is the skin eye and respiratory irratations for {Entity} ",
        "What's the skin eye and respiratory irratations for {Entity}",
        "What are the irratations of {Entity}",
        "What are the skin irratations of {Entity}",
        "What are the eye irratations of {Entity}",
        "What are the respiratory irratations of {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "SkinFirstAidIntent",
      "samples": [
        "What is the skin first aid of {Entity}",
        "What's the skin first aid of {Entity}",
        "Tell me the skin first aid of {Entity}",
        "Look up the skin first aid of {Entity}",
        "Lookup the skin first aid of {Entity}",
        "What is the skin first aid for {Entity}",
        "What's the skin first aid for {Entity}",
        "Tell me the skin first aid for {Entity}",
        "Look up the skin first aid for {Entity}",
        "Lookup the skin first aid for {Entity}",
        "What is {Entity} skin first aid",
        "What's {Entity} skin first aid",
        "Lookup {Entity} skin first aid",
        "Look up {Entity} skin first aid",
        "Help I got {Entity} on my skin",
        "I got {Entity} on my skin",
        "I spilled {Entity} on my skin",
        "Help I spilled {Entity} on my skin"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "SolubilityIntent",
      "samples": [
        "What's the solubility of {Entity}",
        "What is the solubility of {Entity}",
        "What's the solubility for {Entity}",
        "What is the solubility for {Entity}",
        "Look up the solubility of {Entity}",
        "Lookup the solubility of {Entity}",
        "Tell me the solubility of {Entity}",
        "Tell me about the solubility of {Entity}",
        "Look up the solubility for {Entity}",
        "Lookup the solubility for {Entity}",
        "Tell me about the solubility for {Entity}",
        "Tell me the solubility for {Entity}",
        "What's {Entity} solubility",
        "What is {Entity} solubility",
        "Tell me {Entity} solubility",
        "Lookup {Entity} solubility",
        "Look up {Entity} solubility",
        "{Entity} solubility"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "SurfaceTensionIntent",
      "samples": [
        "What is the surface tension of {Entity}",
        "What's the surface tension of {Entity}",
        "Tell me the surface tension of {Entity}",
        "Look up the surface tension of {Entity}",
        "Lookup the surface tension of {Entity}",
        "What is {Entity} surface tension",
        "What's {Entity} surface tension",
        "Tell me {Entity} surface tension",
        "Look up {Entity} surface tension",
        "Lookup {Entity} surface tension",
        "What is the surface tension for {Entity}",
        "What's the surface tension for {Entity}",
        "Tell me the surface tension for {Entity}",
        "Look up the surface tension for {Entity}",
        "Lookup the surface tension for {Entity}",
        "{Entity} surface tension"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "ThanksIntent",
      "samples": [
        "Thanks",
        "Thank you",
        "Thanks Helix",
        "Gracias",
        "Thanks a lot",
        "Thank you very much",
        "Many thanks"
      ],
      "slots": []
    },
    {
      "name": "VaporDensityIntent",
      "samples": [
        "What's the vapor density of {Entity}",
        "What is the vapor density of {Entity}",
        "Tell me the vapor density of {Entity}",
        "Look up the vapor density of {Entity}",
        "Lookup the vapor density of {Entity}",
        "What's the vapor density for {Entity}",
        "What is the vapor density for {Entity}",
        "Tell me the vapor density for {Entity}",
        "Look up the vapor density for {Entity}",
        "Lookup the vapor density for {Entity}",
        "What is {Entity} vapor density",
        "What's {Entity} vapor density",
        "Tell me {Entity} vapor density",
        "Look up {Entity} vapor density",
        "Lookup {Entity} vapor density",
        "{Entity} vapor density"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "VaporPressureIntent",
      "samples": [
        "What is the vapor pressure of {Entity}",
        "What's the vapor pressure of {Entity}",
        "Tell me the vapor pressure of {Entity}",
        "Tell me about the vapor pressure of {Entity}",
        "Lookup the vapor pressure of {Entity}",
        "Look up the vapor pressure of {Entity}",
        "What is the vapor pressure for {Entity}",
        "What's the vapor pressure for {Entity}",
        "Tell me the vapor pressure for {Entity}",
        "Tell me about the vapor pressure for {Entity}",
        "Lookup the vapor pressure for {Entity}",
        "Look up the vapor pressure for {Entity}",
        "What is {Entity} vapor pressure",
        "What's {Entity} vapor pressure",
        "Lookup {Entity} vapor pressure",
        "Look up {Entity} vapor pressure",
        "Tell me {Entity} vapor pressure",
        "{Entity} vapor pressure"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "ViscosityIntent",
      "samples": [
        "What is the viscosity of {Entity}",
        "What's the viscosity of {Entity}",
        "What's the viscosity for {Entity}",
        "What is the viscosity for {Entity}",
        "Lookup the viscosity of {Entity}",
        "Look up the viscosity of {Entity}",
        "Tell me the viscosity of {Entity}",
        "Tell me about the viscosity of {Entity}",
        "What is {Entity} viscosity",
        "What's {Entity} viscosity",
        "Lookup {Entity} viscosity",
        "Look up {Entity} viscosity",
        "{Entity} viscosity",
        "Lookup the viscosity for {Entity}",
        "Look up the viscosity for {Entity}",
        "Tell me the viscosity for {Entity}",
        "Tell me about the viscosity for {Entity}"
      ],
      "slots": [
        {
          "name": "Entity",
          "type": "ENTITY",
          "samples": []
        }
      ]
    },
    {
      "name": "WhatsNewIntent",
      "samples": [
        "What's new Helix",
        "Tell Me What's New",
        "What's new today"
      ],
      "slots": []
    }
  ],
  "types": [
    {
      "name": "AMAZON.US_FIRST_NAME",
      "values": [
        {
          "id": null,
          "name": {
            "value": "DeLacy",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Dr Rhodes",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "AMOUNT",
      "values": [
        {
          "id": null,
          "name": {
            "value": "1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "1.25",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "1.5",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "1.75",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "2",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".5",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".24",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".12",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "10",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".4",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".3",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".2",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".6",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".7",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".8",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".9",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".33",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".58",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": ".76",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "10.2",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "100.66",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "CALCULATIONNAME",
      "values": [
        {
          "id": "MassFromVolumeAndConcentration",
          "name": {
            "value": "calculate mass from volume and concentration",
            "synonyms": []
          }
        },
        {
          "id": "VolumeFromMassAndConcentration",
          "name": {
            "value": "calculate volume from mass and concentration",
            "synonyms": []
          }
        },
        {
          "id": "ConcentrationFromMassAndVolume",
          "name": {
            "value": "calculate concentration from mass and volume",
            "synonyms": []
          }
        },
        {
          "id": "DiluteSolution",
          "name": {
            "value": "dilute a solution",
            "synonyms": [
              "dilute my solution"
            ]
          }
        },
        {
          "id": "CellConcentration",
          "name": {
            "value": "calculate cell concentration",
            "synonyms": [
              "calculate cell concentrations"
            ]
          }
        },
        {
          "id": "ChangeConcentration",
          "name": {
            "value": "change the concentration of a solution",
            "synonyms": []
          }
        },
        {
          "id": "ChangeVolume",
          "name": {
            "value": "change the volume of a solution",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "CALCULATIONTYPE",
      "values": [
        {
          "id": null,
          "name": {
            "value": "Molarity",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "ENTITY",
      "values": [
        {
          "id": null,
          "name": {
            "value": "AGE1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "AAT2",
            "synonyms": []
          }
        },
        {
          "id": "",
          "name": {
            "value": "BAE1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "BAMH1 HF",
            "synonyms": [
              "BAMH1HF",
              "BAMH1 HF"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "BBS1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "BGL2",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "BSA1 HF",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "BSTB1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "DPN1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "DPN2",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "ECOP151",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "HIND3",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "KPN1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "MSL1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "NOT1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "NTBSTNB",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "SML1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "SSP1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "XBA1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "XHO1",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "ECOR1 HF",
            "synonyms": [
              "ECOR1HF",
              "ECOR1 HF",
              "echo R 1 HF",
              "echo R1 HF"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "SAL1 HF",
            "synonyms": [
              "SAL1 HF",
              "SAL1HF",
              "sal 1 HF",
              "sal one HF"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "KPN1 HF",
            "synonyms": [
              "KPN1 HF",
              "KPN1HF"
            ]
          }
        }
      ]
    },
    {
      "name": "NOTE",
      "values": [
        {
          "id": null,
          "name": {
            "value": "welcome shown alike already breath powder",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "fifty recently space beneath successful cake method similar",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "rock school here stems melted",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "ill cut habit bear adult",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "single hot",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "hope plastic copper higher wing nearest else",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "baseball event instrument tool car",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "wagon region",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "heat explore think tune noun paid row wooden",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "beside smell opposite carry radio sport dinner",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "doing tea hunt chance win average making",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "stomach live moving plates universe",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "swept health force feature vapor government",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "pan earn",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "ability party maybe stone empty shown window lungs",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "dozen force money cover using science",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "fallen radio morning where combination animal think",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "safety even highest pet finally count safe excitement",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "power after rest street forgot once team",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "baseball circus sent begun",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "boy motor gave",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "concerned consider high",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "got particular therefore force larger",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "doubt dollar goose",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "turn own instead bare produce",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "relationship manufacturing perfect news escape",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "explanation rubbed bent hole military instance",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "rough but dry feature island college",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "face sharp giving force breathing sold",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "buried sale silent variety speed snake hour guide",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "sell which kids adjective lead strike happy",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "whom sum ride natural slide",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "black front close mighty most zoo",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "follow grass come breakfast",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "large month",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "winter weak lot such brass bright softly",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "colony basic prevent pull torn orange",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "anyway construction condition shaking early shop",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "himself settle attached discover tiny",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "fire laid shout slip dog uncle judge after",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "OKTYPE",
      "values": [
        {
          "id": null,
          "name": {
            "value": "Remind Me",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Send",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "PROPERTY",
      "values": [
        {
          "id": "",
          "name": {
            "value": "odor",
            "synonyms": [
              "odor"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "color",
            "synonyms": [
              "color"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "cas",
            "synonyms": [
              "cas number",
              "cas"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "inchi",
            "synonyms": [
              "inchi"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "vapor pressure",
            "synonyms": [
              "vapor pressure"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "logp",
            "synonyms": [
              "logp"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "auto ignition",
            "synonyms": [
              "auto ignition"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "surface tension",
            "synonyms": [
              "surface tension"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "explosion hazard",
            "synonyms": [
              "explosion hazard"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "inhalation first aid",
            "synonyms": [
              "inhalation first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "density",
            "synonyms": [
              "density"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "ionization potential",
            "synonyms": [
              "ionization potential"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "hazards summary",
            "synonyms": [
              "hazards",
              "hazards summary"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "skin first aid",
            "synonyms": [
              "skin first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "vapor density",
            "synonyms": [
              "vapor density"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "viscosity",
            "synonyms": [
              "viscosity"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "odor threshold",
            "synonyms": [
              "odor threshold"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "fire potential",
            "synonyms": [
              "fire potential"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "eye first aid",
            "synonyms": [
              "eye first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "heat of combustion",
            "synonyms": [
              "heat of combustion"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "health hazard",
            "synonyms": [
              "health hazard"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "skin, eye, and respiratory irritations",
            "synonyms": [
              "skin eye and respitory first aid",
              "skin eye and respiratory first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "ingestion first aid",
            "synonyms": [
              "ingestion first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "heat of vaporization",
            "synonyms": [
              "heat of vaporization"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "fire hazard",
            "synonyms": [
              "fire hazard"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "first aid",
            "synonyms": [
              "first aid"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "flash point",
            "synonyms": [
              "flash point",
              "flashpoint"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "iupac name",
            "synonyms": [
              "iupac name"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "molecular weight",
            "synonyms": [
              "molecular weight",
              "molecular mass",
              "molar mass",
              "weight",
              "molecular"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "hydrogen bond donor count",
            "synonyms": [
              "hydrogen bond donor count"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "inchi key",
            "synonyms": [
              "inchi key"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "boiling point",
            "synonyms": [
              "boiling point",
              "boiling pt"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "decomposition",
            "synonyms": [
              "decomposition"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "melting point",
            "synonyms": [
              "melting point"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "solubility",
            "synonyms": [
              "solubility"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "canonical smiles",
            "synonyms": [
              "canonical smiles"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "hydrogen bond acceptor count",
            "synonyms": [
              "hydrogen bond acceptor count"
            ]
          }
        },
        {
          "id": "",
          "name": {
            "value": "physical description",
            "synonyms": [
              "physical description",
              "what's it like"
            ]
          }
        }
      ]
    },
    {
      "name": "PROTOCOL",
      "values": [
        {
          "id": null,
          "name": {
            "value": "E coli competent cell preparation",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Purification of DNA from agarose",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Oligonucleotide Purification",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "phosphomolybdic acid TLC stain",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "CAT ELISA",
            "synonyms": [
              "cat elisa"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "Quick Ligation",
            "synonyms": []
          }
        },
        {
          "id": "",
          "name": {
            "value": "restriction enzyme digest",
            "synonyms": [
              "restriction enzyme digest",
              "restriction digest"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "Ethyl Acetate Extraction",
            "synonyms": [
              "ethyl acetate extraction"
            ]
          }
        },
        {
          "id": null,
          "name": {
            "value": "ninhydrin TLC stain",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Alkyne V X 7 70 Iodination",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "bromocresol green TLC stain",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "PROTOCOLTYPE",
      "values": [
        {
          "id": null,
          "name": {
            "value": "single",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "double",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "SOLUTION",
      "values": [
        {
          "id": null,
          "name": {
            "value": "Coomassie Blue Stain",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Coommassie Destain",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "DEPC treated Water",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "10 X DNA Loading Dve",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Point 5 Molar EDTA",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Ethidium Bromide",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "LB Broth with Ampicillin",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "LB Agar",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "5 X P Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "1 X PBS T Milk",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "0.1 Percent Ponceau Stain",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "20 X SSC",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "50 X TAE",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "10 X TBE Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "New Recipe",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "TE Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "8X Transfer Buffer Stock",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "1X Transfer Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Elisa Carbonate Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Elisa Citrate Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Elisa ABTA",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Elisa Chromagenic Substrate",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Protein Purification 8X Binding Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Protein Purification 8X Wash Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Protein Purification 4X Elution Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Protein Purification 8X Charge Buffer",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Test Recipe",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "STEPTYPE",
      "values": [
        {
          "id": null,
          "name": {
            "value": "Step",
            "synonyms": []
          }
        }
      ]
    },
    {
      "name": "UNIT",
      "values": [
        {
          "id": null,
          "name": {
            "value": "Kilograms",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Microgram",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Milligram",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilogram",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Ounces",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Pounds",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Millimeter",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Centimeter",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Meter",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Inches",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Feet",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "MIles",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Millimeters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Centrimeters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Meters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Hectare",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Kilometers",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Inches",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Feet",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Acre",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Square Miles",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Millimeters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic centimeters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Milliliters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Liters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Meters",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Kilometers",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Teaspoon",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Tablespoon",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Inches",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Fluid Ounces",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cups",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Pint",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Quart",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Gallon",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Feet",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Cubic Yard",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Celsius",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Fahrenheit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kelvin",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Nanoseconds",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Microseconds",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Milliseconds",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Seconds",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Minutes",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Hours",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Days",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Weeks",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Months",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Year",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Miles Per Second",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilometers per hour",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Miles Per Hour",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Knots",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Feet Per Second",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Pascal",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Hectopascals",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilopascals",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Megapascal",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Bars",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Torrs",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Pounds per square inch",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilopounds per square inch",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Byte",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilobyte",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Megabyte",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Gigabyte",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Terabyte",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Bit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Kilobit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Megabit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Gigabit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Terabit",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Parts Per Million",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Parts Per Billion",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Parts Per Trillion",
            "synonyms": []
          }
        },
        {
          "id": null,
          "name": {
            "value": "Parts Per Quadrillion",
            "synonyms": []
          }
        }
      ]
    }
  ],
  "prompts": [
    {
      "id": "Elicit.Intent-CalculationIntent.IntentSlot-CalculationName",
      "promptVersion": "1.0",
      "definitionVersion": "1.0",
      "variations": [
        {
          "type": "PlainText",
          "value": "{CalculationName}"
        },
        {
          "type": "PlainText",
          "value": "I need to {CalculationName}"
        }
      ]
    },
    {
      "id": "Elicit.Intent-PageIntent.IntentSlot-Name",
      "promptVersion": "1.0",
      "definitionVersion": "1.0",
      "variations": [
        {
          "type": "PlainText",
          "value": "Who should I get?"
        }
      ]
    },
    {
      "id": "Elicit.Intent-RecipeIntent.IntentSlot-RecipeName",
      "promptVersion": "1.0",
      "definitionVersion": "1.0",
      "variations": [
        {
          "type": "PlainText",
          "value": "Which solution?"
        }
      ]
    },
    {
      "id": "Elicit.Intent-RecordNoteIntent.IntentSlot-note",
      "promptVersion": "1.0",
      "definitionVersion": "1.0",
      "variations": [
        {
          "type": "PlainText",
          "value": "OK, start recording your note?"
        }
      ]
    }
  ],
  "dialog": {
    "version": "1.0",
    "intents": [
      {
        "name": "CalculationIntent",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "CalculationName",
            "type": "CALCULATIONNAME",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicit": "Elicit.Intent-CalculationIntent.IntentSlot-CalculationName"
            }
          },
          {
            "name": "CalculationType",
            "type": "CALCULATIONTYPE",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          },
          {
            "name": "Mass",
            "type": "AMOUNT",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          },
          {
            "name": "Volume",
            "type": "AMOUNT",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          },
          {
            "name": "Concentration",
            "type": "AMOUNT",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          }
        ]
      },
      {
        "name": "PageIntent",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "Name",
            "type": "AMAZON.US_FIRST_NAME",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicit": "Elicit.Intent-PageIntent.IntentSlot-Name"
            }
          }
        ]
      },
      {
        "name": "RecipeIntent",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "RecipeName",
            "type": "SOLUTION",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicit": "Elicit.Intent-RecipeIntent.IntentSlot-RecipeName"
            }
          },
          {
            "name": "SendRecipe",
            "type": "OKTYPE",
            "elicitationRequired": false,
            "confirmationRequired": false,
            "prompts": {}
          }
        ]
      },
      {
        "name": "RecordNoteIntent",
        "confirmationRequired": false,
        "prompts": {},
        "slots": [
          {
            "name": "note",
            "type": "NOTE",
            "elicitationRequired": true,
            "confirmationRequired": false,
            "prompts": {
              "elicit": "Elicit.Intent-RecordNoteIntent.IntentSlot-note"
            }
          }
        ]
      }
    ]
  }
}
