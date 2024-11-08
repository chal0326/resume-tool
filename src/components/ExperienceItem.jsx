import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Button, Input } from '@nextui-org/react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ experience }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showSkillInput, setShowSkillInput] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('res_transferable_skills')
      .select('*')
      .eq('experience_id', experience.id);

    if (error) {
      console.error('Error fetching skills:', error.message);
    } else {
      setSkills(data);
    }
  };

  const handleAddSkill = async () => {
    const { data, error } = await supabase
      .from('res_transferable_skills')
      .insert([{ experience_id: experience.id, skill_name: newSkill }]);

    if (error) {
      console.error('Error adding skill:', error.message);
    } else {
      setSkills([...skills, data[0]]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  };

  return (
    <motion.div className="bg-gray-700 p-4 rounded" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <p className="mb-2">{experience.experience_text}</p>
      <div className="mb-2">
        <h3 className="text-xl mb-2">Transferable Skills</h3>
        <div className="flex flex-wrap space-x-2">
          {skills.map((skill) => (
            <span key={skill.id} className="bg-blue-500 px-2 py-1 rounded">
              {skill.skill_name}
            </span>
          ))}
        </div>
      </div>
      {showSkillInput ? (
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add a skill"
            fullWidth
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Button auto onClick={handleAddSkill}>Add Skill</Button>
          <Button auto flat onClick={() => setShowSkillInput(false)}>Cancel</Button>
        </div>
      ) : (
        <Button auto onClick={() => setShowSkillInput(true)}>Add Skill</Button>
      )}
    </motion.div>
  );
};

export default ExperienceItem;
