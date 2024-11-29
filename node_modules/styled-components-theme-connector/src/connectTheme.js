// @flow
import * as React from 'react';
import styled, { type ThemeProps } from 'styled-components';
import { get } from 'lodash';

export default ((selector = '') => component => styled(component)`
  ${({ theme }: ThemeProps<{}>) => get(theme, `_defaultTheme.${selector}`, '')}
  ${({ theme }: ThemeProps<{}>) => get(theme, `_customTheme.${selector}`, '')}
`: (selector: string) => <T>(component: React.ElementRef<any>) => React.ComponentType<T>);
