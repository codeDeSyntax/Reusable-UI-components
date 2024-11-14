mowquery tags

import React from 'react';

const Tag = ({ name, count, isWatched, isModerated, isRequired }) => {
  // Base classes for the tag container
  const baseClasses = "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium hover:bg-opacity-80 transition-colors whitespace-nowrap";
  
  // Different styles based on tag type
  const styleClasses = isRequired 
    ? "bg-red-50 text-red-700 hover:bg-red-100" 
    : isModerated 
      ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
      : isWatched
        ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
        : "bg-sky-50 text-sky-600 hover:bg-sky-100";

  return (
    <a href={`/tags/${name}`} className={`${baseClasses} ${styleClasses} group relative`}>
      <span>{name}</span>
      {count && (
        <span className="text-sky-500 text-[11px] ml-0.5">
          × {count.toLocaleString()}
        </span>
      )}
      
      {/* Tooltip */}
      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {count ? `${count.toLocaleString()} questions tagged` : 'Show questions tagged'}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </a>
  );
};

const TagList = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag.name}
          name={tag.name}
          count={tag.count}
          isWatched={tag.isWatched}
          isModerated={tag.isModerated}
          isRequired={tag.isRequired}
        />
      ))}
    </div>
  );
};

// Example usage component
const ExampleTags = () => {
  const sampleTags = [
    { name: 'javascript', count: 2401567 },
    { name: 'python', count: 1865432 },
    { name: 'react', count: 987654, isWatched: true },
    { name: 'node.js', count: 456789 },
    { name: 'typescript', count: 345678, isModerated: true },
    { name: 'required-tag', count: 123456, isRequired: true },
  ];

  return (
    <div className="p-4 max-w-4xl">
      <TagList tags={sampleTags} />
    </div>
  );
};

export default ExampleTags;
