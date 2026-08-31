import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ImpactScreen } from '../ImpactScreen';

describe('ImpactScreen Component', () => {
  const defaultProps = {
    onOpenContact: vi.fn(),
    onOpenIVSim: vi.fn(),
    onOpenECGSim: vi.fn(),
  };

  it('should render clinical impact metrics and milestones', () => {
    render(<ImpactScreen {...defaultProps} />);
    expect(screen.getByText('100+')).toBeDefined();
    expect(screen.getByText('10+')).toBeDefined();
    expect(screen.getByText('3 PHCs')).toBeDefined();
  });
});
