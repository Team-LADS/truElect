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
import Csv from '../components/Csv';
import SetUpElection from "../components/SetUpElection";
import CategoryList from '../components/CategoryList';
import CandidatesList from '../components/CandidatesList';
import { BsDisplay } from 'react-icons/bs';


const Dashboard = () => {
    const styleDash = {
        display:"grid",
        gridTemplateColumns: "1fr 4fr",
        gap:"1rem"
    }
    // "w-full min-h-screen font-poppins mx-0 bg-[#151314] py-8 px-16 grid grid-cols-8  grid-rows-[250px_200px_200px_250px] gap-3 grid-flow-row"

    return (
        <div style={styleDash}>

            <div className="l__part ">
                <div className=" ">
                    <ErrorBoundary>
                        <Box>
                            <VotersBox />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <CategoryList />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <CandidatesList />
                        </Box>
                    </ErrorBoundary>
                </div>
            </div>
            <div className="r__part">
                <div className=" mainbox">
                    <ErrorBoundary>
                        <Box>
                            <MainBox />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <ElectionsBox />
                        </Box>
                    </ErrorBoundary>
                </div> 
            
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <ActiveElections />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <PercentageVoters />
                        </Box>
                    </ErrorBoundary>
                </div>
            
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <CandidatesBox />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <CategoryBox />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <ElectionCommitteeBox />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <Csv />
                        </Box>
                    </ErrorBoundary>
                </div>
                <div className="">
                    <ErrorBoundary>
                        <Box>
                            <SetUpElection />
                        </Box>
                    </ErrorBoundary>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard