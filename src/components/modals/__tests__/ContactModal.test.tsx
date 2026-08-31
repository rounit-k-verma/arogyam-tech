import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactModal } from '../ContactModal';

describe('ContactModal Component', () => {
  it('should render contact modal header and input fields', () => {
    render(<ContactModal onClose={vi.fn()} />);
    expect(screen.getByText('Connect with AROGYAM TECH')).toBeDefined();
    expect(screen.getByPlaceholderText('Dr. Vivek / Admin')).toBeDefined();
  });
});
