import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  getISTSubmissionTime, 
  generateDirectMailtoUrl, 
  sendClinicalInquiryToEmail,
  InquiryPayload
} from '../inquiryService';

describe('inquiryService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return formatted IST submission time', () => {
    const timeStr = getISTSubmissionTime();
    expect(timeStr).toContain('IST');
    expect(typeof timeStr).toBe('string');
  });

  it('should generate direct mailto URL with encoded parameters', () => {
    const payload: InquiryPayload = {
      name: 'Dr. Vivek',
      email: 'doctor@hospital.org',
      organization: 'AIIMS Patna',
      inquiryType: 'Clinical Trial',
      message: 'Requesting trial hardware units for ICU testing.',
    };

    const mailtoUrl = generateDirectMailtoUrl(payload);
    expect(mailtoUrl).toContain('mailto:arogyamtechpvt@gmail.com');
    expect(mailtoUrl).toContain('subject=');
    expect(mailtoUrl).toContain('body=');
  });

  it('should store local backup in localStorage when sending inquiry', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    const payload: InquiryPayload = {
      name: 'Dr. Rounit',
      email: 'rounit@hospital.org',
      organization: 'IIT Patna Health Cell',
      message: 'Testing inquiry dispatch',
    };

    const response = await sendClinicalInquiryToEmail(payload);
    expect(response.success).toBe(true);
    expect(response.mailtoFallbackUrl).toContain('mailto:arogyamtechpvt@gmail.com');

    const storedData = JSON.parse(localStorage.getItem('arogyam_sent_inquiries') || '[]');
    expect(storedData.length).toBe(1);
    expect(storedData[0].name).toBe('Dr. Rounit');
    expect(storedData[0].email).toBe('rounit@hospital.org');

    fetchSpy.mockRestore();
  });

  it('should handle fetch failure gracefully and still return success fallback', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const payload: InquiryPayload = {
      name: 'Offline Tester',
      email: 'tester@offline.org',
      message: 'Testing fallback',
    };

    const response = await sendClinicalInquiryToEmail(payload);
    expect(response.success).toBe(true);
    expect(response.mailtoFallbackUrl).toBeDefined();

    fetchSpy.mockRestore();
  });
});
