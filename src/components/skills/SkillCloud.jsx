import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '@nextui-org/react';
import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';

const SkillCloud = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('res_transferable_skills')
      .select('skill_name')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data;
  };

  const calculateFrequencies = (skills) => {
    const frequencyMap = {};
    skills.forEach(({ skill_name }) => {
      frequencyMap[skill_name] = (frequencyMap[skill_name] || 0) + 1;
    });

    const words = Object.keys(frequencyMap).map((skill) => ({
      text: skill,
      size: frequencyMap[skill] * 10, // Adjust multiplier for size scaling
      weight: frequencyMap[skill],
    }));

    return words;
  };

  const draw = (words, width, height) => {
    // Clear any existing SVG
    d3.select("#skill-cloud").select("svg").remove();

    const svg = d3.select("#skill-cloud")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    words.forEach((word) => {
      g.append("text")
        .style("font-size", `${word.size}px`)
        .style("font-weight", word.weight > 1 ? 'bold' : 'normal')
        .style("fill", d3.schemeCategory10[Math.floor(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${word.x},${word.y})rotate(${word.rotate})`)
        .text(word.text);
    });
  };

  const generateCloud = async () => {
    setLoading(true);
    setError(null);

    try {
      const skillsData = await fetchSkills();

      if (!skillsData.length) {
        setError('No skills found for this user.');
        return;
      }

      const words = calculateFrequencies(skillsData);

      const width = 600;
      const height = 400;

      const layout = d3Cloud()
        .size([width, height])
        .words(words.map(d => ({ ...d })))
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 90 : 0))
        .font("Impact")
        .fontSize(d => d.size)
        .on("end", (wordsArr) => draw(wordsArr, width, height));

      layout.start();
    } catch (err) {
      console.error('Error generating skill cloud:', err);
      setError('Failed to generate skill cloud. Please try again.');
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
          disabled={loading}
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
        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

SkillCloud.propTypes = {
  userId: PropTypes.string.isRequired
};

export default SkillCloud; 