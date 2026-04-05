export const LabelWithLeftAsterisk = ({ label, required }) => {
  if (!required) return label;
  
  return (
    <span>
      <span style={{ color: 'red', marginRight: '4px' }}>*</span>
      {label}
    </span>
  );
}