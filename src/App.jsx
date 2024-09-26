import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./components/common/LandingPage";
import SignUp from "./components/common/SignUp";
import LogIn from "./components/common/LogIn";
import NoPage from "./components/common/NoPage";
import ParticipantDashboard from "./components/participants/ParticipantDashboard";
import Sidebar from "./components/participants/Sidebar";
import HackathonDetailsPage from "./components/hackathon/submitProject/HackathonDetailsPage";
import HackathonDashboard from "./components/hackathon/hackathonDashboard/HackathonDashboard";
import SubmitHackathon from "./components/hackathon/submitHackathon/SubmitHackathon";
import OrgDashboard from "./components/organizers/OrgDashboard";
import OrgSidebar from "./components/organizers/OrgSidebar";
import OrgHackathonPage from "./components/organizers/OrgHackathonPage";
import OrgSubmissionPage from "./components/organizers/OrgSubmissionPage";
import CreateHackathon from "./components/organizers/createhackathon/CreateHackathon";
import OrgOutlet from "./components/organizers/OrgOutlet";
import OrgSubmissions from "./components/organizers/OrgSubmissions";
import OrgViewProject from "./components/organizers/OrgViewProject";
import ViewDetailsPage from "./components/organizers/ViewDetailsPage";
import AddMedia from "./components/hackathon/AddMedia";
import HackathonMedia from "./components/hackathon/HackathonMedia";
import EmailValidation from "./components/organizers/createhackathon/EmailValidation";
import CodeVerification from "./components/organizers/createhackathon/CodeVerification";
import EditHackathon from "./components/organizers/edithackathon/EditHackathon";
import OrgEditDetails from "./components/organizers/profile/OrgEditDetails";
import MyHackathons from "./components/participants/MyHackathons";
import CreateOrgProfile from "./components/organizers/profile/CreateOrgProfile";
import OrgProfilePage from "./components/organizers/profile/OrgProfilePage";
import CreatePartProfile from "./components/participants/profile/CreatePartProfile";
import PartEditDetails from "./components/participants/profile/PartEditDetails";
import UserProfilePage from "./components/participants/profile/UserProfilePage";
import UnAuthorized from "./components/common/utils/UnAuthorized";
import RequireAuth from "./components/common/utils/RequireAuth";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AllParticipants from "./components/admin/participants/AllParticipants";
import AllOrganizers from "./components/admin/organizers/AllOrganizers";
import AllHackathons from "./components/admin/hackathons/AllHackathons";
import AllSubmissions from "./components/admin/allSubmissions/AllSubmissions";
import CreateUser from "./components/admin/user/CreateUser";
import ParticipantProfile from "./components/admin/participants/ParticipantProfile";
import UsersTable from "./components/admin/user/UsersTable";
import EditPartProfile from "./components/admin/participants/EditPartProfile";
import DeleteParticipant from "./components/admin/participants/DeleteParticipant";
import CreateOrgHackathon from "./components/admin/organizers/CreateOrgHackathon";
import ViewHackathons from "./components/admin/organizers/ViewHackathons";
import DeleteOrganization from "./components/admin/organizers/DeleteOrganization";
import ViewHackDetails from "./components/admin/organizers/ViewHackDetails";
import ViewHackathon from "./components/admin/hackathons/ViewHachathon";
import ViewHackDetail from "./components/admin/hackathons/ViewHackDetail";
import ActivateHack from "./components/admin/hackathons/ActivateHack.jsx";
import Deactivate from "./components/admin/hackathons/Deactivate.jsx";
import DeleteHack from "./components/admin/hackathons/DeleteHack";
import ViewSubmissions from "./components/admin/allSubmissions/ViewSubmission";
import EditSubmission from "./components/admin/allSubmissions/EditSubmission";
import DeleteSubmission from "./components/admin/allSubmissions/DeleteSubmission";
import VerifyUser from "./components/admin/user/VerifyUser";
import DeleteUser from "./components/admin/user/DeleteUser";
import Category from "./components/admin/category/Category";
import CreateTag from "./components/admin/category/CreateCategory";
import AddHackMedia from "./components/admin/organizers/AddHackMedia";

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<NoPage />} />
      {/* COMMON ROUTES */}
      <Route index element={<LandingPage />} />
      <Route path="/org-signup" element={<SignUp />} />
      <Route path="/part-signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="unauthorized" element={<UnAuthorized />} />
      {/* PARTICIPANT */}
      <Route element={<RequireAuth requiredRouteRole={"PARTICIPANT"} />}>
        <Route path="participant" element={<Sidebar />}>
          <Route index element={<ParticipantDashboard />} />
          <Route path="dashboard" element={<ParticipantDashboard />} />
          <Route path="profile" element={<Outlet />}>
            <Route index element={<UserProfilePage />} />
            <Route path="create" element={<CreatePartProfile />} />
            <Route path="edit" element={<PartEditDetails />} />
          </Route>
          <Route path="myhackathons" element={<MyHackathons />} />
          <Route path="hackathons" element={<Outlet />}>
            <Route index element={<HackathonDashboard />} />
            <Route path="detail" element={<HackathonDetailsPage />} />
            <Route path="submit" element={<SubmitHackathon />} />
          </Route>
        </Route>
      </Route>
      {/* ORGANIZER */}
      <Route element={<RequireAuth requiredRouteRole={"ORGANIZER"} />}>
        <Route path="organizer" element={<OrgSidebar />}>
          <Route index element={<OrgDashboard />} />
          <Route path="profile" element={<Outlet />}>
            <Route index element={<OrgProfilePage />} />
            <Route path="create" element={<CreateOrgProfile />} />
            <Route path="edit" element={<OrgEditDetails />} />
          </Route>
          <Route path="dashboard" element={<OrgOutlet />}>
            <Route index element={<OrgDashboard />} />
          </Route>
          <Route path="hackathons" element={<Outlet />}>
            <Route index element={<OrgHackathonPage />} />
            <Route path="detail" element={<OrgViewProject />} />
            <Route path="edit" element={<EditHackathon />} />
            <Route path="create" element={<Outlet />}>
              <Route index element={<CreateHackathon />} />
              <Route path="media" element={<Outlet />}>
                <Route index element={<AddMedia />} />
                <Route path="details" element={<HackathonMedia />} />
              </Route>
              <Route path="verify" element={<EmailValidation />} />
              <Route path="validate" element={<CodeVerification />} />
            </Route>
          </Route>
          <Route path="submissions" element={<Outlet />}>
            <Route index element={<OrgSubmissionPage />} />
            <Route path="details" element={<OrgOutlet />}>
              <Route index element={<OrgSubmissions />} />
              <Route path="view" element={<ViewDetailsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* ADMIN */}
      <Route element={<RequireAuth requiredRouteRole={"ADMIN"} />}>
        <Route path="admin" element={<AdminSidebar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="participants" element={<Outlet />}>
            <Route index element={<AllParticipants />} />
            <Route path="detail" element={<ParticipantProfile />} />
            <Route path="edit" element={<EditPartProfile />} />
            <Route path="delete" element={<DeleteParticipant />} />
          </Route>
          <Route path="organizers" element={<Outlet />}>
            <Route index element={<AllOrganizers />} />
            <Route path="createhackathon" element={<Outlet />}>
              <Route index element={<CreateOrgHackathon />} />
              <Route path="media" element={<Outlet />}>
                <Route index element={<AddHackMedia />} />
                <Route path="details" element={<HackathonMedia />} />
              </Route>
            </Route>
            <Route path="hackathons" element={<Outlet />}>
              <Route index element={<ViewHackathons />} />
              <Route path="details" element={<ViewHackDetails />} />
            </Route>
            <Route path="deletehackathon" element={<DeleteOrganization />} />
          </Route>

          <Route path="hackathons" element={<Outlet />}>
            <Route index element={<AllHackathons />} />
            <Route path="view" element={<Outlet />}>
              <Route index element={<ViewHackathon />} />
              <Route path="details" element={<ViewHackDetail />} />
            </Route>
            <Route path="activate" element={<ActivateHack />} />
            <Route path="deactivate" element={<Deactivate />} />
            <Route path="delete" element={<DeleteHack />} />
          </Route>
          <Route path="submissions" element={<Outlet />}>
            <Route index element={<AllSubmissions />} />
            <Route path="view" element={<ViewSubmissions />} />
            <Route path="edit" element={<EditSubmission />} />
            <Route path="delete" element={<DeleteSubmission />} />
          </Route>
          <Route path="users" element={<Outlet />}>
            <Route index element={<UsersTable />} />
            <Route path="verify" element={<VerifyUser />} />
            <Route path="delete" element={<DeleteUser />} />
            <Route path="create" element={<CreateUser />} />
          </Route>

          <Route path="categories" element={<Outlet />}>
            <Route index element={<Category />} />
            <Route path="createcategory" element={<CreateTag />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
