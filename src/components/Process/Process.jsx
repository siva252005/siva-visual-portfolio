import React, { useState } from 'react';
import { processSteps, skillGroups, tools } from '../../data/process';

function Process() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="process" className="section process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center process-header">
          <div className="eyebrow">
            <span>THE PROCESS</span>
          </div>
          <h2 className="section-title">
            FROM RAW <span className="text-accent">TO REFINED.</span>
          </h2>
          <p className="section-subtitle">
            A deliberate workflow where every frame, color and cut has a purpose.
          </p>
        </div>

        {/* Editorial Horizontal Workflow */}
        <div className="process-workflow-wrapper" role="list" aria-label="Creative Process Stages">
          <div className="process-workflow">
            {processSteps.map((step, index) => {
              const isHovered = activeStep === index;
              return (
                <div
                  key={step.number}
                  className={`process-step ${isHovered ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  role="listitem"
                  tabIndex={0}
                  onFocus={() => setActiveStep(index)}
                  onBlur={() => setActiveStep(null)}
                >
                  {/* Step Top Bar / Node & Connecting Line */}
                  <div className="step-tracker" aria-hidden="true">
                    <div className="step-node">
                      <span className="step-node-inner"></span>
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="step-connector">
                        <div className="step-connector-line"></div>
                        <span className="step-arrow">→</span>
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="step-body">
                    <div className="step-number-row">
                      <span className="step-number">{step.number}</span>
                      <span className="step-order-badge">PHASE 0{index + 1}</span>
                    </div>

                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>

                    {/* Technical Micro Tags */}
                    <div className="step-tags" aria-label={`${step.title} keywords`}>
                      {step.tags.map((tag) => (
                        <span key={tag} className="step-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills & Tools Area */}
        <div className="skills-tools-container">
          <div className="skills-header">
            <div className="eyebrow">
              <span>DISCIPLINE & EXPERTISE</span>
            </div>
            <h3 className="skills-title">
              TOOLS OF THE <span className="text-accent">TRADE.</span>
            </h3>
          </div>

          {/* 3 Skill Groups */}
          <div className="skill-groups-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group-card">
                <div className="skill-group-header">
                  <span className="skill-group-indicator" aria-hidden="true"></span>
                  <h4 className="skill-group-title">{group.title}</h4>
                </div>
                <ul className="skill-list" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li key={skill} className="skill-item">
                      <span className="skill-item-bullet" aria-hidden="true">/</span>
                      <span className="skill-item-text">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tools Software Row */}
          <div className="tools-row-container">
            <div className="tools-row-label">
              <span className="tools-label-text">TOOLS</span>
              <span className="tools-label-line" aria-hidden="true"></span>
            </div>
            <div className="tools-list" aria-label="Software & Tools">
              {tools.map((tool) => (
                <div key={tool} className="tool-pill">
                  <span className="tool-dot" aria-hidden="true"></span>
                  <span className="tool-name">{tool.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
