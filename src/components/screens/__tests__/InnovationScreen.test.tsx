import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InnovationScreen } from '../InnovationScreen';

describe('InnovationScreen Component', () => {
  const defaultProps = {
    onOpenIVSim: vi.fn(),
    onOpenECGSim: vi.fn(),
    onOpenContact: vi.fn(),
  };

  it('should render products and strategic roadmap', () => {
    render(<InnovationScreen {...defaultProps} />);
    expect(screen.getAllByText(/Automated IV Drip/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cardiocare/i).length).toBeGreaterThan(0);
  });

  it('should filter product tabs', () => {
    render(<InnovationScreen {...defaultProps} />);
    const ivTabBtn = screen.getByRole('button', { name: /Smart IV Drip/i });
    fireEvent.click(ivTabBtn);
    expect(screen.getByText(/Automated IV Drip/i)).toBeDefined();
  });
});
