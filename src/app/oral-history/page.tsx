import { RecordingCard } from '@/components/oral-history/RecordingCard';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate every hour

async function getRecordings() {
  const { data: recordings, error } = await supabase
    .from('recordings')
    .select('*')
    .order('recorded_at', { ascending: false });

  if (error) {
    console.error('Error fetching recordings:', error);
    return [];
  }

  return recordings;
}

export default async function OralHistoryPage() {
  const recordings = await getRecordings();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Oral History Project</h1>
        <p className="text-gray-600">
          A collection of recorded conversations and stories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((recording) => (
          <RecordingCard
            key={recording.id}
            recording={recording}
            onPlay={(rec) => {
              // TODO: Implement audio playback
              console.log('Playing:', rec.title);
            }}
          />
        ))}
      </div>
    </div>
  );
} 