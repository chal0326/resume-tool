import React, { useState, useContext } from 'react';
import { supabase } from './supabaseClient';
import { AuthContext } from './AuthContext';

const ResumeUpload = () => {
  const { user } = useContext(AuthContext);
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);

  const handleParseResume = async () => {
    setParsing(true);

    // Placeholder for parsing logic
    // Implement a parser or use a library to extract data

    // Example: Extract job titles using a simple regex (for demonstration purposes)
    const jobTitles = resumeText.match(/(?:Job Title|Position):\s*(.*)/gi);

    // Process extracted data and insert into Supabase
    // ...

    setParsing(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <h1 className="text-3xl mb-6">Upload Your Resume</h1>
      <textarea
        className="w-full h-64 p-4 bg-gray-700 rounded mb-4"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      ></textarea>
      <button
        onClick={handleParseResume}
        className="bg-green-500 p-2 rounded hover:bg-green-600 transition"
        disabled={parsing}
      >
        {parsing ? 'Parsing...' : 'Parse Resume'}
      </button>
    </div>
  );
};

export default ResumeUpload;
