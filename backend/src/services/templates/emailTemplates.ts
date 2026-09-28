/**
 * Enterprise Responsive Email Templates for Puzzolana Machinery OEM
 * Uses brand colors: Industrial Gold (#E6A817), Dark Charcoal (#0B0D11), Slate (#323B4C)
 */

function wrapBaseLayout(title: string, preheader: string, contentHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0B0D11; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E5E7EB; }
    table { border-collapse: collapse; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141820; border: 1px solid #232B3B; border-radius: 8px; overflow: hidden; }
    .header { background-color: #0B0D11; border-bottom: 2px solid #E6A817; padding: 24px 32px; text-align: left; }
    .brand-title { color: #FFFFFF; font-size: 20px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
    .brand-sub { color: #E6A817; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px; }
    .tracking-badge { display: inline-block; background-color: #1A1F2C; border: 1px solid #E6A817; color: #E6A817; font-family: monospace; font-size: 14px; font-weight: 700; padding: 6px 14px; border-radius: 4px; margin: 16px 0; }
    .spec-table { width: 100%; margin: 20px 0; border: 1px solid #232B3B; border-radius: 6px; }
    .spec-table td { padding: 10px 14px; border-bottom: 1px solid #232B3B; font-size: 13px; }
    .spec-label { color: #9CA3AF; font-weight: 600; width: 40%; }
    .spec-val { color: #FFFFFF; font-weight: 700; }
    .btn { display: inline-block; background-color: #E6A817; color: #0B0D11; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 24px; border-radius: 4px; text-decoration: none; margin-top: 24px; }
    .footer { background-color: #0B0D11; border-top: 1px solid #232B3B; padding: 24px 32px; text-align: center; color: #6B7280; font-size: 11px; line-height: 1.6; }
  </style>
</head>
<body>
  <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${preheader}
  </div>
  <table width="100%" bgcolor="#0B0D11" cellpadding="0" cellspacing="0" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1 class="brand-title">PUZZOLANA</h1>
            <div class="brand-sub">HEAVY MACHINERY OEM • HYDERABAD, INDIA</div>
          </div>

          <!-- Body Content -->
          <div class="content">
            ${contentHtml}
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 8px 0; color: #9CA3AF; font-weight: bold;">
              Puzzolana Machinery Fabricators (Hyderabad) Pvt. Ltd.
            </p>
            <p style="margin: 0 0 8px 0;">
              Plot No. 39, Pashamylaram Industrial Area, Phase-III, Hyderabad - 502307, Telangana, India
            </p>
            <p style="margin: 0;">
              Direct Desk: +91 40 2344 5600 • Toll Free: 1800 425 2626 • Email: sales@puzzolana.com
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// 1. Customer Quote Acknowledgement
export function renderCustomerQuoteEmail(data: {
  referenceId: string;
  name: string;
  company: string;
  industry: string;
  application: string;
  productCategory: string;
  productModel?: string;
  capacityRequiredTPH?: number;
  feedSizeMaxMM?: number;
  portalUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `[${data.referenceId}] Quotation Request Received - Puzzolana Machinery OEM`;
  const preheader = `Your RFQ ${data.referenceId} has been received and assigned to our application engineering bureau.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">RFQ Acknowledgement & Process Sizing</h2>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Dear <strong>${data.name}</strong>,
    </p>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Thank you for contacting Puzzolana Machinery. We have successfully registered your techno-commercial quotation request on behalf of <strong>${data.company}</strong>.
    </p>

    <div style="text-align: center;">
      <div class="tracking-badge">REFERENCE ID: ${data.referenceId}</div>
    </div>

    <table class="spec-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="spec-label">Industry & Segment</td>
        <td class="spec-val">${data.industry}</td>
      </tr>
      <tr>
        <td class="spec-label">Application</td>
        <td class="spec-val">${data.application}</td>
      </tr>
      <tr>
        <td class="spec-label">Machinery Model / Series</td>
        <td class="spec-val">${data.productModel || data.productCategory}</td>
      </tr>
      ${
        data.capacityRequiredTPH
          ? `<tr><td class="spec-label">Required Capacity</td><td class="spec-val">${data.capacityRequiredTPH} TPH</td></tr>`
          : ''
      }
      ${
        data.feedSizeMaxMM
          ? `<tr><td class="spec-label">Max Feed Size</td><td class="spec-val">${data.feedSizeMaxMM} mm</td></tr>`
          : ''
      }
      <tr>
        <td class="spec-label">Current Status</td>
        <td class="spec-val" style="color: #E6A817;">UNDER TECHNICAL REVIEW</td>
      </tr>
    </table>

    <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
      Our Chief Application Engineer is currently evaluating your crushing stage flowsheet. You will receive a detailed preliminary layout and commercial proposal within <strong>24 business hours</strong>.
    </p>

    <div style="text-align: center;">
      <a href="${data.portalUrl}" class="btn" target="_blank">Track Live Progress Online &rarr;</a>
    </div>
    `
  );

  const text = `Dear ${data.name},\n\nThank you for requesting a quotation from Puzzolana Machinery.\nYour tracking Reference ID is: ${data.referenceId}\nIndustry: ${data.industry}\nApplication: ${data.application}\n\nYou can track the live status at: ${data.portalUrl}\n\nPuzzolana Engineering Bureau`;

  return { subject, html, text };
}

// 2. Internal Sales & Engineering Desk Alert
export function renderInternalQuoteAlertEmail(data: {
  referenceId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  industry: string;
  application: string;
  productCategory: string;
  productModel?: string;
  capacityRequiredTPH?: number;
  feedSizeMaxMM?: number;
  projectTimeline?: string;
  estimatedBudget?: string;
  dashboardUrl: string;
}): { subject: string; html: string; text: string } {
  const subject = `URGENT LEAD: ${data.referenceId} - ${data.company} (${data.capacityRequiredTPH || 'N/A'} TPH ${data.application})`;
  const preheader = `New incoming RFQ from ${data.name} (${data.company}) in ${data.city}, ${data.state}.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <div style="background-color: #2D1A05; border-left: 4px solid #E6A817; padding: 12px 16px; margin-bottom: 20px;">
      <span style="color: #E6A817; font-weight: 800; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">NEW HIGH-PRIORITY INBOUND LEAD</span>
      <h3 style="color: #FFFFFF; font-size: 16px; margin: 4px 0 0 0;">${data.company} — ${data.city}, ${data.state}</h3>
    </div>

    <table class="spec-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="spec-label">Tracking ID</td>
        <td class="spec-val" style="color: #E6A817;">${data.referenceId}</td>
      </tr>
      <tr>
        <td class="spec-label">Key Contact</td>
        <td class="spec-val">${data.name} (<a href="mailto:${data.email}" style="color: #60A5FA;">${data.email}</a>)</td>
      </tr>
      <tr>
        <td class="spec-label">Direct Phone</td>
        <td class="spec-val"><a href="tel:${data.phone}" style="color: #60A5FA;">${data.phone}</a></td>
      </tr>
      <tr>
        <td class="spec-label">Location</td>
        <td class="spec-val">${data.city}, ${data.state}</td>
      </tr>
      <tr>
        <td class="spec-label">Industry & Target</td>
        <td class="spec-val">${data.industry} • ${data.application}</td>
      </tr>
      <tr>
        <td class="spec-label">Plant Capacity</td>
        <td class="spec-val">${data.capacityRequiredTPH || 'Not Specified'} TPH</td>
      </tr>
      <tr>
        <td class="spec-label">Max Feed Size</td>
        <td class="spec-val">${data.feedSizeMaxMM || 'Not Specified'} mm</td>
      </tr>
      <tr>
        <td class="spec-label">Timeline / Budget</td>
        <td class="spec-val">${data.projectTimeline || 'Standard'} • ${data.estimatedBudget || 'Unspecified'}</td>
      </tr>
    </table>

    <div style="text-align: center;">
      <a href="${data.dashboardUrl}" class="btn" target="_blank">Open in Operations Command &rarr;</a>
    </div>
    `
  );

  const text = `NEW INBOUND RFQ: ${data.referenceId}\nCompany: ${data.company}\nContact: ${data.name} (${data.phone}, ${data.email})\nLocation: ${data.city}, ${data.state}\nCapacity: ${data.capacityRequiredTPH} TPH\n\nReview at: ${data.dashboardUrl}`;

  return { subject, html, text };
}

// 3. Customer Service Request Confirmation
export function renderCustomerServiceEmail(data: {
  referenceId: string;
  name: string;
  company: string;
  plantLocation: string;
  machineModel: string;
  urgency: string;
  serviceType: string;
}): { subject: string; html: string; text: string } {
  const subject = `[${data.referenceId}] Field Service Request Logged - Puzzolana Customer Care`;
  const preheader = `Your field service request for ${data.machineModel} has been logged with ${data.urgency} priority.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Puzzolana Field Service Dispatch</h2>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Dear <strong>${data.name}</strong> (${data.company}),
    </p>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Your service dispatch request has been registered in our central service desk. A certified Puzzolana service engineer from the nearest regional service hub has been notified.
    </p>

    <div style="text-align: center;">
      <div class="tracking-badge">SERVICE TICKET: ${data.referenceId}</div>
    </div>

    <table class="spec-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="spec-label">Machine Model</td>
        <td class="spec-val">${data.machineModel}</td>
      </tr>
      <tr>
        <td class="spec-label">Plant Location</td>
        <td class="spec-val">${data.plantLocation}</td>
      </tr>
      <tr>
        <td class="spec-label">Service Type</td>
        <td class="spec-val">${data.serviceType}</td>
      </tr>
      <tr>
        <td class="spec-label">Dispatch Urgency</td>
        <td class="spec-val" style="color: #F87171;">${data.urgency}</td>
      </tr>
    </table>

    <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
      For emergency plant stoppage or technical escalation, contact our 24/7 service desk directly at <strong>1800 425 2626</strong> with your service ticket number.
    </p>
    `
  );

  const text = `Dear ${data.name},\nYour Puzzolana service ticket ${data.referenceId} has been logged for ${data.machineModel} at ${data.plantLocation}.\nPuzzolana Service Desk: 1800 425 2626`;

  return { subject, html, text };
}

// 4. Customer Spare Parts RFQ Confirmation
export function renderCustomerSparePartsEmail(data: {
  referenceId: string;
  name: string;
  company: string;
  machineModel: string;
  partNumbers: string[];
}): { subject: string; html: string; text: string } {
  const subject = `[${data.referenceId}] OEM Wear Parts Order Enquiry - Puzzolana Foundry`;
  const preheader = `Your spare parts request for ${data.machineModel} is being processed by our foundry inventory desk.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">OEM Genuine Wear Parts Order Acknowledgement</h2>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Dear <strong>${data.name}</strong> (${data.company}),
    </p>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      We have received your request for genuine Puzzolana cast-manganese and alloy wear parts.
    </p>

    <div style="text-align: center;">
      <div class="tracking-badge">PARTS ORDER REF: ${data.referenceId}</div>
    </div>

    <table class="spec-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="spec-label">Machine Model</td>
        <td class="spec-val">${data.machineModel}</td>
      </tr>
      <tr>
        <td class="spec-label">Requested Parts</td>
        <td class="spec-val">${data.partNumbers.join(', ')}</td>
      </tr>
      <tr>
        <td class="spec-label">Foundry Verification</td>
        <td class="spec-val" style="color: #34D399;">Mn18Cr2 / Mn22Cr2 High Impact Certified</td>
      </tr>
    </table>
    `
  );

  const text = `Dear ${data.name},\nYour Puzzolana spare parts request ${data.referenceId} for ${data.machineModel} has been received.\nPuzzolana Foundry Desk`;

  return { subject, html, text };
}

// 5. Dealership Application Confirmation
export function renderCustomerDealerEmail(data: {
  referenceId: string;
  name: string;
  companyName: string;
  territory: string;
}): { subject: string; html: string; text: string } {
  const subject = `[${data.referenceId}] Puzzolana Dealership Application Under Evaluation`;
  const preheader = `Dealership registration ${data.referenceId} for territory ${data.territory}.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Authorized Dealer Network Application</h2>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Dear <strong>${data.name}</strong>,
    </p>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Thank you for applying to become an authorized Puzzolana dealership partner for <strong>${data.territory}</strong>.
    </p>

    <div style="text-align: center;">
      <div class="tracking-badge">APPLICATION REF: ${data.referenceId}</div>
    </div>

    <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
      Our Zonal Channel Development committee is currently reviewing your corporate profile and infrastructure capacity. A channel manager will contact you within 5 business days.
    </p>
    `
  );

  const text = `Dear ${data.name},\nYour Puzzolana dealership application ${data.referenceId} for ${data.territory} is under review.\nPuzzolana Channel Management`;

  return { subject, html, text };
}

// 6. Engineering Career Candidate Confirmation
export function renderCustomerJobEmail(data: {
  referenceId: string;
  fullName: string;
  position: string;
  department: string;
}): { subject: string; html: string; text: string } {
  const subject = `[${data.referenceId}] Application Received: ${data.position} - Puzzolana Engineering`;
  const preheader = `Your candidate application ${data.referenceId} has been submitted to Puzzolana Talent Bureau.`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Puzzolana Career Application Received</h2>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Dear <strong>${data.fullName}</strong>,
    </p>
    <p style="color: #D1D5DB; font-size: 14px; line-height: 1.6;">
      Thank you for your interest in joining Puzzolana Machinery OEM. We have received your application for the <strong>${data.position}</strong> position in the <strong>${data.department}</strong> department.
    </p>

    <div style="text-align: center;">
      <div class="tracking-badge">CANDIDATE ID: ${data.referenceId}</div>
    </div>

    <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
      Our engineering talent acquisition team will review your qualifications against our project requirements and reach out if your profile matches the current opening.
    </p>
    `
  );

  const text = `Dear ${data.fullName},\nYour application for ${data.position} (${data.referenceId}) has been received by Puzzolana HR.\nPuzzolana Talent Acquisition`;

  return { subject, html, text };
}

// 7. Gated CAD Access Notification Alert
export function renderGatedCadAlertEmail(data: {
  documentTitle: string;
  companyName: string;
  applicantName: string;
  email: string;
  phone: string;
  projectApplication: string;
}): { subject: string; html: string; text: string } {
  const subject = `GATED CAD ACCESS LOG: ${data.documentTitle} - ${data.companyName}`;
  const preheader = `Verified access to CAD GA drawing requested by ${data.applicantName} (${data.companyName}).`;

  const html = wrapBaseLayout(
    subject,
    preheader,
    `
    <div style="background-color: #1E293B; border-left: 4px solid #38BDF8; padding: 12px 16px; margin-bottom: 20px;">
      <span style="color: #38BDF8; font-weight: 800; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">GATED CAD GA SPECIFICATION DOWNLOAD</span>
      <h3 style="color: #FFFFFF; font-size: 15px; margin: 4px 0 0 0;">${data.documentTitle}</h3>
    </div>

    <table class="spec-table" cellpadding="0" cellspacing="0">
      <tr>
        <td class="spec-label">Company / Contractor</td>
        <td class="spec-val">${data.companyName}</td>
      </tr>
      <tr>
        <td class="spec-label">Applicant Name</td>
        <td class="spec-val">${data.applicantName} (<a href="mailto:${data.email}" style="color: #60A5FA;">${data.email}</a>)</td>
      </tr>
      <tr>
        <td class="spec-label">Phone</td>
        <td class="spec-val">${data.phone}</td>
      </tr>
      <tr>
        <td class="spec-label">Project Intent</td>
        <td class="spec-val">${data.projectApplication}</td>
      </tr>
    </table>
    `
  );

  const text = `GATED CAD ACCESS: ${data.documentTitle}\nUser: ${data.applicantName} (${data.companyName})\nPhone: ${data.phone}, Email: ${data.email}\nProject: ${data.projectApplication}`;

  return { subject, html, text };
}
