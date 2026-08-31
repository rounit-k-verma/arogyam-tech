import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArogyamLogo } from '../ArogyamLogo';

describe('ArogyamLogo Component', () => {
  it('should render full stacked logo by default', () => {
    const { container } = render(<ArogyamLogo />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(screen.getByText('AROGYAM')).toBeDefined();
    expect(screen.getByText('TECHNOLOGIES')).toBeDefined();
  });

  it('should render icon variant', () => {
    const { container } = render(<ArogyamLogo variant="icon" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('aria-label')).toBe('AROGYAM TECH Emblem');
  });
});
