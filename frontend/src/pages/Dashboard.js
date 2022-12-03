import React from "react";
import "../output.css";
import ErrorBoundary from "../components/ErrorBoundary";
import Box from "../components/Box";
import VotersBox from "../components/VotersBox";
import ElectionsBox from "../components/ElectionsBox";
import ElectionCommitteeBox from "../components/ElectionCommitteeBox";
import CategoryBox from "../components/CategoryBox";
import CandidatesBox from "../components/CandidatesBox";
import ElectionsListBox from "../components/ElectionsListBox";
import ActiveElections from "../components/ActiveElections";
import MainBox from "../components/MainBox";
import PercentageVoters from "../components/PercentageVoters";


const Dashboard = () => {
    
    return (
        <div className="w-full min-h-screen font-poppins mx-0 bg-[#151314] py-8 px-16 grid grid-cols-8  grid-rows-[250px_200px_200px_250px] gap-3 grid-flow-row">
            <div className="col-span-2 row-span-2">
                <ErrorBoundary>
                    <Box>
                        <ElectionsListBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <ElectionsBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <ActiveElections />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <PercentageVoters />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-6 row-span-2 h-full">
                <ErrorBoundary>
                    <Box>
                        <MainBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="row-span-2 col-span-2 ">
                <ErrorBoundary>
                    <Box>
                        <VotersBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <CandidatesBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <CategoryBox />
                    </Box>
                </ErrorBoundary>
            </div>
            <div className="col-span-2">
                <ErrorBoundary>
                    <Box>
                        <ElectionCommitteeBox />
                    </Box>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default Dashboard