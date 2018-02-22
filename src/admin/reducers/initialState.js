export default {
  ajaxCallsInProgress: 0,
  networkError: false,
  allCustomSlotTypes: [],
  auth: {
    application: {},
    applications: [],
    currentUser: {},
    token: {},
    company: {
      inventories: [],
      keywords: [],
      contact: {
        first_name: "",
        last_name: "",
        email_address: "",
        phone_number: ""
      },
      physical_address: {
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        zip_code: ""
      },
      organization_users: []
    },
    companyOrders: [],
    labs: [],
    inventories: [],
    repositories: [],
    companies: [],
    lab: {
      lab_members: [],
      inventories: [],
      repositories: [],
      notes: [],
      orders: [],
      keywords: []
    },
    repository: {}
  },
  companyOrders: [],
  companyUsers: [],
  laboratory_profiles: [],
  skill_groups: [],
  repository_groups: [],
  repository_types: [],
  system: {
    attributes: []
  },
  page_state: {
    header: 'none',
    footer: true
  }
};
