/** Enquiry topics on /contact. `?interest=<key>` preselects one. */
export const contactInterests = {
  survey: "Free EV charging survey (home, fuel station, office, workplace or depot)",
 home: "Home charger installation (Pulse charger)",
  "pulse-plus": "Pulse+ fleet or workplace charging",
  corridor: "Host an ARC Corridor site",
  "boda-hub": "Boda Hub battery swapping",
  ai: "Precifarm Agent",
  "agent-desktop": "Precifarm Agent access",
  dealer: "Dealer or installation partnership",
  finance: "Finance or OEM partnership",
  general: "General enquiry",
} as const;

export type ContactInterestKey = keyof typeof contactInterests;

export const contactInterestList: readonly string[] = Object.values(contactInterests);

export function interestFromQuery(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return key in contactInterests ? contactInterests[key as ContactInterestKey] : undefined;
}
