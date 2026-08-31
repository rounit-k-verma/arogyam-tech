import { describe, it, expect } from 'vitest';
import { COMPANY_INFO, TEAM_MEMBERS, PRODUCTS, STRATEGIC_GOALS, IMPACT_MILESTONES } from '../content';

describe('content data registry', () => {
  it('should have valid company information', () => {
    expect(COMPANY_INFO.name).toBeDefined();
    expect(COMPANY_INFO.email).toBe('arogyamtechpvt@gmail.com');
    expect(COMPANY_INFO.incubation).toContain('IIT Patna');
    expect(COMPANY_INFO.phones.length).toBeGreaterThanOrEqual(2);
  });

  it('should contain complete team member details', () => {
    expect(TEAM_MEMBERS.length).toBeGreaterThanOrEqual(3);
    TEAM_MEMBERS.forEach((member) => {
      expect(member.name).toBeDefined();
      expect(member.role).toBeDefined();
      expect(member.bio).toBeDefined();
      expect(member.imageUrl).toBeDefined();
    });
  });

  it('should include IV drip and Cardiocare product specifications', () => {
    expect(PRODUCTS.length).toBe(2);
    const iv = PRODUCTS.find((p) => p.id === 'iv-drip');
    const ecg = PRODUCTS.find((p) => p.id === 'cardiocare');

    expect(iv).toBeDefined();
    expect(iv?.specs.length).toBeGreaterThan(0);
    expect(ecg).toBeDefined();
    expect(ecg?.specs.length).toBeGreaterThan(0);
  });

  it('should have strategic goals and clinical milestones', () => {
    expect(STRATEGIC_GOALS.length).toBeGreaterThan(0);
    expect(IMPACT_MILESTONES.length).toBeGreaterThan(0);
  });
});
