import PropTypes from 'prop-types';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '@nextui-org/react';
import * as d3 from 'd3';

const SkillCloud = ({ userId }) => {
  const [loading, setLoading] = useState(false);

  // Move draw function outside of generateCloud
  function draw(words, width, height) {
    d3.select("#skill-cloud")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`)
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", d => `${d.size}px`)
      .style("fill", () => d3.schemeCategory10[~~(Math.random() * 10)])
      .attr("text-anchor", "middle")
      .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
      .text(d => d.text);
  }

  const generateCloud = async () => {
    setLoading(true);
    try {
      // Fetch all transferable skills for the user
      const { data: experiences, error: expError } = await supabase
        .from('res_experiences')
        .select(`
          id,
          res_transferable_skills (
            skill_name
          ),
          job_id,
          res_jobs!inner (
            user_id
          )
        `)
        .eq('res_jobs.user_id', userId);

      if (expError) throw expError;

      // Count skill occurrences
      const skillCounts = {};
      experiences.forEach(exp => {
        exp.res_transferable_skills.forEach(skill => {
          skillCounts[skill.skill_name] = (skillCounts[skill.skill_name] || 0) + 1;
        });
      });

      // Convert to array for D3
      const words = Object.entries(skillCounts).map(([text, value]) => ({
        text,
        size: 10 + (value * 10) // Scale the size based on occurrence
      }));

      // Clear previous visualization
      d3.select("#skill-cloud").selectAll("*").remove();

      // Set up the word cloud layout
      const width = 800;
      const height = 400;

      const layout = d3.layout.cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(() => (~~(Math.random() * 2) * 90))
        .fontSize(d => d.size)
        .on("end", words => draw(words, width, height));

      layout.start();
    } catch (error) {
      console.error('Error generating skill cloud:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Skill Cloud</h2>
        <Button
          color="primary"
          onClick={generateCloud}
          isLoading={loading}
        >
          {loading ? 'Generating...' : 'Generate Skill Cloud'}
        </Button>
      </div>
      <div 
        id="skill-cloud" 
        className="bg-gray-800 rounded-lg p-4 min-h-[400px] flex items-center justify-center"
      >
        {!loading && !document.querySelector("#skill-cloud svg") && (
          <p className="text-gray-400">Click generate to view your skill cloud</p>
        )}
      </div>
    </div>
  );
};

SkillCloud.propTypes = {
  userId: PropTypes.string.isRequired
};

export default SkillCloud; 