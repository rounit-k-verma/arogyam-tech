import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomeScreen } from '../HomeScreen';

describe('HomeScreen Component', () => {
  const defaultProps = {
    onNavigate: vi.fn(),
    onOpenIVSim: vi.fn(),
    onOpenECGSim: vi.fn(),
    onOpenContact: vi.fn(),
  };

  it('should render headline and call to action buttons', () => {
    render(<HomeScreen {...defaultProps} />);
    expect(screen.getByText(/Empowering Precision Medicine/i)).toBeDefined();
    expect(screen.getByText('Explore Products')).toBeDefined();
  });

  it('should trigger navigation on explore products button click', () => {
    render(<HomeScreen {...defaultProps} />);
    fireEvent.click(screen.getByText('Explore Products'));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith('innovation');
  });

  it('should open simulators on click', () => {
    render(<HomeScreen {...defaultProps} />);
    fireEvent.click(screen.getByText('Automated IV Drip Simulator'));
    expect(defaultProps.onOpenIVSim).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cardiocare Live ECG Stream'));
    expect(defaultProps.onOpenECGSim).toHaveBeenCalled();
  });
});
