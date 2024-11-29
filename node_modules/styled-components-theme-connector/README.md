# Styled Components Theme Connector

[![npm](https://img.shields.io/npm/v/styled-components-theme-connector.svg)](https://www.npmjs.com/package/styled-components-theme-connector)
[![Main workflow](https://github.com/psychobolt/styled-components-theme-connector/actions/workflows/main.yml/badge.svg)](https://github.com/psychobolt/styled-components-theme-connector/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/psychobolt/styled-components-theme-connector/branch/main/graph/badge.svg?flag=styled-components-theme-connector)](https://codecov.io/gh/psychobolt/styled-components-theme-connector/tree/main/src)

Connect React components with default themes by wiring styles from [styled-components](https://www.styled-components.com)' ThemeProvider.

## Install

```sh
npm install --save styled-components styled-components-theme-connector
# or
yarn add styled-components styled-components-theme-connector
```

## Example Usage

[DEMOS](https://psychobolt.github.io/styled-components-theme-connector/)

components.jsx
```jsx
import React from 'react';
import { withDefaultTheme, connectTheme } from 'styled-components-theme-connector';
import theme from 'styled-theming';

import StyledItem from './Item'; // styled component

// Wire component style using string selector

const Container = connectTheme('list.container')('div');

const List = connectTheme('list.ul')(({ className, label, children }) => (
  <Container>
    <p>{label}</p>
    <ul className={className}>{children}</ul>
  </Container>
));

export const Item = connectTheme('list.li')(StyledItem);

// With styled-theming (optional):

const boxBackgroundColor = theme('mode', { 
  light: '#fff',
  dark: '#000',
});

const textColor = theme('mode', { 
  light: '#000',
  dark: '#fff',
});

// Wrap root component with a default theme config:

const theme = {
  mode: 'light',
  list: {
    container: css`
      background-color: ${boxBackgroundColor};
      /* styles... */
    `,
    ul: css`
      list-style-type: circle;
      /* styles... */
    `,
    li: css`
      color: ${textColor};
      /* styles... */
    `
  }
};

export default withDefaultTheme(theme, 'list' /* - Optional theme name(s): 'theme' or ['themeComp1', 'themeComp2'] */)(List);
// If a theme name is present, only the specified values can be wired. Other properties can be accessed manually e.g. css`${({ theme }) => theme.mode}`
```

app.jsx
```jsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
// Optionally import ThemeContextProvider to provide a context for your themes
import { ThemeContextProvider } from 'styled-components-theme-connector';

import List, { Item } from './components'

// Override default theme with ThemeProvider:

const overrides = {
  mode: 'dark',
  myApp: {
    container: 'background-color: #ecd3ee',
    list: css`
      /* styles... */
    `,
  }
};

export default ({ context }) => (
  <div>
    {/* Use default theme */}
    <List label="Todo List">
      <Item>Clean</Item>
      <Item>Sleep</Item>
      <Item>Work</Item>
    </List>
    {/* Override default theme */}
    <ThemeProvider theme={overrides}>
      <List label="Pets">
        <Item>Dog</Item>
        <Item>Cat</Item>
        <ThemeContextProvider {...context}>
          {/* Now, any props passed to ThemeContextProvider (besides theme & children) can be accessed from theme.context in styled components. */}
          <Item>Turtle</Item>
        </ThemeContextProvider>
      </List>
    </ThemeProvider>
  </div>
);
```
