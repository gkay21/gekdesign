import React from 'react';
import type { Project } from '../data/projects';

interface ProjectHighlightProps {
  project: Project;
  labelClassName: string;
}

/** A listing card's headline: the project's `cardHighlight`, or else its first metric's value and label. */
export const ProjectHighlight: React.FC<ProjectHighlightProps> = ({ project, labelClassName }) => {
  if (project.cardHighlight) return <>{project.cardHighlight}</>;

  const [metric] = project.metrics;
  return (
    <>
      {metric.value} <span className={labelClassName}>{metric.label}</span>
    </>
  );
};
