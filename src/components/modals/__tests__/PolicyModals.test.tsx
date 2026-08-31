import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PolicyModal } from '../PolicyModals';

describe('PolicyModal Component', () => {
  it('should render grant details when modal type is grant', () => {
    render(<PolicyModal type="grant" onClose={vi.fn()} />);
    expect(screen.getByText('IIT Patna Incubation & Innovation Grant')).toBeDefined();
  });

  it('should render safety specs when modal type is safety', () => {
    render(<PolicyModal type="safety" onClose={vi.fn()} />);
    expect(screen.getByText('Medical Safety & Quality Engineering')).toBeDefined();
  });
});
