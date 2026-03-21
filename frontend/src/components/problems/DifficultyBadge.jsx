export const DifficultyBadge = ({ difficulty }) => {
  const map = {
    easy: 'chip-easy',
    medium: 'chip-medium',
    hard: 'chip-hard',
  };
  return (
    <span className={`chip ${map[difficulty] || ''}`}>
      {difficulty?.toUpperCase()}
    </span>
  );
};