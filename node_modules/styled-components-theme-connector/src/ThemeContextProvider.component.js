// @flow
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

type Theme = {
  context?: {},
};

type Props = {
  theme?: Theme,
  children: React.Node,
};

export default (({ theme, children, ...props }: Props) => (
  <ThemeProvider
    theme={(outerTheme: Theme) => ({
      ...outerTheme,
      ...theme,
      context: {
        ...outerTheme.context,
        // $FlowFixMe[exponential-spread]
        ...theme?.context,
        ...props,
      },
    })}
  >
    {children}
  </ThemeProvider>
): React.AbstractComponent<Props>);
