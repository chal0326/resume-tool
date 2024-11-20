import { useState, React } from 'react';
import PropTypes from 'prop-types';
import { Textarea, Checkbox } from '@nextui-org/react';
import { GlassModal, GlassInput, GlassButton } from '../common';

const AddJobModal = ({ show, onClose, onAddJob }) => {
  const initialState = {
    // res_jobs table
    job_title: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: false,
    
    // Related tables (will be inserted separately)
    experiences: [{ text: '', skill: '' }],  // res_experiences & res_transferable_skills
    achievements: [{ 
      name: '', 
      date: '', 
      description: '' 
    }],
    awards: [{
      name: '',
      date: '',
      description: ''
    }],
    certifications: [{
      name: '',
      date: '',
      description: '',
      organization: ''
    }]
  };

  const [jobData, setJobData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Format the data to match Supabase schema
      const formattedData = {
        job_title: jobData.job_title,
        company: jobData.company,
        start_date: jobData.start_date.substring(0, 7),  // YYYY-MM format
        end_date: jobData.is_current ? null : 
          jobData.end_date ? jobData.end_date.substring(0, 7) : null,
        is_current: jobData.is_current,
        
        // Format related data
        experiences: jobData.experiences.map(exp => ({
          experience_text: exp.text,
          transferable_skill: exp.skill
        })),
        
        achievements: jobData.achievements.map(achievement => ({
          achievement_name: achievement.name,
          date_received: achievement.date,
          description: achievement.description
        })),

        awards: jobData.awards.map(award => ({
          award_name: award.name,
          date_received: award.date,
          description: award.description
        })),

        certifications: jobData.certifications.map(cert => ({
          certification_name: cert.name,
          date_received: cert.date,
          description: cert.description,
          issuing_organization: cert.organization
        }))
      };

      await onAddJob(formattedData);
      setJobData(initialState);
      onClose();
    } catch (error) {
      console.error('Error adding job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setJobData(prev => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = { 
        ...newExperiences[index], 
        [field]: value 
      };
      return { ...prev, experiences: newExperiences };
    });
  };

  const addExperience = () => {
    setJobData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { text: '', skill: '' }]
    }));
  };

  return (
    <GlassModal 
      show={show} 
      onClose={onClose}
      title="Add New Job"
      onSubmit={handleSubmit}
      submitText={loading ? 'Adding...' : 'Add Job'}
    >
      <form className="space-y-4">
        <GlassInput
          label="Job Title"
          name="job_title"
          value={jobData.job_title}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <GlassInput
          label="Company"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <GlassInput
          label="Start Date"
          name="start_date"
          type="month"
          value={jobData.start_date}
          onChange={handleChange}
          required
          variant="bordered"
          classNames={{
            input: "text-white/90",
            label: "text-white/50",
            inputWrapper: "border-white/20 hover:border-white/40 bg-white/5"
          }}
        />

        <Checkbox
          name="is_current"
          isSelected={jobData.is_current}
          onValueChange={(checked) => handleChange({
            target: { name: 'is_current', type: 'checkbox', checked }
          })}
          className="text-white"
        >
          Current Position
        </Checkbox>

        {!jobData.current_job && (
          <GlassInput
            label="End Date"
            name="end_date"
            type="text"
            value={jobData.end_date}
            onChange={handleChange}
            fullWidth
          />
        )}

        <Textarea
          label="experience"
          name="experience"
          value={jobData.experience}
          onChange={handleChange}
          minRows={3}
          fullWidth
        />

        <Textarea
          label="Achievements (comma-separated)"
          name="achievements"
          placeholder="e.g., Exceeded sales goals, Managed a team of 10"
          value={jobData.achievements}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />

        <Textarea
          label="Awards (comma-separated)"
          name="awards"
          placeholder="e.g., Employee of the Month, Top Performer"
          value={jobData.awards}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />

        <Textarea
          label="Certifications (comma-separated)"
          name="certifications"
          placeholder="e.g., PMP, Six Sigma"
          value={jobData.certifications}
          onChange={handleChange}
          minRows={2}
          fullWidth
        />

        {/* Experiences Section */}
        <div className="space-y-2">
          <label className="text-white/90">Experiences</label>
          {jobData.experiences.map((exp, index) => (
            <div key={index} className="space-y-2">
              <Textarea
                label="Experience Description"
                value={exp.text}
                onChange={(e) => handleExperienceChange(index, 'text', e.target.value)}
                minRows={2}
                fullWidth
              />
              <GlassInput
                label="Transferable Skill"
                value={exp.skill}
                onChange={(e) => handleExperienceChange(index, 'skill', e.target.value)}
                fullWidth
              />
            </div>
          ))}
          <GlassButton
            variant="secondary"
            onClick={addExperience}
            type="button"
          >
            Add Experience
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
};

AddJobModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddJob: PropTypes.func.isRequired
};

export default AddJobModal;
