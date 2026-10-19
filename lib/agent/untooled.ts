/**
 * Detects engineering figures in an Agent reply, so the workspace can flag replies where no tool
 * ran. Only a number followed by an engineering unit, or a currency amount, counts: "Type 2",
 * "IEC 60364-5-52" or "Step 3" are names, not figures.
 */

const NUMBER = String.raw`\d[\d,]*(?:\.\d+)?`;
const UNIT = String.raw`(?:[kK][wW][hH]|[kK][wW]p|[kK][wW]|kVA|mm²|mm2|min|hours?|hrs?|h|A|V|m|%|KES|KSh)`;
const NUMBER_WITH_UNIT = new RegExp(String.raw`(?:^|[^\w.-])${NUMBER}\s?${UNIT}(?![A-Za-z0-9²])`);
const CURRENCY_FIRST = new RegExp(String.raw`(?:\bKES|\bKSh|\bUSD|\$|€|£)\s?${NUMBER}`);

export function hasEngineeringFigures(text: string): boolean {
  return NUMBER_WITH_UNIT.test(text) || CURRENCY_FIRST.test(text);
}
