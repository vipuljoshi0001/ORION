export const DifficultyBadge = ({ difficulty }) => {
  const map = { easy: 'chip-easy', medium: 'chip-medium', hard: 'chip-hard' };
  const icons = { easy: '🟢', medium: '🟡', hard: '🔴' };
  return (
    <span className={`chip ${map[difficulty] || ''}`}>
      {icons[difficulty]} {difficulty?.toUpperCase()}
    </span>
  );
};