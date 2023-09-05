import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import CommunityArticles from "./CommunityArticles";
import CommunityArticleDetails from "./CommunityArticleDetails";
import Landing from "./Landing";
import HowItWorks from "./HowItWorks";
import GetInspired from "./GetInspired";
import PublicArticles from "./PublicArticles";
import PublicArticleDetails from "./PublicArticleDetails";
import Login from "./Login";
import Register from "./Register";
import CommunityArticleUpdate from "./CommunityArticleUpdate";
import NewCommunityArticle from "./NewCommunityArticle";
import JournalDetails from "./JournalDetails";
import Journals from "./Journals";
import JournalUpdate from "./JournalUpdate";
import NewJournal from "./NewJournal";
import Progress from "./Progress";
import ProgressDetails from "./ProgressDetails";
import NewProgress from "./NewProgress";

const Main = () => {
    return (
        <main className="min-h-[550px] ">
            <Routes>
                <Route path="/landing" element={<Landing />} />
                <Route path="/" element={<Landing />} />
                <Route path="/howitworks" element={<HowItWorks />} />
                <Route path="/getinspired" element={<GetInspired />} />
                <Route path="/publicarticles" element={<PublicArticles />} />
                <Route
                    path="/publicarticles/:id"
                    element={<PublicArticleDetails />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                        path="communityarticles"
                        element={<CommunityArticles />}
                    />
                    <Route
                        path="communityarticles/:id"
                        element={<CommunityArticleDetails />}
                    />
                    <Route
                        path="communityarticles/:id/update"
                        element={<CommunityArticleUpdate />}
                    />
                    <Route
                        path="communityarticles/new"
                        element={<NewCommunityArticle />}
                    />
                    <Route path="journals" element={<Journals />} />
                    <Route path="journals/:id" element={<JournalDetails />} />
                    <Route
                        path="journals/:id/update"
                        element={<JournalUpdate />}
                    />
                    <Route path="journals/new" element={<NewJournal />} />
                    <Route path="progress" element={<Progress />} />
                    <Route
                        path="progress/progress/:id"
                        element={<ProgressDetails />}
                    />
                    <Route path="progress/new" element={<NewProgress />} />
                </Route>
            </Routes>
        </main>
    );
};

export default Main;
