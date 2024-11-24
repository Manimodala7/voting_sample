import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import Header from './components/Header';
import ElectionCard from './components/ElectionCard';
import CandidateList from './components/CandidateList';
import AuthModal from './components/AuthModal';
import { Election } from './types';
import { useAuthStore } from './store/authStore';

const mockElections: Election[] = [
  {
    id: 1,
    title: "2024 Presidential Election",
    description: "Cast your vote for the next president of the nation. Every vote counts in shaping our future.",
    startDate: "2024-03-15",
    endDate: "2024-03-16",
    status: "active",
    candidates: [
      {
        id: 1,
        name: "Alexandra Mitchell",
        party: "Progressive Party",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
        votes: 0
      },
      {
        id: 2,
        name: "Marcus Thompson",
        party: "Conservative Alliance",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
        votes: 0
      },
      {
        id: 3,
        name: "Sarah Chen",
        party: "Reform Movement",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
        votes: 0
      }
    ]
  },
  {
    id: 2,
    title: "Local Council Elections",
    description: "Select your local council representatives who will work on community development projects.",
    startDate: "2024-04-01",
    endDate: "2024-04-02",
    status: "upcoming",
    candidates: []
  }
];

function App() {
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuthStore();

  const handleVote = (electionId: number) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const election = mockElections.find(e => e.id === electionId);
    if (election) {
      setSelectedElection(election);
      setSelectedCandidate(null);
      setHasVoted(false);
    }
  };

  const handleSubmitVote = () => {
    if (selectedCandidate && user) {
      setHasVoted(true);
      // In a real app, this would make an API call to record the vote
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <Toaster position="top-right" />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedElection ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Active Elections</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockElections.map((election) => (
                <ElectionCard
                  key={election.id}
                  election={election}
                  onVote={handleVote}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedElection(null)}
              className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center"
            >
              ← Back to Elections
            </button>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedElection.title}
              </h2>
              <p className="text-gray-600 mb-6">{selectedElection.description}</p>
              
              {!hasVoted ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Select your candidate:
                  </h3>
                  <CandidateList
                    candidates={selectedElection.candidates}
                    selectedId={selectedCandidate}
                    onSelect={setSelectedCandidate}
                  />
                  <button
                    onClick={handleSubmitVote}
                    disabled={!selectedCandidate}
                    className={`mt-8 w-full py-3 px-4 rounded-md text-white font-medium
                      ${selectedCandidate
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-gray-300 cursor-not-allowed'}`}
                  >
                    Submit Vote
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    Vote Submitted Successfully!
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Thank you for participating in the democratic process.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;