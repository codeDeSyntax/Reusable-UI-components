import React from 'react';
import { Hash } from 'lucide-react';

// Define the scripture subject interface
type ScriptureSubject = {
  id: string;
  name: string;
  category: 'doctrine' | 'prophecy' | 'history' | 'wisdom' | 'gospel' | 'epistle';
};

// Array of scripture subjects
const scriptureSubjects: ScriptureSubject[] = [
  { id: '1', name: 'Salvation', category: 'doctrine' },
  { id: '2', name: 'Grace', category: 'doctrine' },
  { id: '3', name: 'Faith', category: 'doctrine' },
  { id: '4', name: 'Prophecy', category: 'prophecy' },
  { id: '5', name: 'End Times', category: 'prophecy' },
  { id: '6', name: 'Creation', category: 'history' },
  { id: '7', name: 'Exodus', category: 'history' },
  { id: '8', name: 'Wisdom', category: 'wisdom' },
  { id: '9', name: 'Psalms', category: 'wisdom' },
  { id: '10', name: 'Gospel', category: 'gospel' },
  { id: '11', name: 'Ministry of Jesus', category: 'gospel' },
  { id: '12', name: 'Church', category: 'epistle' },
  { id: '13', name: 'Christian Living', category: 'epistle' },
  { id: '14', name: 'Holy Spirit', category: 'doctrine' },
  { id: '15', name: 'Prayer', category: 'wisdom' },
];

type TagVariant = 'doctrine' | 'prophecy' | 'history' | 'wisdom' | 'gospel' | 'epistle';
type TagSize = 'sm' | 'md' | 'lg';

type TagProps = {
  subject: ScriptureSubject;
  size?: TagSize;
  onSelect?: (subject: ScriptureSubject) => void;
  selected?: boolean;
  icon?: boolean;
};

const TagComponent = ({
  subject,
  size = 'md',
  onSelect,
  selected = false,
  icon = true,
}: TagProps) => {
  const baseStyles = "inline-flex items-center rounded-md font-medium transition-colors";
  const cursorStyles = onSelect ? "cursor-pointer hover:opacity-90" : "cursor-default";
  
  const getVariantStyles = (category: TagVariant) => {
    const variants = {
      doctrine: "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
      prophecy: "bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
      history: "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
      wisdom: "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
      gospel: "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
      epistle: "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800"
    };
    return variants[category];
  };

  const getSizeStyles = (size: TagSize) => {
    const sizes = {
      sm: "text-xs px-2 py-1 gap-1",
      md: "text-sm px-3 py-1.5 gap-1.5",
      lg: "text-base px-4 py-2 gap-2"
    };
    return sizes[size];
  };

  const getIconSize = (size: TagSize) => {
    const sizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5"
    };
    return sizes[size];
  };

  const selectedStyles = selected ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900" : "";

  const classes = `${baseStyles} ${getVariantStyles(subject.category)} ${getSizeStyles(size)} ${cursorStyles} ${selectedStyles}`;

  return (
    <span 
      onClick={() => onSelect?.(subject)}
      className={classes}
    >
      {icon && <Hash className={getIconSize(size)} />}
      {subject.name}
    </span>
  );
};

const ScriptureTagsShowcase = () => {
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>([]);

  const handleSelect = (subject: ScriptureSubject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject.id) 
        ? prev.filter(id => id !== subject.id)
        : [...prev, subject.id]
    );
  };

  const groupedSubjects = scriptureSubjects.reduce((acc, subject) => {
    if (!acc[subject.category]) {
      acc[subject.category] = [];
    }
    acc[subject.category].push(subject);
    return acc;
  }, {} as Record<TagVariant, ScriptureSubject[]>);

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Scripture Subjects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(groupedSubjects).map(([category, subjects]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <TagComponent
                  key={subject.id}
                  subject={subject}
                  onSelect={handleSelect}
                  selected={selectedSubjects.includes(subject.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSubjects.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Selected Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map(id => {
              const subject = scriptureSubjects.find(s => s.id === id)!;
              return (
                <TagComponent
                  key={subject.id}
                  subject={subject}
                  size="sm"
                  onSelect={handleSelect}
                  selected={true}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptureTagsShowcase;
