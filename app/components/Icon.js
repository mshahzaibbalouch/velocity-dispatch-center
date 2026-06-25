import React from 'react';

export default function Icon({ icon: IconComponent, className }) {
  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}
