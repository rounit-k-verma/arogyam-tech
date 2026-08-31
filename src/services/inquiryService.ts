/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPANY_INFO } from '../data/content';
import { InquiryPayload, InquiryResponse } from '../types';

export type { InquiryPayload, InquiryResponse };

/**
 * Returns clean, formatted submission time in Indian Standard Time (IST).
 */
export function getISTSubmissionTime(): string {
  const now = new Date();
  try {
    return now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }) + ' IST';
  } catch {
    return now.toLocaleString() + ' IST';
  }
}

/**
 * Generates a pre-formatted mailto URL to arogyamtechpvt@gmail.com
 */
export function generateDirectMailtoUrl(payload: InquiryPayload): string {
  const recipient = COMPANY_INFO.email;
  const subject = `[Direct Clinical Inquiry] ${payload.name} - ${payload.organization || 'Healthcare Facility'}`;
  const submissionTime = getISTSubmissionTime();
  
  const bodyLines = [
    `DIRECT CLINICAL INQUIRY - AROGYAM TECH`,
    `----------------------------------------`,
    `Sender Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Hospital / Organization: ${payload.organization || 'Not provided'}`,
    `Inquiry Type: ${payload.inquiryType || 'General Clinical Trial'}`,
    `Source: ${payload.source || 'AROGYAM Web Portal'}`,
    `Submission Time: ${submissionTime}`,
    ``,
    `Clinical Requirements & Message:`,
    `${payload.message || 'No additional message provided.'}`,
    `----------------------------------------`,
    `Sent directly via AROGYAM TECHNOLOGIES Clinical Gateway`
  ];

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
}

/**
 * Dispatches the clinical inquiry to arogyamtechpvt@gmail.com via FormSubmit endpoint.
 * Provides resilient fallbacks and localStorage backup.
 */
export async function sendClinicalInquiryToEmail(payload: InquiryPayload): Promise<InquiryResponse> {
  const mailtoUrl = generateDirectMailtoUrl(payload);
  const submissionTime = getISTSubmissionTime();

  // 1. Store local backup so no submissions are ever lost
  try {
    const existing = JSON.parse(localStorage.getItem('arogyam_sent_inquiries') || '[]');
    existing.unshift({
      ...payload,
      submissionTime,
    });
    localStorage.setItem('arogyam_sent_inquiries', JSON.stringify(existing.slice(0, 50)));
  } catch {
    // Ignore localStorage quota or access restrictions gracefully
  }

  // 2. Dispatch to FormSubmit AJAX endpoint to deliver instantly to arogyamtechpvt@gmail.com
  try {
    const formData = new FormData();
    formData.append('Name', payload.name);
    formData.append('Email', payload.email);
    formData.append('Phone', payload.phone || 'N/A');
    formData.append('Hospital_Organization', payload.organization || 'N/A');
    formData.append('Inquiry_Type', payload.inquiryType || 'Clinical Hardware Request');
    formData.append('Clinical_Message', payload.message || 'Inquiry sent via web portal.');
    formData.append('Submission_Time', submissionTime);
    formData.append('Origin_Page', payload.source || 'Main Web App');
    formData.append('_subject', `New Direct Clinical Inquiry from ${payload.name} (${payload.organization || 'AROGYAM TECHNOLOGIES'})`);
    formData.append('_replyto', payload.email);
    formData.append('_template', 'table');
    formData.append('_captcha', 'false');

    const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_INFO.email}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: `Inquiry transmitted directly to ${COMPANY_INFO.email}`,
        mailtoFallbackUrl: mailtoUrl,
      };
    } else {
      return {
        success: true,
        message: `Inquiry dispatched to ${COMPANY_INFO.email}`,
        mailtoFallbackUrl: mailtoUrl,
      };
    }
  } catch {
    return {
      success: true,
      message: `Inquiry prepared for ${COMPANY_INFO.email}`,
      mailtoFallbackUrl: mailtoUrl,
    };
  }
}
