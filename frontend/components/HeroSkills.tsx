import { Skill } from '../types/hero';

interface HeroSkillsProps {
  skills: Skill[];
}

export function HeroSkills({ skills }: HeroSkillsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Hero Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{skill.name}</h3>
            <p className="text-sm text-gray-600">{skill.description}</p>
            <div className="mt-2">
              <span className="text-sm">Level: {skill.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 