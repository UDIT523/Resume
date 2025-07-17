import React from 'react';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from './Forms/PersonalInfoForm';
import SummaryForm from './Forms/SummaryForm';
import ExperienceForm from './Forms/ExperienceForm';
import SkillsForm from './Forms/SkillsForm';
import EducationForm from './Forms/EducationForm';
import ProjectsForm from './Forms/ProjectsForm';
import CertificationsForm from './Forms/CertificationsForm';
import LanguagesForm from './Forms/LanguagesForm';
import AwardsForm from './Forms/AwardsForm';

export default function MainContent() {
  const { state } = useResume();

  const renderCurrentSection = () => {
    switch (state.currentSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'awards':
        return <AwardsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex-1 p-8 bg-white overflow-y-auto">
      {renderCurrentSection()}
    </div>
  );
}