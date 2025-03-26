'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Recording } from '@/types/supabase';

export default function TestPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [testResult, setTestResult] = useState<{
    database: string;
    storage: string;
    auth: string;
  }>({
    database: '',
    storage: '',
    auth: '',
  });

  useEffect(() => {
    testDatabaseConnection();
    checkAdminStatus();
  }, []);

  async function checkAdminStatus() {
    const { data: { session }, error } = await supabase.auth.getSession();
    const isAdminUser = !!session?.user;
    setIsAdmin(isAdminUser);
    setTestResult(prev => ({
      ...prev,
      auth: isAdminUser 
        ? 'Authenticated as admin ✅' 
        : 'Not authenticated as admin ❌'
    }));
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',  // or use signInWithPassword if you prefer email/password
    });
    if (error) {
      console.error('Login error:', error);
      alert('Login failed');
    } else {
      checkAdminStatus();
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      alert('Logout failed');
    } else {
      setIsAdmin(false);
      checkAdminStatus();
    }
  }

  async function testDatabaseConnection() {
    try {
      // Test database connection
      const { data, error } = await supabase
        .from('recordings')
        .select('*')
        .limit(1);

      if (error) throw error;

      setRecordings(data || []);
      setTestResult(prev => ({
        ...prev,
        database: 'Database connection successful! ✅',
      }));
    } catch (error: any) {
      console.error('Database test error:', error);
      setTestResult(prev => ({
        ...prev,
        database: `Database connection failed: ${error.message} ❌`,
      }));
    } finally {
      setLoading(false);
    }
  }

  async function testStorageConnection() {
    try {
      // Create a small test file
      const testFile = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });

      // Try to upload to storage
      const { data, error } = await supabase.storage
        .from('recordings')
        .upload(`test-${Date.now()}.txt`, testFile);

      if (error) throw error;

      // If upload successful, try to delete it
      if (data) {
        await supabase.storage
          .from('recordings')
          .remove([data.path]);
      }

      setTestResult(prev => ({
        ...prev,
        storage: 'Storage connection successful! ✅',
      }));
    } catch (error: any) {
      console.error('Storage test error:', error);
      setTestResult(prev => ({
        ...prev,
        storage: `Storage connection failed: ${error.message} ❌`,
      }));
    }
  }

  async function createTestRecord() {
    try {
      const testRecording = {
        title: 'Test Recording',
        description: 'This is a test recording entry',
        recorded_at: new Date().toISOString(),
        location: {
          city: 'Test City',
          country: 'Test Country',
        },
        duration: 0,
        tags: ['test'],
        audio_url: 'test-url',
      };

      const { data, error } = await supabase
        .from('recordings')
        .insert(testRecording)
        .select()
        .single();

      if (error) throw error;

      setRecordings(prev => [...prev, data]);
      alert('Test record created successfully!');
    } catch (error: any) {
      console.error('Error creating test record:', error);
      alert(`Error creating test record: ${error.message}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Supabase Connection Tests</h1>
      
      <div className="space-y-6">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2 text-gray-800">Authentication Status</h2>
          <p className="mb-2 text-gray-700">{testResult.auth}</p>
          <button
            onClick={isAdmin ? handleLogout : handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isAdmin ? 'Logout' : 'Login as Admin'}
          </button>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2 text-gray-800">Database Connection</h2>
          <p className="mb-2 text-gray-700">{loading ? 'Testing connection...' : testResult.database}</p>
          <button
            onClick={testDatabaseConnection}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Database Again
          </button>
        </div>

        {/* Only show admin operations when authenticated */}
        {isAdmin && (
          <>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold mb-2 text-gray-800">Storage Connection</h2>
              <p className="mb-2 text-gray-700">{testResult.storage || 'Not tested yet'}</p>
              <button
                onClick={testStorageConnection}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Test Storage Connection
              </button>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="font-semibold mb-2 text-gray-800">Create Test Record</h2>
              <button
                onClick={createTestRecord}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create Test Record
              </button>
            </div>
          </>
        )}

        {/* Always show the recordings list */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="font-semibold mb-2 text-gray-800">Existing Recordings ({recordings.length})</h2>
          <div className="space-y-2">
            {recordings.map((recording) => (
              <div key={recording.id} className="p-2 bg-gray-50 rounded border">
                <p className="font-medium text-gray-800">{recording.title}</p>
                <p className="text-sm text-gray-600">{recording.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 