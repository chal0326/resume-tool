import  { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ExperienceItem from './ExperienceItem';
import { Button, Input } from '@nextui-org/react';
import PropTypes from 'prop-types';

const Experiences = ({ job }) => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, [job]);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('res_experiences')
      .select('*')
      .eq('job_id', job.id);

    if (error) {
      console.error('Error fetching experiences:', error.message);
    } else {
      setExperiences(data);
    }
  };

  const handleAddExperience = async () => {
    const { data, error } = await supabase
      .from('res_experiences')
      .insert([{ job_id: job.id, experience_text: newExperience }])
      .single();

    if (error) {
      console.error('Error adding experience:', error.message);
    } else {
      setExperiences([...experiences, data]);
      setNewExperience('');
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-4">Experiences at {job.company}</h2>
      <div className="flex items-center space-x-4 mb-4">
        <Input
          placeholder="Describe your experience"
          fullWidth
          value={newExperience}
          onChange={(e) => setNewExperience(e.target.value)}
        />
        <Button auto onClick={handleAddExperience}>
          Add Experience
        </Button>
      </div>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceItem key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
};
Experiences.propTypes = {
    job: PropTypes.shape({
      id: PropTypes.string.isRequired,          // Unique ID of the job
      company: PropTypes.string.isRequired,      // Company name
    }).isRequired,
  };
export default Experiences;
