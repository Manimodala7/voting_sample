import React from 'react';
import { Calendar, Users, Timer } from 'lucide-react';
import { Election } from '../types';

interface ElectionCardProps {
  election: Election;
  onVote: (electionId: number) => void;
}

export default function ElectionCard({ election, onVote }: ElectionCardProps) {
  const getStatusColor = (status: Election['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{election.title}</h3>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(election.status)}`}>
            {election.status}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600">{election.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>Starts: {new Date(election.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Timer className="h-5 w-5 mr-2" />
            <span>Ends: {new Date(election.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-5 w-5 mr-2" />
            <span>{election.candidates.length} Candidates</span>
          </div>
        </div>
        
        <button
          onClick={() => onVote(election.id)}
          disabled={election.status !== 'active'}
          className={`mt-6 w-full py-2 px-4 rounded-md text-white font-medium
            ${election.status === 'active'
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {election.status === 'active' ? 'Vote Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
}