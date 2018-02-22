import path from 'path';
import express from 'express';
import passport from 'passport';

import AuthController from '../../app/controllers/auth.controller';
import ForgotPasswordController from '../../app/controllers/forgot_password.controller';
import MarketingLeadController from '../../app/controllers/marketing_lead.controller';
import MeController from '../../app/controllers/me.controller';
import OAuth2Controller from '../../app/controllers/oauth2.controller';
import LinkAccountController from '../../app/controllers/link_account.controller';

import ApplicationIntentsController from '../../app/controllers/applications/intents.controller';
import ApplicationsSpeechController from '../../app/controllers/applications/speech.controller';

import CompanyController  from '../../app/controllers/companies/company.controller';
import CompanyApplicationsController from '../../app/controllers/companies/applications.controller';
import CompanyLabsController from '../../app/controllers/companies/labs.controller';
import CompanyInventoryController from '../../app/controllers/companies/inventories.controller';
import CompanyInventoryUploadsController from '../../app/controllers/companies/inventoryUploads.controller';
import CompanyRepositoriesController from '../../app/controllers/companies/repositories.controller';
import CompanyEntitiesController from '../../app/controllers/companies/entities.controller';
import CompanyUsersController from '../../app/controllers/companies/users.controller';
import CompanyLaboratoryProfilesController from '../../app/controllers/companies/laboratoryProfiles.controller';
import CompanySkillGroupsController from '../../app/controllers/companies/skillGroups.controller';

import IntentLogsController from '../../app/controllers/companies/intent_logs.controller';

import LabsController from '../../app/controllers/labs/labs.controller';
import LabsActivityController from '../../app/controllers/labs/activity.controller';
import LabApplicationsController from '../../app/controllers/labs/applications.controller';
import LabInventoryController from '../../app/controllers/labs/inventory.controller';
import LabInventoryUploadsController from '../../app/controllers/labs/inventoryUploads.controller';
import LabMembersController from '../../app/controllers/labs/lab_members.controller';
import LabRepositoriesController from '../../app/controllers/labs/repositories.controller';

import SystemController from '../../app/controllers/systems/systems.controller';
import SystemApplicationsController from '../../app/controllers/systems/applications.controller';
import SystemAttributeController from '../../app/controllers/systems/attributes.controller';
import SystemIntentsController from '../../app/controllers/systems/intents.controller';
import SystemRepositoryGroupsController from '../../app/controllers/systems/repository_groups.controller';
import SystemRepositoryTypeController from '../../app/controllers/systems/repository_type.controller';
import SystemCustomSlotTypesController from '../../app/controllers/systems/custom_slot_types.controller';
import SystemAccessTokenController from '../../app/controllers/systems/access_token.controller';
import SystemClientsController from '../../app/controllers/systems/clients.controller';
import SystemCompanyController from '../../app/controllers/systems/company.controller';
import SystemUsersController from '../../app/controllers/systems/users.controller';

import multer from 'multer';

let router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

//Public Endpoint
router.route('/oauth2/token')
  .post(OAuth2Controller.token);

router.route('/link/authorize')
  .post(LinkAccountController.LinkAccount);

router.route('/link/token')
  .post(LinkAccountController.ExchangeCode);

router.route('/marketing_leads')
  .post(MarketingLeadController.CreateMarketingLead)
  .get(MarketingLeadController.GetMarketingLeads)

router.route('/marketing_leads/:marketing_lead_id')
  //.put(AuthController.isAuthenticated, MarketingLeadController.UpdateProtocol)
  .put(MarketingLeadController.UpdateMarketingLead)
  .get(MarketingLeadController.GetMarketingLead)
  .delete(MarketingLeadController.DeleteMarketingLead);

// Authentication Endpoints
router.route('/oauth2/authorize')
  .get(AuthController.isAuthenticated, OAuth2Controller.authorization)
  .post(AuthController.isAuthenticated, OAuth2Controller.decision);

router.route('/auth/amazon/callback')
  .get(AuthController.isAuthenticated, passport.authenticate('amazon', { failureRedirect: '/login' }))

router.route('/register')
  .post(OAuth2Controller.register);

router.route('/forgot_password')
  .post(ForgotPasswordController.CreateResetPasswordLink);

router.route('/reset_password/:link_id')
  .post(ForgotPasswordController.ResetPassword);

router.route('/me')
  .get(AuthController.isAuthenticated, MeController.GetMe)
  .put(AuthController.isAuthenticated, MeController.UpdateMe);

router.route('/me/change_password')
  .post(AuthController.isAuthenticated, MeController.ChangePassword);

//Company Endpoints
router.route('/companies/paged')
  .get(AuthController.isAuthenticated, CompanyController.GetCompaniesPaged);

router.route('/companies')
  .post(AuthController.isAuthenticated, CompanyController.CreateCompany)
  .get(AuthController.isAuthenticated, CompanyController.GetCompanies);

router.post('/companies/:company_id/upload/logo', upload.single('filename'), (req, res, next) => {
  CompanyController.UploadLogo(req, res, next);
});

router.route('/companies/:company_id')
  .put(AuthController.isAuthenticated, CompanyController.UpdateCompany)
  .get(AuthController.isAuthenticated, CompanyController.GetCompany)
  .delete(AuthController.isAuthenticated, CompanyController.DeleteCompany);

router.route('/companies/:company_id/amazon_oauth_tokens')
  .post(AuthController.isAuthenticated, CompanyApplicationsController.CreateApplication)

router.route('/companies/:company_id/applications')
  .post(AuthController.isAuthenticated, CompanyApplicationsController.CreateApplication)
  .get(AuthController.isAuthenticated, CompanyApplicationsController.GetAllApplications);

router.route('/companies/:company_id/applications/:application_id')
  .put(AuthController.isAuthenticated, CompanyApplicationsController.UpdateApplication)
  .get(AuthController.isAuthenticated, CompanyApplicationsController.GetApplication)
  .delete(AuthController.isAuthenticated, CompanyApplicationsController.DeleteApplication);

router.route('/companies/:company_id/labs')
  .post(AuthController.isAuthenticated, CompanyLabsController.CreateLab)
  .get(AuthController.isAuthenticated, CompanyLabsController.GetAllLabs)

router.route('/companies/:company_id/labs/:lab_id')
  .put(AuthController.isAuthenticated, CompanyLabsController.UpdateLab)
  .delete(AuthController.isAuthenticated, CompanyLabsController.DeleteLab);

router.route('/companies/:company_id/inventories')
  .get(AuthController.isAuthenticated, CompanyInventoryController.GetInventory)
  .post(AuthController.isAuthenticated, CompanyInventoryController.CreateInventory);

router.route('/companies/:company_id/inventories/:inventory_id')
  .put(AuthController.isAuthenticated, CompanyInventoryController.UpdateInventory)
  .delete(AuthController.isAuthenticated, CompanyInventoryController.DeleteInventory);

router.route('/companies/:company_id/repositories')
  .get(AuthController.isAuthenticated, CompanyRepositoriesController.GetAllRepositories);

router.route('/companies/:company_id/repositories/types/:repository_type')
  .get(AuthController.isAuthenticated, CompanyRepositoriesController.GetAllRepositoriesByType);

router.route('/companies/:company_id/inventories/:repository_id/uploads')
  .post(AuthController.isAuthenticated, CompanyInventoryUploadsController.PostInventoryUpload);

router.route('/companies/:company_id/repositories/:repository_id')
  .put(AuthController.isAuthenticated, CompanyRepositoriesController.UpdateRepository)
  //.get(AuthController.isAuthenticated, CompanyRepositoriesController.GetRepository)
  .delete(AuthController.isAuthenticated, CompanyRepositoriesController.DeleteRepository);

router.route('/companies/:company_id/repositories/:repository_id/entities')
  .post(AuthController.isAuthenticated, CompanyEntitiesController.CreateEntity)
  .get(AuthController.isAuthenticated, CompanyEntitiesController.GetEntities);
router.route('/companies/:company_id/repositories/:repository_id/upload')
  .post(AuthController.isAuthenticated, CompanyEntitiesController.UploadEntities);
router.route('/companies/:company_id/repositories/:repository_id/entities/:entity_id')
  .put(AuthController.isAuthenticated, CompanyEntitiesController.UpdateEntity)
  .get(AuthController.isAuthenticated, CompanyEntitiesController.GetEntity)
  .delete(AuthController.isAuthenticated, CompanyEntitiesController.DeleteEntity);

router.route('/companies/:company_id/repositories/:repository_id/entity_properties')
  .post(AuthController.isAuthenticated, CompanyEntitiesController.CreateEntityProperty)
  //.get(AuthController.isAuthenticated, CompanyEntitiesController.GetEntityProperties);

router.route('/companies/:company_id/repositories/:repository_id/entity_properties/:entity_property_id')
  .put(AuthController.isAuthenticated, CompanyEntitiesController.UpdateEntityProperty)
  //.get(AuthController.isAuthenticated, CompanyEntitiesController.GetLookUp)
  .delete(AuthController.isAuthenticated, CompanyEntitiesController.DeleteEntityProperty);

router.route('/companies/:company_id/users')
  .post(AuthController.isAuthenticated, CompanyUsersController.CreateUser)
  .get(AuthController.isAuthenticated, CompanyUsersController.GetUsers);

router.route('/companies/:company_id/users/:user_id')
  .get(AuthController.isAuthenticated, CompanyUsersController.GetUser)
  .put(AuthController.isAuthenticated, CompanyUsersController.UpdateUser)
  .delete(AuthController.isAuthenticated, CompanyUsersController.DeleteUser);

router.route('/companies/:company_id/laboratory_profiles')
  .post(AuthController.isAuthenticated, CompanyLaboratoryProfilesController.CreateLaboratoryProfile)
  .get(AuthController.isAuthenticated, CompanyLaboratoryProfilesController.GetLaboratoryProfiles);

router.route('/companies/:company_id/laboratory_profiles/:laboratory_profile_id')
  .get(AuthController.isAuthenticated, CompanyLaboratoryProfilesController.GetLaboratoryProfile)
  .put(AuthController.isAuthenticated, CompanyLaboratoryProfilesController.UpdateLaboratoryProfile)
  .delete(AuthController.isAuthenticated, CompanyLaboratoryProfilesController.DeleteLaboratoryProfile);

router.route('/companies/:company_id/skill_groups')
  .post(AuthController.isAuthenticated, CompanySkillGroupsController.CreateSkillGroup)
  .get(AuthController.isAuthenticated, CompanySkillGroupsController.GetSkillGroups);

router.route('/companies/:company_id/skill_groups/:skill_group_id')
  .get(AuthController.isAuthenticated, CompanySkillGroupsController.GetSkillGroup)
  .put(AuthController.isAuthenticated, CompanySkillGroupsController.UpdateSkillGroup)
  .delete(AuthController.isAuthenticated, CompanySkillGroupsController.DeleteSkillGroup);

//Lab Endpoints
router.route('/labs')
  .post(AuthController.isAuthenticated, LabsController.CreateLab)
  .get(AuthController.isAuthenticated, LabsController.GetAllLabs)

router.route('/labs/:lab_id')
  .put(AuthController.isAuthenticated, LabsController.UpdateLab)
  .get(AuthController.isAuthenticated, LabsController.GetLab)
  .delete(AuthController.isAuthenticated, LabsController.DeleteLab);

router.route('/labs/:lab_id/applications')
  .post(AuthController.isAuthenticated, LabApplicationsController.CreateApplication)
  .get(AuthController.isAuthenticated, LabApplicationsController.GetAllApplications);

router.route('/labs/:lab_id/applications/:application_id')
  .put(AuthController.isAuthenticated, LabApplicationsController.UpdateApplication)
  .get(AuthController.isAuthenticated, LabApplicationsController.GetApplication)
  .delete(AuthController.isAuthenticated, LabApplicationsController.DeleteApplication);

router.route('/labs/:lab_id/activities')
  .get(AuthController.isAuthenticated, LabsActivityController.GetActivities);

router.route('/labs/:lab_id/inventories')
  .get(AuthController.isAuthenticated, LabInventoryController.GetInventory)
  .post(AuthController.isAuthenticated, LabInventoryController.CreateInventory);

router.route('/labs/:lab_id/inventories/:inventory_id')
  .put(AuthController.isAuthenticated, LabInventoryController.UpdateInventory)
  .delete(AuthController.isAuthenticated, LabInventoryController.DeleteInventory);

router.route('/labs/:lab_id/inventories/:repository_id/uploads')
  .post(AuthController.isAuthenticated, LabInventoryUploadsController.PostInventoryUpload);

router.route('/labs/:lab_id/repositories')
  .post(AuthController.isAuthenticated, LabRepositoriesController.CreateRepository)
  .get(AuthController.isAuthenticated, LabRepositoriesController.GetAllRepositories);

router.route('/labs/:lab_id/repositories/types/:repository_type')
  .get(AuthController.isAuthenticated, LabRepositoriesController.GetAllRepositoriesByType);

router.route('/labs/:lab_id/repositories/add')
  .post(AuthController.isAuthenticated, LabRepositoriesController.AddRepository)

router.route('/labs/:lab_id/repositories/:repository_id')
  .put(AuthController.isAuthenticated, LabRepositoriesController.UpdateRepository)
  //.get(AuthController.isAuthenticated, RepositoriesController.GetRepository)
  .delete(AuthController.isAuthenticated, LabRepositoriesController.DeleteRepository);

router.route('/labs/:lab_id/lab_members')
  .post(AuthController.isAuthenticated, LabMembersController.CreateRepository)
  //.get(AuthController.isAuthenticated, LabRepositoriesController.GetAllRepositories);

//router.route('/labs/:lab_id/lab_members/:repository_id')
// router.route('/companies/:company_id/labs/:lab_id/lab_members')
//   .post(AuthController.isAuthenticated, LabsController.CreateLabMember)
//
// router.route('/companies/:company_id/labs/:lab_id/lab_members/:lab_member_id')
//   .put(AuthController.isAuthenticated, LabsController.UpdateLab);
//Application Endpoints
router.route('/applications')
  .post(AuthController.isAuthenticated, SystemApplicationsController.CreateApplication)
  .get(AuthController.isAuthenticated, SystemApplicationsController.GetApplications);

router.route('/applications/:application_id')
  .put(AuthController.isAuthenticated, SystemApplicationsController.UpdateApplication)
  .get(AuthController.isAuthenticated, SystemApplicationsController.GetApplication)
  .delete(AuthController.isAuthenticated, SystemApplicationsController.DeleteApplication);

router.route('/applications/:application_id/speech')
  .post(AuthController.isAuthenticated, ApplicationsSpeechController.convertToOgg)

router.route('/applications/:application_id/intents')
  .post(AuthController.isAuthenticated, ApplicationIntentsController.CreateIntent)
  .get(AuthController.isAuthenticated, ApplicationIntentsController.GetIntents);

router.route('/applications/:application_id/intents')
  .post(AuthController.isAuthenticated, ApplicationIntentsController.CreateIntent)
  .get(AuthController.isAuthenticated, ApplicationIntentsController.GetIntents);

router.route('/applications/:application_id/intents/:intent_id')
  .put(AuthController.isAuthenticated, ApplicationIntentsController.UpdateIntent)
  //.get(AuthController.isAuthenticated, ApplicationIntentsController.GetLookUp)
  .delete(AuthController.isAuthenticated, ApplicationIntentsController.DeleteIntent);

router.post('/applications/:application_id/upload/logo', upload.single('filename'), (req, res, next) => {
  SystemApplicationsController.UploadLogo(req, res, next);
});

router.post('/applications/:application_id/upload/welcome_background', upload.single('filename'), (req, res, next) => {
  SystemApplicationsController.UploadWelcomeBackground(req, res, next);
});

router.route('/applications/:application_id/intent_logs')
  .get(IntentLogsController.GetIntentLogs);

//System Endpoints
router.route('/systems')
  .get(AuthController.isAuthenticated, SystemController.GetSystem);

router.route('/systems/access_tokens')
  .get(AuthController.isAuthenticated, SystemAccessTokenController.GetAccessTokens)
  .post(AuthController.isAuthenticated, SystemAccessTokenController.CreateAccessToken);

router.route('/systems/access_tokens/:access_token_id')
  .delete(AuthController.isAuthenticated, SystemAccessTokenController.DeleteAccessToken);

router.route('/systems/attributes')
  .post(AuthController.isAuthenticated, SystemAttributeController.SaveAttribute);

router.route('/systems/repository_groups')
  .get(AuthController.isAuthenticated, SystemRepositoryGroupsController.GetAllRepositoryGroups);

router.route('/systems/repository_types/paged')
  .get(AuthController.isAuthenticated, SystemRepositoryTypeController.GetRepositoryTypesPaged);

router.route('/systems/repository_types')
  .post(AuthController.isAuthenticated, SystemRepositoryTypeController.CreateRepositoryType)
  .get(AuthController.isAuthenticated, SystemRepositoryTypeController.GetRepositoryTypes);

router.route('/systems/repository_types/:repository_type_id')
  .put(AuthController.isAuthenticated, SystemRepositoryTypeController.UpdateRepositoryType)
  .get(AuthController.isAuthenticated, SystemRepositoryTypeController.GetRepositoryType)
  .delete(AuthController.isAuthenticated, SystemRepositoryTypeController.DeleteRepositoryType);

router.route('/systems/custom_slot_types/paged')
  .get(AuthController.isAuthenticated, SystemCustomSlotTypesController.GetCustomSlotTypesPaged);

router.route('/systems/custom_slot_types')
  .post(AuthController.isAuthenticated, SystemCustomSlotTypesController.CreateCustomSlotType)
  .get(AuthController.isAuthenticated, SystemCustomSlotTypesController.GetCustomSlotTypes);

router.route('/systems/custom_slot_types/:custom_slot_type_id')
  .put(AuthController.isAuthenticated, SystemCustomSlotTypesController.UpdateCustomSlotType)
  .get(AuthController.isAuthenticated, SystemCustomSlotTypesController.GetCustomSlotType)
  .delete(AuthController.isAuthenticated, SystemCustomSlotTypesController.DeleteCustomSlotType);

router.route('/systems/clients')
  .post(AuthController.isAuthenticated, SystemClientsController.CreateClient)
  .get(AuthController.isAuthenticated, SystemClientsController.GetClients);

router.route('/systems/clients/:client_id')
  .put(AuthController.isAuthenticated, SystemClientsController.UpdateClient)
  .get(AuthController.isAuthenticated, SystemClientsController.GetClient)
  .delete(AuthController.isAuthenticated, SystemClientsController.DeleteClient);

router.route('/systems/companies/paged')
  .get(AuthController.isAuthenticated, SystemCompanyController.GetCompaniesPaged);

router.route('/systems/companies')
  .post(AuthController.isAuthenticated, SystemCompanyController.CreateCompany)
  .get(AuthController.isAuthenticated, SystemCompanyController.GetCompanies);

router.route('/systems/companies/:company_id')
  .put(AuthController.isAuthenticated, SystemCompanyController.UpdateCompany)
  .get(AuthController.isAuthenticated, SystemCompanyController.GetCompany)
  .delete(AuthController.isAuthenticated, SystemCompanyController.DeleteCompany);

router.route('/systems/intents/paged')
  .get(AuthController.isAuthenticated, SystemIntentsController.GetIntentsPaged);

router.route('/systems/intents')
  .post(AuthController.isAuthenticated, SystemIntentsController.CreateIntent)
  .get(AuthController.isAuthenticated, SystemIntentsController.GetIntents);

router.route('/systems/intents/:intent_id')
  .put(AuthController.isAuthenticated, SystemIntentsController.UpdateIntent)
  .get(AuthController.isAuthenticated, SystemIntentsController.GetIntent)
  .delete(AuthController.isAuthenticated, SystemIntentsController.DeleteIntent);

router.route('/systems/users')
  .post(SystemUsersController.CreateUser)
  .get(AuthController.isAuthenticated, SystemUsersController.GetUsers);

router.route('/systems/users/:user_id')
  .put(AuthController.isAuthenticated, SystemUsersController.UpdateUser)
  .get(AuthController.isAuthenticated, SystemUsersController.GetUser)
  .delete(AuthController.isAuthenticated, SystemUsersController.DeleteUser);

module.exports = router;
