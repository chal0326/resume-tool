import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../lib/supabase';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Component for displaying and editing an experience
   * 
   * @param {object} experience - The experience to display
   * @param {function} onDelete - Function to call when experience is deleted
   * @param {function} onUpdate - Function to call when experience is updated
   * 
   * @returns {ReactElement}
   */
/******  762ca273-99d2-4802-8c8a-0374180da8dd  *******/const ExperienceItem = ({ experience, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(experience.experience_text);
  const [skills, setSkills] = useState(experience.skills || []);
  const [achievements, setAchievements] = useState(experience.achievements || []);
  const [awards, setAwards] = useState(experience.awards || []);
  const [certifications, setCertifications] = useState(experience.certifications || []);

  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [newAward, setNewAward] = useState('');
  const [newCertification, setNewCertification] = useState('');
  
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showAchievementInput, setShowAchievementInput] = useState(false);
  const [showAwardInput, setShowAwardInput] = useState(false);
  const [showCertificationInput, setShowCertificationInput] = useState(false);

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

  const handleAddItem = async (type, value, stateSetter, tableName, fieldName) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert([{ experience_id: experience.id, [fieldName]: value }])
        .single();

      if (error) throw error;
      stateSetter(prev => [...prev, data]);
    } catch (err) {
      console.error(`Error adding ${type}:`, err.message);
    }
  };

  const handleDeleteItem = async (type, itemId, stateSetter, tableName) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      stateSetter(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      console.error(`Error deleting ${type}:`, err.message);
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

      {/* Reusable component for each section */}
      {[
        { title: 'Skills', items: skills, newItem: newSkill, setNewItem: setNewSkill, stateSetter: setSkills, tableName: 'res_transferable_skills', fieldName: 'skill_name', showInput: showSkillInput, setShowInput: setShowSkillInput },
        { title: 'Achievements', items: achievements, newItem: newAchievement, setNewItem: setNewAchievement, stateSetter: setAchievements, tableName: 'res_achievements', fieldName: 'achievement', showInput: showAchievementInput, setShowInput: setShowAchievementInput },
        { title: 'Awards', items: awards, newItem: newAward, setNewItem: setNewAward, stateSetter: setAwards, tableName: 'res_awards', fieldName: 'award', showInput: showAwardInput, setShowInput: setShowAwardInput },
        { title: 'Certifications', items: certifications, newItem: newCertification, setNewItem: setNewCertification, stateSetter: setCertifications, tableName: 'res_certifications', fieldName: 'certification', showInput: showCertificationInput, setShowInput: setShowCertificationInput }
      ].map(({ title, items, newItem, setNewItem, stateSetter, tableName, fieldName, showInput, setShowInput }) => (
        <div className="mb-4" key={title}>
          <h3 className="text-xl mb-2">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <span 
                key={item.id}
                className="bg-blue-500 px-2 py-1 rounded flex items-center gap-2"
              >
                {item[fieldName]}
                <button
                  onClick={() => handleDeleteItem(title.toLowerCase(), item.id, stateSetter, tableName)}
                  className="text-xs hover:text-red-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {showInput ? (
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`Add a ${title.toLowerCase().slice(0, -1)}`}
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem(title.toLowerCase(), newItem, stateSetter, tableName, fieldName)}
              />
              <Button auto onClick={() => handleAddItem(title.toLowerCase(), newItem, stateSetter, tableName, fieldName)}>Add</Button>
              <Button auto flat onClick={() => setShowInput(false)}>Cancel</Button>
            </div>
          ) : (
            <Button auto onClick={() => setShowInput(true)}>Add {title.slice(0, -1)}</Button>
          )}
        </div>
      ))}
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
    })),
    achievements: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      achievement: PropTypes.string.isRequired
    })),
    awards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      award: PropTypes.string.isRequired
    })),
    certifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      certification: PropTypes.string.isRequired
    }))
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default ExperienceItem;
