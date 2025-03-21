"use client";

import React, { useState } from 'react';
import './marathon-majors-stars.scss';

const MarathonMajorsStars = () => {
  const [activeStar, setActiveStar] = useState<number | null>(null);

  const marathonMajors = [
    {
      name: "Chicago",
      completed: true,
      year: "2006",
      description: "The flat, fast course through 29 neighborhoods with amazing crowd support."
    },
    {
      name: "New York",
      completed: true,
      year: "2010",
      description: "The world's largest marathon across all five boroughs of NYC."
    },
    {
      name: "Berlin",
      completed: false,
      year: "TBD",
      description: "The fastest marathon course with 9 world records set."
    },
    {
      name: "Boston",
      completed: false,
      year: "TBD",
      description: "The world's oldest annual marathon with the iconic Heartbreak Hill."
    },
    {
      name: "London",
      completed: false,
      year: "TBD",
      description: "Running past iconic landmarks like Tower Bridge and Buckingham Palace."
    },
    {
      name: "Tokyo",
      completed: false,
      year: "TBD",
      description: "The newest of the original six majors, famous for its efficiency."
    },
    {
      name: "Sydney",
      completed: false,
      year: "TBD",
      description: "The newest addition to the World Marathon Majors."
    }
  ];

  // Calculate progress for display
  const completedCount = marathonMajors.filter(major => major.completed).length;
  const totalCount = marathonMajors.length;

  return (
    <div className="marathon-majors">
      <div className="marathon-majors__count-text">
        {completedCount}/{totalCount} Marathon Majors Completed
      </div>

      <div className="marathon-majors__stars">
        {marathonMajors.map((major, index) => (
          <div
            key={major.name}
            className={`marathon-majors__star-container ${major.completed ? 'marathon-majors__star-container--completed' : ''}`}
            onMouseEnter={() => setActiveStar(index)}
            onMouseLeave={() => setActiveStar(null)}
          >
            <div className="marathon-majors__star">
              <div className="marathon-majors__star-content">
                <div className="marathon-majors__star-city">{major.name}</div>
                <div className="marathon-majors__star-year">
                  {major.completed ? major.year : "TBD"}
                </div>
              </div>
            </div>

            {activeStar === index && (
              <div className="marathon-majors__tooltip">
                <div className="marathon-majors__tooltip-title">{major.name}</div>
                <div className="marathon-majors__tooltip-description">{major.description}</div>
                <div className="marathon-majors__tooltip-status">
                  {major.completed ? `Completed: ${major.year}` : 'Status: Not Yet Run'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarathonMajorsStars;