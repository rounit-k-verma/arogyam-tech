import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TelemetryDock } from '../TelemetryDock';

describe('TelemetryDock Component', () => {
  const defaultProps = {
    onOpenIVSim: vi.fn(),
    onOpenECGSim: vi.fn(),
    onOpenContact: vi.fn(),
  };

  it('should render floating telemetry buttons', () => {
    render(<TelemetryDock {...defaultProps} />);
    expect(screen.getByText('IV Simulator')).toBeDefined();
    expect(screen.getByText('Live ECG')).toBeDefined();
  });

  it('should trigger simulator actions on click', () => {
    render(<TelemetryDock {...defaultProps} />);
    fireEvent.click(screen.getByText('IV Simulator'));
    expect(defaultProps.onOpenIVSim).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Live ECG'));
    expect(defaultProps.onOpenECGSim).toHaveBeenCalled();
  });
});
