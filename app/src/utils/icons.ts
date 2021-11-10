/* eslint-disable @typescript-eslint/no-var-requires */

export const getIconSourceSvg = (name: string) => getIconSource(`${name}.svg`);

export const getIconSourcePng = (name: string) => getIconSource(`${name}.png`);

export const getIconSource = (fileName: string) =>
  require(`../icons/${fileName}`).default;
