export const getFirstTwoLettersOfName = (name: string): string => {
  try {
    const splittedName = name.toUpperCase().trim().split(/[\s.]+/g).filter(Boolean);

    if (splittedName.length === 0) return "NA";

    const first = splittedName[0][0] || "";
    const second = splittedName[1]?.[0] || splittedName[0][1] || "";

    return (first + second) || "NA";
  } catch (error: unknown) {
    console.error(error);
    return "NA";
  }
};
