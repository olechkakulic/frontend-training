export const LabelWithLeftAsterisk = ({ label, required }: { label: string; required?: boolean }) => {
  if (!required) return label;
  
  return (
    <span>
      <span style={{ color: 'red', marginRight: '4px' }}>*</span>
      {label}
    </span>
  );
};