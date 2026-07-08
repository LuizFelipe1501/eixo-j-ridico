type Props = {
  cols?: number;
  rows?: number;
  className?: string;
  tone?: "blue" | "ipe";
};

/**
 * Painel geométrico inspirado nos azulejos modernistas de Brasília.
 * O padrão é determinístico (mesma semente, mesmo desenho) para evitar
 * diferenças entre servidor e cliente.
 */
export default function Azulejos({
  cols = 10,
  rows = 4,
  className = "",
  tone = "blue",
}: Props) {
  const size = 40;
  const fill = tone === "blue" ? "#14337C" : "#F2B90D";
  const tiles: JSX.Element[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * size;
      const y = r * size;
      const v = (r * 7 + c * 13 + (r * c) % 5) % 6;
      const key = `${r}-${c}`;

      if (v === 0) {
        tiles.push(
          <path key={key} d={`M${x} ${y} h${size} v${size} z`} fill={fill} />
        );
      } else if (v === 1) {
        tiles.push(
          <path
            key={key}
            d={`M${x} ${y + size} v-${size} h${size} z`}
            fill={fill}
          />
        );
      } else if (v === 2) {
        tiles.push(
          <circle
            key={key}
            cx={x + size / 2}
            cy={y + size / 2}
            r={size / 2}
            fill={fill}
          />
        );
      } else if (v === 3) {
        tiles.push(
          <path
            key={key}
            d={`M${x} ${y} a${size} ${size} 0 0 1 ${size} ${size} h-${size} z`}
            fill={fill}
          />
        );
      } else if (v === 4) {
        tiles.push(
          <rect
            key={key}
            x={x}
            y={y + size / 2}
            width={size}
            height={size / 2}
            fill={fill}
          />
        );
      }
      // v === 5: azulejo vazio, respiro do painel
    }
  }

  return (
    <svg
      viewBox={`0 0 ${cols * size} ${rows * size}`}
      className={className}
      role="img"
      aria-label="Painel geométrico decorativo inspirado nos azulejos de Brasília"
    >
      {tiles}
    </svg>
  );
}
