// Utility functions for translations

export const addTranslations = (newTranslations: {
  en: Record<string, string>;
  bg: Record<string, string>;
}) => {
  // This would be used to dynamically add translations
  // In a real app, you might load these from an API or files
  return newTranslations;
};

export const formatTranslation = (
  template: string,
  values: Record<string, string | number>
): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
};

// Example usage:
// formatTranslation("Hello {{name}}, you have {{count}} messages", { name: "John", count: 5 })
// Returns: "Hello John, you have 5 messages"
