import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TeamScreen } from '../TeamScreen';

describe('TeamScreen Component', () => {
  const defaultProps = {
    onOpenContact: vi.fn(),
  };

  it('should render company heritage and team members', () => {
    render(<TeamScreen {...defaultProps} />);
    expect(screen.getByText(/IIT Patna Pre-Incubated/i)).toBeDefined();
    expect(screen.getByText('Rounit Kumar Verma')).toBeDefined();
    expect(screen.getByText('Vivek Kumar')).toBeDefined();
    expect(screen.getByText('Shubhichha Srivastava')).toBeDefined();
  });
});
