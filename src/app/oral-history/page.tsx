import { RecordingList } from '@/components/oral-history/RecordingList';
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

      <RecordingList recordings={recordings} />
    </div>
  );
} 