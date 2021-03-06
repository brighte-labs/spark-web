function parseHex(hex: string) {
  let result = hex;

  // remove hash symbol
  if (result.startsWith('#')) {
    result = result.slice(1);
  }

  // resolve hex shortcuts
  if (result.length === 3) {
    result = result[0].repeat(2) + result[1].repeat(2) + result[2].repeat(2);
  }

  return result;
}

export function hexToTriplet(dirtyHex: string): Array<number> {
  const cleanHex = parseHex(dirtyHex);

  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  return [r, g, b];
}

export function hexToRgb(dirtyHex: string, alpha?: number): string {
  const [r, g, b] = hexToTriplet(dirtyHex);
  const value = `${r}, ${g}, ${b}`;

  if (alpha) {
    return `rgba(${value}, ${alpha})`;
  }

  return `rgb(${value})`;
}
