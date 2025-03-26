'use client';

import { Recording } from '@/types/supabase';
import { RecordingCard } from './RecordingCard';

interface RecordingListProps {
  recordings: Recording[];
}

export const RecordingList = ({ recordings }: RecordingListProps) => {
  const handlePlay = (recording: Recording) => {
    // TODO: Implement audio playback
    console.log('Playing:', recording.title);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recordings.map((recording) => (
        <RecordingCard
          key={recording.id}
          recording={recording}
          onPlay={handlePlay}
        />
      ))}
    </div>
  );
}; 