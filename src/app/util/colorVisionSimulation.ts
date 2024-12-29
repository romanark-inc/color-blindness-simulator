type ColorVisionType =
  | "normal"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia"
  | "achromatopsia";

function simulateColorVision(hex: string, type: ColorVisionType): string {
  // 16進数の色コードをRGB値に変換
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  let simR: number, simG: number, simB: number;

  switch (type) {
    case "protanopia":
      simR = 0.567 * r + 0.433 * g;
      simG = 0.558 * r + 0.442 * g;
      simB = 0.242 * r + 0.758 * b;
      break;
    case "deuteranopia":
      simR = 0.625 * r + 0.375 * g;
      simG = 0.7 * r + 0.3 * g;
      simB = 0.3 * r + 0.7 * b;
      break;
    case "tritanopia":
      simR = 0.95 * r + 0.05 * g;
      simG = 0.433 * r + 0.567 * g;
      simB = 0.475 * r + 0.525 * g;
      break;
    case "achromatopsia":
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      simR = simG = simB = gray;
      break;
    default:
      return hex; // 通常の視覚の場合は元の色を返す
  }

  // RGB値を16進数に戻す
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(simR)}${toHex(simG)}${toHex(simB)}`;
}

export { simulateColorVision, type ColorVisionType };
