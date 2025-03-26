'use client';

import { Recording } from '@/types/supabase';
import { formatDuration } from '@/lib/utils';

interface RecordingCardProps {
  recording: Recording;
  onPlay: (recording: Recording) => void;
}

export const RecordingCard = ({ recording, onPlay }: RecordingCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{recording.title}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {recording.location.city}, {recording.location.country}
          </p>
        </div>
        <button
          onClick={() => onPlay(recording)}
          className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-700 line-clamp-2">{recording.description}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {recording.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {new Date(recording.recorded_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}; 