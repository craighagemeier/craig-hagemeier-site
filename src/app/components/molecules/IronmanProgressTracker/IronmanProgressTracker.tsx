"use client";

import React from "react";
import "./ironman-progress-tracker.scss";

interface IronmanProgressTrackerProps {
  completedRaces: number;
  totalRaces?: number;
  raceData?: Array<{
    name?: string;
    location?: string;
    date?: string;
    completed: boolean;
  }>;
}

const IronmanProgressTracker: React.FC<IronmanProgressTrackerProps> = ({
  completedRaces,
  totalRaces = 12,
  raceData,
}) => {
  // Default race data if none provided
  const races = raceData || Array.from({ length: totalRaces }).map((_, index) => ({
    name: `Race ${index + 1}`,
    location: "",
    date: "",
    completed: index < completedRaces
  }));

  // Calculate various metrics
  const progressPercentage = (completedRaces / totalRaces) * 100;
  const remainingRaces = totalRaces - completedRaces;

  // SVG parameters for the circular progress
  const radius = 150; // Main circle radius
  const strokeWidth = 30;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  // Parameters for milestone positions
  const milestoneRadius = radius + 15;

  // Create an array of milestone positions in a circle
  const milestones = Array.from({ length: totalRaces }).map((_, index) => {
    const angle = (index / totalRaces) * 2 * Math.PI - Math.PI / 2; // Start from the top (12 o'clock)
    const x = milestoneRadius * Math.cos(angle);
    const y = milestoneRadius * Math.sin(angle);
    return { x, y, angle, completed: index < completedRaces, current: index === completedRaces };
  });

  return (
    <div className="ironman-circular-progress">
      <div className="ironman-circular-progress__container">
        <svg
          width={radius * 2 + 120}
          height={radius * 2 + 120}
          viewBox={`${-radius - 60} ${-radius - 60} ${radius * 2 + 120} ${radius * 2 + 120}`}
          className="ironman-circular-progress__svg"
        >
          {/* Path connecting all milestones in a circle */}
          <circle
            className="ironman-circular-progress__path"
            r={normalizedRadius}
            cx="0"
            cy="0"
            fill="transparent"
            strokeWidth={strokeWidth}
          />

          {/* Progress arc */}
          <circle
            className="ironman-circular-progress__progress"
            r={normalizedRadius}
            cx="0"
            cy="0"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 0 0)"
          />

          {/* Central text */}
          <text
            x="0"
            y="-20"
            textAnchor="middle"
            className="ironman-circular-progress__central-text"
          >
            {completedRaces} of {totalRaces}
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            className="ironman-circular-progress__central-text"
          >
            Races Completed
          </text>
          <text
            x="0"
            y="40"
            textAnchor="middle"
            className="ironman-circular-progress__central-subtext"
          >
            {remainingRaces} more to Kona
          </text>

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const statusClass = milestone.completed
              ? "ironman-circular-progress__milestone--completed"
              : milestone.current
              ? "ironman-circular-progress__milestone--current"
              : "ironman-circular-progress__milestone--upcoming";

            // Calculate text anchor and position adjustment based on angle
            const textAnchor = milestone.x > 0 ? "start" : milestone.x < 0 ? "end" : "middle";
            const textDx = milestone.x > 0 ? 35 : milestone.x < 0 ? -35 : 0;
            const textDy = milestone.y > 0 ? 35 : milestone.y < 0 ? -35 : milestone.x !== 0 ? 0 : milestone.y === 0 ? -35 : 0;

            return (
              <g key={index}>
                <circle
                  className={`ironman-circular-progress__milestone ${statusClass}`}
                  cx={milestone.x}
                  cy={milestone.y}
                  r="18"
                />
                <text
                  x={milestone.x}
                  y={milestone.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="ironman-circular-progress__milestone-text"
                >
                  {index + 1}
                </text>
                {races[index].name && (
                  <>
                    <text
                      x={milestone.x + textDx}
                      y={milestone.y + textDy - 8}
                      textAnchor={textAnchor}
                      className="ironman-circular-progress__milestone-label"
                    >
                      {races[index].name}
                    </text>
                    {races[index].date && (
                      <text
                        x={milestone.x + textDx}
                        y={milestone.y + textDy + 12}
                        textAnchor={textAnchor}
                        className="ironman-circular-progress__milestone-date"
                      >
                        {races[index].date}
                      </text>
                    )}
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="ironman-circular-progress__legend">
        <div className="ironman-circular-progress__legend-item">
          <div className="ironman-circular-progress__legend-dot ironman-circular-progress__legend-dot--completed"></div>
          <span>Completed</span>
        </div>
        <div className="ironman-circular-progress__legend-item">
          <div className="ironman-circular-progress__legend-dot ironman-circular-progress__legend-dot--current"></div>
          <span>Next&nbsp;Race</span>
        </div>
        <div className="ironman-circular-progress__legend-item">
          <div className="ironman-circular-progress__legend-dot ironman-circular-progress__legend-dot--upcoming"></div>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default IronmanProgressTracker;