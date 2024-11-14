import { useState, useContext } from 'react';
import { AuthContext } from '/src/contexts/AuthContext';
import PropTypes from 'prop-types';

/**
 * Component for uploading and parsing resume text.
 * Allows users to paste their resume text into a textarea.
 * Upon clicking the "Parse Resume" button, attempts to extract job titles and companies
 * using regular expressions and displays the parsed results.
 * 
 * Utilizes `AuthContext` to ensure the user is logged in before allowing resume uploads.
 * 
 * States:
 * - `resumeText`: Stores the text input from the user.
 * - `parsing`: Boolean indicating if the resume is currently being parsed.
 * - `parsedData`: Array of objects containing parsed job titles and companies.
 * 
 * Returns a UI for uploading and parsing resumes, including a textarea for input
 * and a button to initiate parsing. Displays parsed job titles and companies upon success.
 */
const ResumeUpload = () => {
  const { user } = useContext(AuthContext);
  const [resumeText, setResumeText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsedData, setParsedData] = useState([]);

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

    setParsedData(parsedJobs);
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

      {parsedData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl mb-4">Parsed Data</h2>
          <ul className="list-disc list-inside">
            {parsedData.map((job, index) => (
              <li key={index}>
                <strong>Job Title:</strong> {job.title} <br />
                <strong>Company:</strong> {job.company}
              </li>
            ))}
          </ul>
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
