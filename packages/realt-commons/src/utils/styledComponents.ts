// @ts-nocheck
import styled from 'styled-components';

export * from 'styled-components';

const defaultStyled: typeof styled = typeof styled === 'function' ? styled : styled.default;

export { defaultStyled as default };