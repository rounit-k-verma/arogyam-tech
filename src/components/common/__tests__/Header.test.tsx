import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

describe('Header Component', () => {
  const defaultProps = {
    currentScreen: 'home' as const,
    onNavigate: vi.fn(),
    onOpenContact: vi.fn(),
    onOpenIVSim: vi.fn(),
    onOpenECGSim: vi.fn(),
  };

  it('should render brand title and navigation links', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getAllByText(/AROGYAM/).length).toBeGreaterThan(0);
    expect(screen.getByText('OVERVIEW')).toBeDefined();
    expect(screen.getByText('INNOVATION')).toBeDefined();
  });

  it('should trigger onNavigate when clicking navigation links', () => {
    render(<Header {...defaultProps} />);
    const innovationBtn = screen.getByText('INNOVATION');
    fireEvent.click(innovationBtn);
    expect(defaultProps.onNavigate).toHaveBeenCalledWith('innovation');
  });

  it('should open quick access simulators', () => {
    render(<Header {...defaultProps} />);
    const ivSimBtn = screen.getByTitle('Test IV Drip Simulator');
    fireEvent.click(ivSimBtn);
    expect(defaultProps.onOpenIVSim).toHaveBeenCalled();
  });
});
