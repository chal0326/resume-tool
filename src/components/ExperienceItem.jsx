import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ experience, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(experience.experience_text);
  const [skills, setSkills] = useState(experience.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('res_experiences')
        .update({ experience_text: editedText })
        .eq('id', experience.id);

      if (error) throw error;
      onUpdate({ ...experience, experience_text: editedText });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating experience:', err.message);
    }
  };

  const handleAddSkill = async () => {
    try {
      const { data, error } = await supabase
        .from('res_transferable_skills')
        .insert([{ experience_id: experience.id, skill_name: newSkill }])
        .single();

      if (error) throw error;
      setSkills([...skills, data]);
      setNewSkill('');
      setShowSkillInput(false);
    } catch (err) {
      console.error('Error adding skill:', err.message);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      const { error } = await supabase
        .from('res_transferable_skills')
        .delete()
        .eq('id', skillId);

      if (error) throw error;
      setSkills(skills.filter(skill => skill.id !== skillId));
    } catch (err) {
      console.error('Error deleting skill:', err.message);
    }
  };

  return (
    <motion.div 
      className="bg-gray-700 p-4 rounded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isEditing ? (
        <div className="mb-4">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            fullWidth
            className="mb-2"
          />
          <div className="flex space-x-2">
            <Button auto onClick={handleUpdate}>Save</Button>
            <Button auto flat onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start mb-4">
          <p>{experience.experience_text}</p>
          <div className="flex space-x-2">
            <Button auto size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button auto size="sm" color="error" onClick={() => onDelete(experience.id)}>Delete</Button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-xl mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span 
              key={skill.id}
              className="bg-blue-500 px-2 py-1 rounded flex items-center gap-2"
            >
              {skill.skill_name}
              <button
                onClick={() => handleDeleteSkill(skill.id)}
                className="text-xs hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {showSkillInput ? (
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <Button auto onClick={handleAddSkill}>Add</Button>
          <Button auto flat onClick={() => setShowSkillInput(false)}>Cancel</Button>
        </div>
      ) : (
        <Button auto onClick={() => setShowSkillInput(true)}>Add Skill</Button>
      )}
    </motion.div>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.string.isRequired,
    experience_text: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      skill_name: PropTypes.string.isRequired
    }))
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ExperienceItem;