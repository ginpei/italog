// Reusable class name sets for controls
//
// Note Tailwind CSS just uses regular expressions to extract every string that
// could possibly be a class name
// @see https://tailwindcss.com/docs/content-configuration#class-detection-in-depth

export const controlShapeClassNames = `
  min-h-10 rounded-none border px-2
  disabled:cursor-default
  [:disabled_&]:cursor-default
`;

export const controlBorderThemeClassNames = `
  border-gray-400
  dark:border-gray-700
`;

export const buttonThemeClassNames = `
  ${controlBorderThemeClassNames}

  bg-gray-50 text-black
  hover:border-gray-500
  active:bg-gray-200
  disabled:bg-gray-300 disabled:text-gray-500
  [:disabled_&]:bg-gray-300 [:disabled_&]:text-gray-500

  dark:bg-gray-900 dark:text-white
  active:dark:bg-gray-800
  disabled:dark:bg-gray-800 disabled:dark:text-gray-500
  [:disabled_&]:dark:bg-gray-800 [:disabled_&]:dark:text-gray-500
`;

export const inputThemeClassNames = `
  ${controlBorderThemeClassNames}

  bg-white text-black
  hover:border-gray-500
  disabled:bg-gray-300 disabled:text-gray-500

  dark:bg-black dark:text-white
  disabled:dark:bg-gray-800 disabled:dark:text-gray-500
  [:disabled_&]:dark:bg-gray-800 [:disabled_&]:dark:text-gray-500
`;

export const hoverBlockThemeClassNames = `
  hover:bg-gray-50 active:bg-gray-100
  hover:dark:bg-gray-800 active:dark:bg-gray-900
`;
