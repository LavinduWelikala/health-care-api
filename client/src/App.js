import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/quiz.css";
import "./styles/addq.css";
import "./styles/viewq.css";
import UserMainPage from "./pages/userMainPage";
import UserHome from "./pages/userHome";
import AdimnSideBar from "./components/AdminSidebar";
import DoctorMainPage from "./pages/doctorMainPage";
import CheckReports from "./pages/checkReports";
import MedicalProfile from "./pages/medicalProfile";
import Staff from "./pages/staff";
import UserAccounts from "./pages/accounts";
import Report from "./components/Report";
import UserStats from "./components/UserStats";
import AddAppointment from "./components/AddAppointment";
import AllAppointment from "./components/AllAppointment";
import UpdateAppointment from "./components/UpdateAppointment";
import DeleteAppointment from "./components/DeleteAppointment";
import ManagePatient from "./components/ManagePatient";
import AddMedicine from "./components/AddMedicine";
import ManageMedicine from "./components/ManageMedicine";
import AddInvoice from "./components/AddInvoice";
import ManageInvoice from "./components/ManageInvoice";
import Dashboard from "./components/Dashboard";
import AddPatient from "./components/AddPatient";
import AddSchedule from "./components/AddSchedule";
import GetSchedules from "./components/ViewAllSchedules";
import UpdateSchedule from "./components/UpdateSchedule";
import DeleteSchedule from "./components/DeleteSchedule";
import SearchSchedule from "./components/SearchSchedules";
import Addgoal from "./components/Addgoal";
import Weeklygoal from "./components/Weeklygoal";
import Updategoal from "./components/Updategoal";
import Addticket from "./components/Addticket";
import ViewTicket from "./components/ViewTicket";
import Tickets from "./components/Tickets";
import QuizList from "./components/QuizList";
import ViewQuestions from "./components/ViewQuestions";
import AddQuestions from "./components/AddQuestions";
import QuizEdit from "./components/QuizEdit";
import Mycards from "./components/Mycards";
import Addpayment from "./components/Addpayment";
import Update from "./components/Update";
import ContactUs from "./components/ContactUs";
import QuizParticipate from "./components/QuizParticipation";
import ViewAppointments from "./components/AppointmentHome";
import AddFeedback from './components/AddFeedback';
import ScheduleforFeedback from './components/FindScheduleForFeedback';
import FeedbackList from './components/ViewFeedbacks';
import FeedbackListByID from './components/ViewFeedbackbyUserID';
import UpdateFeedback from './components/UpdateFeedback';
import DeleteFeedback from "./components/DeleteFeedback";
import ScheduleByID from "./components/ViewSchedulebyUser";
import Analytics from "./components/Analytics";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <UserMainPage />
              </PublicElement>
            }
          />
          <Route
            path="/contact-us"
            element={
              <PublicElement>
                <ContactUs />
              </PublicElement>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <UserElement>
                <UserHome />
              </UserElement>
            }
          />
          <Route
            path="/user-support"
            element={
              <UserElement>
                <Addticket />
              </UserElement>
            }
          />
          <Route
            path="/user-ticket/view"
            element={
              <UserElement>
                <ViewTicket />
              </UserElement>
            }
          />
          <Route
            path="/user-goal"
            element={
              <UserElement>
                <Addgoal />
              </UserElement>
            }
          />
          <Route
            path="/view-payment"
            element={
              <UserElement>
                <Mycards />
              </UserElement>
            }
          />
          <Route
            path="/add-payment"
            element={
              <UserElement>
                <Addpayment />
              </UserElement>
            }
          />
          <Route
            path="/update-payment/:id"
            element={
              <UserElement>
                <Update />
              </UserElement>
            }
          />
          <Route
            path="/getgoal/:id"
            element={
              <UserElement>
                <Weeklygoal />
              </UserElement>
            }
          />
          <Route
            path="/updategoal/:id"
            element={
              <UserElement>
                <Updategoal />
              </UserElement>
            }
          />
          <Route
            path="/admin/user-stats"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UserStats />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/doctor-home"
            element={
              <DoctorElement>
                <DoctorMainPage />
              </DoctorElement>
            }
          />
          <Route
            path="/quiz"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <ViewQuestions />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/add-quiz"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <AddQuestions />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/editquiz/:id"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <QuizEdit />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/report"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <Report />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/schedule"
            element={
              <DoctorElement>
                <AdimnSideBar>
                  <AddSchedule />
                </AdimnSideBar>
              </DoctorElement>
            }
          />
          <Route
            path="/admin/schedule"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <GetSchedules />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/update-schedule/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UpdateSchedule />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/delete-schedule/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <DeleteSchedule />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/admin/search-schedule"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <SearchSchedule />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/user-check-reports"
            element={
              <UserElement>
                <CheckReports />
              </UserElement>
            }
          />
          <Route
            path="/user-appointment"
            element={
              <PublicElement>
                <AddAppointment />
              </PublicElement>
            }
          />
          <Route
            path="/user-quiz"
            element={
              <PublicElement>
                <QuizList />
              </PublicElement>
            }
          />
          <Route
            path="/participate-quiz"
            element={
              <PublicElement>
                <QuizParticipate />
              </PublicElement>
            }
          />
          <Route
            path="/user-medical-profile"
            element={
              <UserElement>
                <MedicalProfile />
              </UserElement>
            }
          />
          <Route
            path="/admin/staff"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <Staff />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/admin/accounts"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UserAccounts />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/admin/appointment"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <AllAppointment />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/support-home"
            element={
              <SupportElement>
                <Tickets />
              </SupportElement>
            }
          />
          <Route
            path="/update/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UpdateAppointment />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <DeleteAppointment />
                </AdimnSideBar>
              </AdminElement>
            }
          />
          <Route
            path="/add"
            element={
              <PharmacistElement>
                <AddPatient />
              </PharmacistElement>
            }
          />
          <Route
            path="/manage"
            element={
              <PharmacistElement>
                <ManagePatient />
              </PharmacistElement>
            }
          />
          <Route
            path="/add_medicine"
            element={
              <PharmacistElement>
                <AddMedicine />
              </PharmacistElement>
            }
          />
          <Route
            path="/manage_medicine"
            element={
              <PharmacistElement>
                <ManageMedicine />
              </PharmacistElement>
            }
          />
          <Route
            path="/add_invoice"
            element={
              <PharmacistElement>
                <AddInvoice />
              </PharmacistElement>
            }
          />
          <Route
            path="/manage_invoice"
            element={
              <PharmacistElement>
                <ManageInvoice />
              </PharmacistElement>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PharmacistElement>
                <Dashboard />
              </PharmacistElement>
            }
          />

          <Route
            path="/manage"
            element={
              <PharmacistElement>
                <ManagePatient />
              </PharmacistElement>
            }
          />
          <Route
            path="/manage_medicine"
            element={
              <PharmacistElement>
                <ManageMedicine />
              </PharmacistElement>
            }
          />

          <Route
            path="/appointment/home"
            element={
              <UserElement>
                <ViewAppointments/>
              </UserElement>
            }
          />

        <Route 
             path= "feedback/adding/"
            element={<UserElement>
              <AddFeedback/>
            </UserElement>}
          />
        
           <Route 
             path= "feedback/"
             element={
              <AdminElement>
                <AdimnSideBar>
                  <FeedbackList />
                </AdimnSideBar>
              </AdminElement>
            }/>
          <Route
            path="feedback/update/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <UpdateFeedback />
                </AdimnSideBar>
              </AdminElement>
            }
             />
            <Route
            path="feedback/delete/:id"
            element={
              <AdminElement>
                <AdimnSideBar>
                  <DeleteFeedback />
                </AdimnSideBar>
              </AdminElement>
            }
            
            />
            <Route 
            path = "/schedule/:id"
            element={<UserElement>
              <ScheduleByID/>
            </UserElement>}
          />
          
          <Route
            path="/supporthome-analytics"
            element={
              <SupportElement>
                <Analytics />
              </SupportElement>
            }
          />

        </Routes>
        
      </BrowserRouter>
    </>
  );
};

function PublicElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === null || userType === "user") {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

function UserElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "user") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

function AdminElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "admin") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

function DoctorElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "doctor") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

function PharmacistElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "pharmacist") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

function SupportElement({ children }) {
  const userType = localStorage.getItem("userRole");

  if (userType === "support agent") {
    return <>{children}</>;
  } else {
    alert("Access denied");
    window.location.replace("/");
  }
}

export default App;
