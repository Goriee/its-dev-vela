import React from 'react';
import PropTypes from 'prop-types';
import './ModelViewer3D.css';

/**
 * ModelViewerSkeleton
 * Zero-CLS placeholder for ModelViewer3D while chunk is being fetched.
 */
const ModelViewerSkeleton = ({ className = '' }) => {
  return (
    <div 
      className={`model-viewer model-viewer--skeleton ${className}`} 
      role="status" 
      aria-busy="true"
      aria-label="Loading interactive 3D scene"
    >
      <div className="model-viewer__glow" aria-hidden="true" />
      <div className="model-viewer__loader">
        <div className="model-viewer__loader-spinner" />
        <span className="model-viewer__loader-text">Loading 3D Experience</span>
        <div className="model-viewer__loader-track">
          <div className="model-viewer__loader-bar model-viewer__loader-bar--indeterminate" />
        </div>
      </div>
    </div>
  );
};

ModelViewerSkeleton.propTypes = {
  className: PropTypes.string
};

export default ModelViewerSkeleton;
