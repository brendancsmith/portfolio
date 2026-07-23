/** Display date ranges with a hyphen separator ("09/2024 - 10/2025"); data uses an en dash. */
export const formatDates = (dates: string) => dates.replace(/–/g, "-");
