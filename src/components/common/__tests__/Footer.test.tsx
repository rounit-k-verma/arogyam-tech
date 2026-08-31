import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer Component', () => {
  const defaultProps = {
    onNavigate: vi.fn(),
    onOpenModal: vi.fn(),
  };

  it('should render footer branding and compliance links', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByText('IIT Patna Pre-Incubation')).toBeDefined();
    expect(screen.getByText('arogyamtechpvt@gmail.com')).toBeDefined();
  });

  it('should trigger policy modals when clicking policy buttons', () => {
    render(<Footer {...defaultProps} />);
    const grantBtn = screen.getByText('IIT Patna Grant Details');
    fireEvent.click(grantBtn);
    expect(defaultProps.onOpenModal).toHaveBeenCalledWith('grant');
  });
});
