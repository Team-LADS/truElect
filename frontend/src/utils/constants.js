export const truElectContractABI =[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "CandidateRegisteredEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "adder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newElectionCommHead",
          "type": "address"
        }
      ],
      "name": "ChangeElectionCommHead",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "electors",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "consent",
          "type": "bool"
        }
      ],
      "name": "ConcensusVote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "ProfileRegisteredEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "category",
          "type": "string"
        }
      ],
      "name": "VotedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_role",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "voterAddress",
          "type": "address[]"
        }
      ],
      "name": "VoterRegisteredEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalVotes",
          "type": "uint256"
        }
      ],
      "name": "VotesCountedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "VotingEndedEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        }
      ],
      "name": "VotingStartedEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "Category",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "activeElectionArrays",
      "outputs": [
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "VotingStarted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "VotingEnded",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "VotesCounted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isResultPublic",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalVotesCasted",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "activeElections",
      "outputs": [
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "VotingStarted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "VotingEnded",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "VotesCounted",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isResultPublic",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalVotesCasted",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "activeModify",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "addCategories",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "category",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "candidatesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "categories",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "changeElectionCommHead",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_role",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "checkRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "clearElectionQueue",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_position",
          "type": "string"
        }
      ],
      "name": "compileVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "winnigVotes",
          "type": "uint256"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "category",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct TruElect.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "concensusVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionCommHead",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "endVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fetchElection",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "category",
              "type": "string"
            },
            {
              "internalType": "uint256[]",
              "name": "candidatesID",
              "type": "uint256[]"
            },
            {
              "internalType": "bool",
              "name": "VotingStarted",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "VotingEnded",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "VotesCounted",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isResultPublic",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "totalVotesCasted",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "allowedVoters",
              "type": "string[]"
            }
          ],
          "internalType": "struct TruElect.Election[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "category",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct TruElect.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUserProfile",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "getWinningCandidate",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "category",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct TruElect.Candidate",
          "name": "",
          "type": "tuple"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "makeResultPublic",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "category",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct TruElect.Candidate",
          "name": "",
          "type": "tuple"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidateName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "registerCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "cid",
          "type": "string"
        }
      ],
      "name": "registerUserProfile",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_value",
          "type": "bool"
        }
      ],
      "name": "setPaused",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "_candidateID",
          "type": "uint256[]"
        },
        {
          "internalType": "string[]",
          "name": "_allowedVoters",
          "type": "string[]"
        }
      ],
      "name": "setUpElection",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        }
      ],
      "name": "startVotingSession",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tetToken",
      "outputs": [
        {
          "internalType": "contract ITruElectToken",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_role",
          "type": "string"
        },
        {
          "internalType": "uint8",
          "name": "votingPower",
          "type": "uint8"
        },
        {
          "internalType": "address[]",
          "name": "_address",
          "type": "address[]"
        }
      ],
      "name": "uploadVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_category",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_candidateID",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "votedForCategory",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "votedCandidateId",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "votingPower",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "votesForCategory",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
export const truElectContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"