import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../../lib/supabase';
import ExperienceItem from './ExperienceItem';
import { Button, Input } from '@nextui-org/react';

const Experiences = ({ job }) => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('res_experiences')
          .select(`
            *,
            skills:res_transferable_skills(*),
            achievements:res_achievements(*),
            awards:res_awards(*),
            certifications:res_certifications(*)
          `)
          .eq('job_id', job.id);

        if (fetchError) throw fetchError;
        setExperiences(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [job.id]); // Only dependent on job.id

  const handleAddExperience = async () => {
    if (!newExperience.trim()) return;

    try {
      const { data, error: insertError } = await supabase
        .from('res_experiences')
        .insert([{ job_id: job.id, experience_text: newExperience }])
        .single();

      if (insertError) throw insertError;
      setExperiences([...experiences, { ...data, skills: [], achievements: [], awards: [], certifications: [] }]);
      setNewExperience('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    try {
      const { error: deleteError } = await supabase
        .from('res_experiences')
        .delete()
        .eq('id', experienceId);

      if (deleteError) throw deleteError;
      setExperiences(experiences.filter(exp => exp.id !== experienceId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateExperience = (updatedExperience) => {
    setExperiences(experiences.map(exp => 
      exp.id === updatedExperience.id ? updatedExperience : exp
    ));
  };

  if (loading) return <div>Loading experiences...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Experiences at {job.company}</h2>
      
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Add a new experience"
          value={newExperience}
          onChange={(e) => setNewExperience(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddExperience()}
          fullWidth
        />
        <Button auto onClick={handleAddExperience}>Add</Button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            onDelete={handleDeleteExperience}
            onUpdate={handleUpdateExperience}
          />
        ))}
      </div>
    </div>
  );
};

Experiences.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
  }).isRequired,
};

export default Experiences;
