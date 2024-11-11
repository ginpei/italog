// Reusable class name sets for controls
//
// Note Tailwind CSS just uses regular expressions to extract every string that
// could possibly be a class name
// @see https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

export const controlShapeClassNames = `
  min-h-10 rounded-none border px-2
`;

export const buttonThemeClassNames = `
  border-gray-400 bg-gray-50 text-black
  hover:border-gray-500
  active:bg-gray-200
  disabled:bg-gray-300 disabled:text-gray-500
`;

export const inputThemeClassNames = `
  border-gray-400 bg-white text-black
  hover:border-gray-500
  disabled:bg-gray-300 disabled:text-gray-500
`;
