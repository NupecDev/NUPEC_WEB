type NutrientBadgeProps = {
  label: string;
  displayValue: string;
};

export default function NutrientBadge({ label, displayValue }: NutrientBadgeProps) {
  return (
    <div className="nutrient-badge">
      <div className="nutrient-badge__circle">
        <span className="nutrient-badge__value">{displayValue}</span>
      </div>
      <p className="nutrient-badge__label">{label}</p>
    </div>
  );
}
