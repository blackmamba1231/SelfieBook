import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  rows?: number;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ label, errorMessage, rows = 4, maxLength = 500, ...props }) => {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className={`textarea ${errorMessage ? 'textarea-error' : ''}`}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {errorMessage && <span className="textarea-error-message">{errorMessage}</span>}
    </div>
  );
};

export default Textarea;
