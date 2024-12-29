function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((x) => Math.round(x).toString(16).padStart(2, "0"))
    .join("")}`;
}

function generateColorVariations(hex: string): string[] {
  const [r, g, b] = hexToRgb(hex);
  const variations: string[] = [];

  // シェード（暗く）
  for (let i = 0.8; i >= 0.2; i -= 0.2) {
    variations.push(rgbToHex(r * i, g * i, b * i));
  }

  // 元の色
  variations.push(hex);

  // ティント（明るく）
  for (let i = 0.2; i <= 0.8; i += 0.2) {
    variations.push(
      rgbToHex(r + (255 - r) * i, g + (255 - g) * i, b + (255 - b) * i)
    );
  }

  return variations;
}

export { hexToRgb, rgbToHex, generateColorVariations };
