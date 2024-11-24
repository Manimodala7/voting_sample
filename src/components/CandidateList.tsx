import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateListProps {
  candidates: Candidate[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

export default function CandidateList({ candidates, selectedId, onSelect }: CandidateListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          onClick={() => onSelect(candidate.id)}
          className={`relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition
            ${selectedId === candidate.id ? 'ring-2 ring-indigo-600' : 'hover:shadow-lg'}`}
        >
          <img
            src={candidate.imageUrl}
            alt={candidate.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
            <p className="text-gray-600">{candidate.party}</p>
            {selectedId === candidate.id && (
              <div className="absolute top-2 right-2 bg-white rounded-full">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}