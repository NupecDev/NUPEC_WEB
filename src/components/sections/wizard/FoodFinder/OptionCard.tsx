'use client';

type Props = {
  label: string;
  sub?: string;
  blurb?: string;
  icon?: React.ReactNode;
  accent?: string;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionCard({
  label,
  sub,
  blurb,
  icon,
  accent = '#0085CA',
  selected,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="food-finder__option"
      style={{
        all: 'unset',
        background: selected ? `${accent}14` : '#f5f9ff',
        borderRadius: 8,
        padding: '32px 28px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        border: selected ? `2.5px solid ${accent}` : '2.5px solid transparent',
        boxShadow: selected ? `0 10px 26px ${accent}22` : 'none',
        position: 'relative',
        minHeight: 50,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          ✓
        </div>
      )}

      {icon && (
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 14px ${accent}1f`,
          }}
        >
          {icon}
        </div>
      )}

      <div>
        <div
          style={{
            fontWeight: 900,
            fontSize: 20,
            color: accent,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </div>
        {sub && (
          <div style={{ fontWeight: 600, fontSize: 12, color: '#8a909a', marginTop: 6 }}>{sub}</div>
        )}
      </div>

      {blurb && (
        <p style={{ fontWeight: 400, fontSize: 13, lineHeight: 1.5, color: '#8a909a', margin: 0 }}>
          {blurb}
        </p>
      )}
    </button>
  );
}
