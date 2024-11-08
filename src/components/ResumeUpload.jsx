import { useState, useContext } from 'react';
import { AuthContext } from '/src/AuthContext.js';
import PropTypes from 'prop-types';

const ResumeUpload = () => {
  const { user } = useContext(AuthContext);
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);

  const handleParseResume = () => {
    if (!user) {
      alert('You must be logged in to parse your resume.');
      return;
    }

    setParsing(true);

    // Regex to extract job titles and companies from resume text (placeholder example)
    const jobEntries = [...resumeText.matchAll(/(?:Job Title|Position):\s*(.*)(?:\n|$)/gi)];
    const companyEntries = [...resumeText.matchAll(/(?:Company):\s*(.*)(?:\n|$)/gi)];

    const parsedJobs = jobEntries.map((entry, index) => ({
      title: entry[1].trim(),
      company: companyEntries[index] ? companyEntries[index][1].trim() : 'Unknown Company'
    }));

    console.log(parsedJobs); // Optional: For debugging

    setParsing(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      {user ? (
        <>
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
        </>
      ) : (
        <div>
          <h1 className="text-3xl mb-6">Please Log In</h1>
          <p>You must be logged in to upload and parse your resume.</p>
        </div>
      )}
    </div>
  );
};

ResumeUpload.propTypes = {
  resumeText: PropTypes.string,
  setResumeText: PropTypes.func,
  user: PropTypes.object
};

export default ResumeUpload;
