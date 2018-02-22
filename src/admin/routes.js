import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';



import AuthHeader from './components/auth/Header';
import AdminHeader from './components/common/headers/AdminHeader';
import CompanyHeader from './components/common/headers/CompanyHeader';
import LaboratoryHeader from './components/common/headers/LaboratoryHeader';
import OnboardingHeader from './components/common/headers/OnboardingHeader';

import ApplicationHeader from './components/common/headers/ApplicationHeader';
import LabHeader from './components/common/headers/LabHeader';

import Footer from './components/common/Footer';

import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import AmazonAuthSuccess from './components/auth/AmazonAuthSuccess';

import OnboardingPage  from './components/onboarding/OnboardingPage';
import SetupVirtualAssistantPage from './components/onboarding/SetupVirtualAssistantPage';
import SetupLabPage from './components/onboarding/SetupLabPage';

import ApplicationBuildsPage from './components/applications/builds/BuildsPage';
import ManageAccessControlPage from './components/applications/access_control/ManageAccessControlPage';
import ManageAdvancedSettingsPage from './components/applications/advanced_settings/ManageAdvancedSettingsPage';
import ManageBetaTestingPage from './components/applications/beta_testing/ManageBetaTestingPage';
import ManageCertificationPage from './components/applications/certify/ManageCertificationPage';
import ManageSettingsPage from './components/applications/settings/ManageSettingsPage';
import ManageCustomSlotPage from './components/applications/custom_slots/ManageCustomSlotPage';

import LabsPage from './components/labs/LabPage';
import NewLabPage from './components/labs/new/SetupLabPage';
import SetupLabFlowPage from './components/labs/setup/SetupFlowPage';

import ApplicationsPage from './components/applications/ApplicationPage';
import SetupApplicationPage from './components/applications/new/SetupApplicationPage';
import ManageApplicationPage from './components/applications/ManageApplicationPage';
import DashboardPage from './components/dashboard/DashboardPage';

import CustomSlotsPage from './components/applications/custom_slots/CustomSlotsPage';
import ApplicationIntentsPage from './components/applications/intents/IntentsPage';
import ManageApplicationIntentsPage from './components/applications/intents/ManageIntentPage';

import ManageCompanyPage from './components/companies/profile/ManageCompanyPage';
import CompanyUserPage from './components/companies/users/UserPage';
import ManageCompanyUserPage from './components/companies/users/ManageUserPage';

// import CompanyUserList from './components/companies/users/CompanyUserList';

import CompanyRepositoryGroupsPage from './components/repository_groups/RepositoryGroupsPage';
import CompanyLaboratoryProfilePage from './components/companies/laboratory_profiles/LaboratoryProfilePage';
import ManageCompanyLaboratoryProfilePage from './components/companies/laboratory_profiles/ManageLaboratoryProfilePage';
import CompanySkillGroupPage from './components/companies/skill_groups/SkillGroupPage';
import ManageCompanySkillGroupPage from './components/companies/skill_groups/ManageSkillGroupPage';


import RepositoryPage from './components/repositories/RepositoryPage';
import AddRepositoryPage from './components/repositories/AddRepositoryPage';

import InventoryPage from './components/repositories/InventoryPage';
import AddInventoryPage from './components/repositories/AddInventoryPage';
import AddInventoryPageRoute from './components/repositories/AddInventoryPageRoute';

//import AddNewInventoryPage from './components/repositories/AddNewInventoryPage';

import LabRepositoryPage from './components/repositories/LabRepositoryPage';

import LabInventoryPage from './components/repositories/LabInventoryPage';

import ManageRepositoryPage from './components/repositories/ManageRepositoryPage';
import RepositoryItemsPage from './components/repositories/entities/RepositoryItemsPage';
import ManageRepositoryItemPage from './components/repositories/entities/ManageRepositoryItemPage';
import InventoryItemsPages from './components/repositories/entities/InventoryItemsPage';
import ManageInventoryItemPage from './components/repositories/entities/ManageInventoryItemPage';

import RepositoryPropertiesPage from './components/repositories/properties/PropertiesPage';
import ManageRepositoryPropertyPage from './components/repositories/properties/ManagePropertyPage';

import LabSetupApplicationPage from './components/applications/LabSetupApplicationPage';
import SetupPage from './components/labs/setup/SetupPage';
import ManageLabPage from './components/labs/ManageLabPage';
import LabActivityPage from './components/labs/activities/ActivityPage';
import LabMembersPage from './components/labs/members/RepositoriesPage';
import ManageLabMembersRepositoryPage from './components/labs/members/ManageRepositoryPage';
import LabMembersItemsPage from './components/labs/members/entities/EntitiesPage';
import ManageLabMemberPage from './components/labs/members/entities/ManageEntityPage';

import LabOrdersRepositoryPage from './components/repositories/OrdersRepositoryPage';


const OrdersItemsPages = require('./components/repositories/entities/OrdersItemsPage').default;


import LabNotesRepositoryPage from './components/repositories/NotesRepositoryPage';

import MembershipOrgPage from './components/labs/membership_orgs/MembershipOrgPage';
import VendorPage from './components/labs/vendors/VendorPage';
import QuickActionPage from './components/labs/quick_actions/QuickActionPage';

import AccessTokensPage from './components/system/access_tokens/AccessTokenPage';
import SystemApplicationsPage from './components/system/applications/ApplicationPage';
import SystemManageApplicationPage from './components/system/applications/ManageApplicationPage';
import IntentLogsPage from './components/system/reports/intentLogs/IntentLogsPage';
import ClientsPage from './components/system/clients/ClientsPage';
import ManageClientPage from './components/system/clients/ManageClientPage';
import CompanyPage from './components/system/companies/CompanyPage';
import SystemManageCompanyPage from './components/system/companies/ManageCompanyPage';
import IntentPage from './components/system/intents/IntentsPage';
import ManageIntentPage from './components/system/intents/ManageIntentPage';
import RepositoryTypesPage from './components/system/repository_types/RepositoryTypesPage';
import ManageRepositoryTypePage from './components/system/repository_types/ManageRepositoryTypePage';
import UsersPage from './components/system/users/UsersPage';
import AddUserPage from './components/system/users/AddUserPage';
import EditUserPage from './components/system/users/EditUserPage';
import ManageSystemAttributesPage from './components/system/system_attributes/ManageSystemAttributesPage';
import CustomSlotTypesPage from './components/system/custom_slot_types/CustomSlotTypesPage';
import ManageCustomSlotTypePage from './components/system/custom_slot_types/ManageCustomSlotTypePage';

import ManagerUserPage from './components/users/ManagerUser';
import MainRoute from './components/router/MainRoute';
import PrivateRoute from './components/router/PrivateRoute';

// Repositories Router
const RepositoryEntitiesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/repositories/:repository_id/entities" component={RepositoryItemsPage}/>
		<PrivateRoute header="admin" footer={true}  path="/admin/repositories/:repository_id/entities/new" component={ManageRepositoryItemPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/repositories/:repository_id/entities/:id" component={ManageRepositoryItemPage} />
	</Switch>
);

const RepositoryPropertiesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/repositories/:repository_id/properties" component={RepositoryPropertiesPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/repositories/:repository_id/properties/new" component={ManageRepositoryPropertyPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/repositories/:repository_id/properties/:id" component={ManageRepositoryPropertyPage} />
	</Switch>  
);

const RepositoryItemRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/repositories/:repository_id" component={RepositoryPage}/>
		<Route path="/admin/repositories/:repository_id/entities" component={RepositoryEntitiesRouter} />
		<Route path="/admin/repositories/:repository_id/properties" component={RepositoryPropertiesRouter} />
	</Switch>  
);

const RepositoriesRouter = () => {
	
	return(
		<Switch>
			<PrivateRoute header="admin" footer={true} exact path='/admin/repositories' component={RepositoryPage}/>
			<PrivateRoute header="admin" footer={true} path="/admin/repositories/new" component={AddRepositoryPage} />
			<Route path="/admin/repositories/:repository_id" component={RepositoryItemRouter} />
			
		</Switch>
	);
};


// Applications Router
const ApplicationCustomSlotsRouter = ({ match }) => (  
	<Switch>
		<PrivateRoute header="application" footer={true} exact path={`${match.url}`} component={CustomSlotsPage}/>
		<PrivateRoute header="application" footer={true} path={`${match.url}/new`} component={ManageCustomSlotPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/:id`} component={ManageCustomSlotPage} />
	</Switch>
);
const ApplicationIntentsRouter = ({ match }) => (  
	<Switch>
		<PrivateRoute header="application" footer={true} exact path={`${match.url}`} component={ApplicationIntentsPage}/>
		<PrivateRoute header="application" footer={true} path={`${match.url}/new`} component={ManageApplicationIntentsPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/:id`} component={ManageApplicationIntentsPage} />
	</Switch>  
);
const ApplicationSettingsRouter = ({ match }) => (
	<Switch>
		<PrivateRoute header="application" footer={true} path={`${match.url}/access_control`} component={ManageAccessControlPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/advanced`} component={ManageAdvancedSettingsPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/beta`} component={ManageBetaTestingPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/builds`} component={ApplicationBuildsPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/certify`} component={ManageCertificationPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/configuration`} component={ManageSettingsPage} />
		<Route path={`${match.url}/custom_slots`} component={ApplicationCustomSlotsRouter} />
		<Route path={`${match.url}/intents`} component={ApplicationIntentsRouter} />
	</Switch>
);

const ApplicationIdSettingRouter = () => (
	<Switch>
		<PrivateRoute header="application" footer={true} path="/admin/applications/:id/settings" component={ManageSettingsPage} />
	</Switch>
);

const ApplicationsRouter = ({ match }) => (	
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path={`${match.url}`} component={ApplicationsPage}/>
		<PrivateRoute header="admin" footer={true} path={`${match.url}/new`} component={ManageSettingsPage} />
		<Route path={`${match.url}/:id`} component={ApplicationIdSettingRouter} />
		<Route path={`${match.url}/settings`} component={ApplicationSettingsRouter} />
		//Reports
		<PrivateRoute header="admin" footer={true} path={`${match.url}/:application_id/reports/intent_logs`} component={IntentLogsPage}/>
	</Switch>
);


// Onboarding Router
const OnboardingRouter = ({ match }) => (
	<Switch>
		<PrivateRoute header="onboard" footer={true} exact path={`${match.url}`} component={OnboardingPage}/>
		<PrivateRoute header="onboard" footer={true} path={`${match.url}/setup_application`} component={SetupVirtualAssistantPage} />
		<PrivateRoute header="onboard" footer={true} path={`${match.url}/setup_lab`} component={SetupLabPage} />
	</Switch>
);

// Inventories Router
const InventoryEntitiesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/inventories/:repository_id/entities" component={InventoryItemsPages}/>
		<PrivateRoute header="admin" footer={true} path="/admin/inventories/:repository_id/entities/new" component={ManageInventoryItemPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/inventories/:repository_id/entities/:id" component={ManageInventoryItemPage} />
	</Switch>
);

const InventoryPropertiesRouter = () => (
	<Switch>
		<PrivateRoute header="none" footer={false} exact path="/admin/inventories/:repository_id/properties" component={RepositoryPropertiesPage}/>
		<PrivateRoute header="none" footer={false} path="/admin/inventories/:repository_id/properties/new" component={ManageRepositoryPropertyPage} />
		<PrivateRoute header="none" footer={false} path="/admin/inventories/:repository_id/properties/:id" component={ManageRepositoryPropertyPage} />
	</Switch>  
);

const InventoryItemRouter = () => (
	<Switch>
		{/* <Route exact path="/admin/inventories/:repository_id" component={RepositoryPropertiesPage}/> */}
		<Route path="/admin/inventories/:repository_id/entities" component={InventoryEntitiesRouter} />
		<Route path="/admin/inventories/:repository_id/properties" component={InventoryPropertiesRouter} />
	</Switch>  
);

const InventoriesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/inventories' component={InventoryPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/inventories/new" component={AddInventoryPageRoute} />
		<Route path="/admin/inventories/:repository_id" component={InventoryItemRouter} />
	</Switch>
);


// Labs Router
const LabSetUpRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/labs/setup" component={SetupPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/labs/setup/new" component={SetupLabFlowPage} />
	</Switch>  
);

const LabCustomSlotsRouter = ({ match }) => (  
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path={`${match.url}`} component={CustomSlotsPage}/>
		<PrivateRoute header="admin" footer={true} path={`${match.url}/new`} component={ManageCustomSlotPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/:id`} component={ManageCustomSlotPage} />
	</Switch>
);
const LabIntentsRouter = ({ match }) => (  
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path={`${match.url}`} component={ApplicationIntentsPage}/>
		<PrivateRoute header="admin" footer={true} path={`${match.url}/new`} component={ManageApplicationIntentsPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/:id`} component={ManageApplicationIntentsPage} />
	</Switch>  
);

const LabsApplicationsRouter = ({ match }) => (
	<Switch>
		<PrivateRoute header="admin" footer={true} path={`${match.url}/new`} component={LabSetupApplicationPage} />
		<PrivateRoute header="application" footer={true} path={`${match.url}/settings`} component={ManageSettingsPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/access_control`} component={ManageAccessControlPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/advanced`} component={ManageAdvancedSettingsPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/beta`} component={ManageBetaTestingPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/builds`} component={ApplicationBuildsPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/certify`} component={ManageCertificationPage} />
		<PrivateRoute header="admin" footer={true} path={`${match.url}/configuration`} component={ManageSettingsPage} />
		<Route path={`${match.url}/custom_slots`} component={LabCustomSlotsRouter} />
		<Route path={`${match.url}/intents`} component={LabIntentsRouter} />
	</Switch>
);
const LabInventoriesEntitiesRouter = ({match}) => (
	<Switch>
		<PrivateRoute header="none" footer={false} exact path={`${match.url}`} component={RepositoryItemsPage}/>
		<PrivateRoute header="none" footer={false} path={`${match.url}/new`} component={ManageRepositoryItemPage} />
		<PrivateRoute header="none" footer={false} path={`${match.url}/:id`} component={ManageRepositoryItemPage} />
	</Switch>
);

const LabInventoriesRouter = ({match}) => (
	<Switch>
		<PrivateRoute header="lab" footer={true} exact path={`${match.url}`} component={LabInventoryPage}/>
		<PrivateRoute header="lab" footer={true} path={`${match.url}/new`} component={AddInventoryPage} />
		<Route path={`${match.url}/entities`} component={LabInventoriesEntitiesRouter} />
	</Switch>
);

const LabMemberEntitiesRouter = () => (
	<Switch>
		<PrivateRoute header="none" footer={false} exact path="/admin/labs/lab_members/:repository_id/entities" component={LabMembersItemsPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/labs/lab_members/:repository_id/entities/new" component={ManageInventoryItemPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/labs/lab_members/:repository_id/entities/:id" component={ManageLabMemberPage} />
	</Switch>
);

const LabMemberRepositoryRouter = () => (
	<Switch>
		<Route path="/admin/labs/lab_members/:repository_id/entities" component={LabMemberEntitiesRouter} />
	</Switch>
);

const LabMembersRouter = () => (
	<Switch>
		<PrivateRoute header="lab" footer={false} exact path="/admin/labs/lab_members" component={LabMembersPage}/>
		<Route path="/admin/labs/lab_members/:repository_id" component={LabMemberRepositoryRouter} />
	</Switch>
);

const LabsRepositoryEntitiesRouter = () => (
	<Switch>
		<PrivateRoute header="none" footer={false} exact path="/admin/labs/repositories/entities" component={RepositoryItemsPage}/>
		<PrivateRoute header="none" footer={false} path="/admin/labs/repositories/entities/new" component={ManageRepositoryItemPage} />
		<PrivateRoute header="none" footer={false} path="/admin/labs/repositories/entities/:id" component={ManageRepositoryItemPage} />
	</Switch>
);

const LabsRepositoryPropertiesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path="/admin/labs/repositories/:repository_id/properties" component={RepositoryPropertiesPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/labs/repositories/:repository_id/properties/new" component={ManageRepositoryPropertyPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/labs/repositories/:repository_id/properties/:id" component={ManageRepositoryPropertyPage} />
	</Switch>  
);

const LabsRepositoryRouter = () => {	
	return(
		<Switch>
			<Route path="/admin/labs/repositories/:repository_id/properties" component={LabsRepositoryPropertiesRouter} />
		</Switch>
	);
};

const LabsRepositoriesRouter = () => {	
	return(
		<Switch>
			<PrivateRoute header="lab" footer={true} exact path='/admin/labs/repositories' component={LabRepositoryPage}/>
			<PrivateRoute header="lab" footer={true} path="/admin/labs/repositories/new" component={AddRepositoryPage} />
			<Route path="/admin/labs/repositories/entities" component={LabsRepositoryEntitiesRouter} />
			<Route path="/admin/labs/repositories/:repository_id" component={LabsRepositoryRouter} />
		</Switch>
	);
};

const LabsRepositorySettingsRouter = () => {	
	return(
		<Switch>
			<PrivateRoute header="admin" footer={true} path="/admin/labs/:id/settings" component={ManageLabPage} />
		</Switch>
	);
};

const LabsRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/labs' component={LabsPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/labs/new" component={ManageLabPage} />
		<Route path="/admin/labs/:id" component={LabsRepositorySettingsRouter} />
		<Route path="/admin/labs/setup" component={LabSetUpRouter} />
		<PrivateRoute header="lab" footer={true} path="/admin/labs/activity" component={LabActivityPage} />
		<Route path="/admin/labs/applications" component={LabsApplicationsRouter} />
		<Route path="/admin/labs/inventories" component={LabInventoriesRouter} />
		<Route path="/admin/labs/lab_members" component={LabMembersRouter} />
		<PrivateRoute header="lab" footer={true} path="/admin/labs/membership_orgs" component={MembershipOrgPage} />
		<PrivateRoute header="lab" footer={true} path="/admin/labs/vendors" component={VendorPage} />
		<PrivateRoute header="lab" footer={true} path="/admin/labs/notes" component={LabNotesRepositoryPage} />
		<PrivateRoute header="lab" footer={true} path="/admin/labs/quick_actions" component={QuickActionPage} />
		<Route path="/admin/labs/repositories" component={LabsRepositoriesRouter} />
	</Switch>
);


// ordering Router
const OrderingRepositoryRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} path="/admin/ordering/:repository_id/entities" component={OrdersItemsPages} />		
	</Switch>
);
const OrderingRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/ordering' component={LabOrdersRepositoryPage}/>
		<Route path="/admin/ordering/:repository_id" component={OrderingRepositoryRouter} />		
	</Switch>
);


// Organization Router
const OrganizationSkillRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/organization/skill_groups' component={CompanySkillGroupPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/organization/skill_groups/new" component={ManageCompanySkillGroupPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/organization/skill_groups/:skill_group_id" component={ManageCompanySkillGroupPage} />		
	</Switch>
);
const OrganizationUserRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/organization/users' component={CompanyUserPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/organization/users/new" component={ManageCompanyUserPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/organization/users/:user_id" component={ManageCompanyUserPage} />		
	</Switch>
);

const OrganizationLaboratoryRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/organization/laboratory_profiles' component={CompanyLaboratoryProfilePage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/organization/laboratory_profiles/new" component={ManageCompanyLaboratoryProfilePage} />
		<PrivateRoute header="admin" footer={true} path="/admin/organization/laboratory_profiles/:laboratory_profile_id" component={ManageCompanyLaboratoryProfilePage} />		
	</Switch>
);

const OrganizationRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/organization' component={ManageCompanyPage}/>
		<Route path="/admin/organization/laboratory_profiles" component={OrganizationLaboratoryRouter} />		
		<Route path="/admin/organization/skill_groups" component={OrganizationSkillRouter} />
		<Route path="/admin/organization/users" component={OrganizationUserRouter} />
	</Switch>
);

//System Router
const SystemApplicationRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/applications' component={SystemApplicationsPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/applications/:id" component={SystemManageApplicationPage} />		
	</Switch>
);

const SystemClientsRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/clients' component={ClientsPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/clients/:id" component={ManageClientPage} />		
	</Switch>
);

const SystemCompaniesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/companies' component={CompanyPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/companies/:id" component={SystemManageCompanyPage} />		
	</Switch>
);

const SystemCustom_slotRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/custom_slot_types' component={CustomSlotTypesPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/custom_slot_types/:id" component={ManageCustomSlotTypePage} />		
	</Switch>
);

const SystemIntentsRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/intents' component={IntentPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/intents/:id" component={ManageIntentPage} />		
	</Switch>
);

const SystemRepository_TypesRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/repository_types' component={RepositoryTypesPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/repository_types/:id" component={ManageRepositoryTypePage} />		
	</Switch>
);

const SystemUsersRouter = () => (
	<Switch>
		<PrivateRoute header="admin" footer={true} exact path='/admin/system/users' component={UsersPage}/>
		<PrivateRoute header="admin" footer={true} path="/admin/system/users/:id" component={EditUserPage} />		
	</Switch>
);

const SystemRouter = () => (
	<Switch>
		{/* <PrivateRoute header="admin" footer={true} exact path='/admin/organization' component={ManageCompanyPage}/> */}
		<PrivateRoute header="admin" footer={true} path="/admin/system/access_tokens" component={AccessTokensPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/application" component={SystemManageApplicationPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/client" component={ManageClientPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/company" component={SystemManageCompanyPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/custom_slot_type" component={ManageCustomSlotTypePage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/intent" component={ManageIntentPage} />
		<PrivateRoute header="admin" footer={true} path="/admin/system/repository_type" component={ManageRepositoryTypePage} />	
		<PrivateRoute header="admin" footer={true} path="/admin/system/system_attributes" component={ManageSystemAttributesPage} />	
		<PrivateRoute header="admin" footer={true} path="/admin/system/user" component={AddUserPage} />

		<Route path="/admin/system/applications" component={SystemApplicationRouter} />
		<Route path="/admin/system/clients" component={SystemClientsRouter} />
		<Route path="/admin/system/companies" component={SystemCompaniesRouter} />
		<Route path="/admin/system/custom_slot_types" component={SystemCustom_slotRouter} />
		<Route path="/admin/system/intents" component={SystemIntentsRouter} />
		<Route path="/admin/system/repository_types" component={SystemRepository_TypesRouter} />
		<Route path="/admin/system/users" component={SystemUsersRouter} />
	</Switch>
);





export default (
<Switch>
	//Login/Register
	<MainRoute exact={true} header="auth" footer={true} path="/admin/login" component={LoginPage} />
	<MainRoute header="auth" footer={true} path="/admin/register" component={RegisterPage} />
	<MainRoute header="auth" footer={true} path="/admin/forgot_password" component={ForgotPasswordPage}/>
	<MainRoute header="auth" footer={true} path="/admin/reset_password/:link_id" component={ResetPasswordPage}/>

	//Authentication
	<MainRoute header="none" footer={false} path="/admin/auth/amazon/success" component={AmazonAuthSuccess} />

	//Application Routes
	<Route path="/admin/applications" component={ApplicationsRouter} />
	
	//Dashboard
	<PrivateRoute  header="admin" footer={true} path="/admin/dashboard" component={DashboardPage}/>
	<Route path="/admin/onboard" component={OnboardingRouter}/>

	//Lab Routes
	<Route path="/admin/labs" component={LabsRouter}/>
	
	//Inventory Routes (completed)
	<Route path="/admin/inventories" component={InventoriesRouter} />

	//Reports Routes (completed)
	<PrivateRoute header="admin" footer={true} path="/admin/reports" component={IntentLogsPage}/>

	//Repository Routes (completed)
	<PrivateRoute header="admin" footer={true} path="/admin/repository_groups" component={CompanyRepositoryGroupsPage} />
	<Route path="/admin/repositories" component={RepositoriesRouter}/>	

	<Route path="/admin/ordering" component={OrderingRouter}/>
	
	//organization Routes
	<Route path="/admin/organization" component={OrganizationRouter}/>
	
	//System Routes
	<Route path="/admin/system" component={SystemRouter}/>

	<PrivateRoute header="admin" footer={true} path="/admin/users/profile" component={ManagerUserPage}/>		
</Switch>
);
