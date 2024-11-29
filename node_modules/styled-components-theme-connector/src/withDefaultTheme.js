// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { omit, pick, isArray } from 'lodash';

type Props = {
  children: any
};

type Theme = {
  _defaultTheme: {},
  _customTheme: {},
};

export default ((theme, rootName) => {
  const keys = isArray(rootName) ? rootName : (rootName && [rootName]) || undefined;
  const defaultTheme = keys ? pick(theme, keys) : theme;
  const rest = keys ? omit(theme, keys) : undefined;
  const getTheme: ({} | void) => Theme = (custom = {}) => {
    const customTheme = keys ? pick(custom, keys) : custom;
    const customRest = keys ? omit(custom, keys) : undefined;
    return {
      ...rest,
      _defaultTheme: defaultTheme,
      _customTheme: customTheme,
      ...customRest,
    };
  };
  return Component => ({ children, ...props }: Props) => (
    <ThemeProvider theme={getTheme}>
      <Component {...props}>
        {children}
      </Component>
    </ThemeProvider>
  );
}: (theme: {}, themeName: string | string[]) =>
<T>(Component: React.ComponentType<any>) => React.ComponentType<T & Props>);
