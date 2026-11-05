'use client';

import React from 'react';

interface Project {
  title: string;
  organization: string;
  period: string;
  description: string;
  metrics: string[];
  tags: string[];
}

const projectsData: Project[] = [
  {
    title: 'Omnichannel Customer Care & Dispute Resolution',
    organization: 'Aquario Call Center Service',
    period: 'June 2022 – 2023',
    description:
      'Managed a high-volume pipeline of 40–60 daily inbound and outbound interactions across voice and digital channels. Maintained rigorous communication logs in CRM systems while proactively qualifying leads for client retention.',
    metrics: [
      '40–60 daily interactions resolved with high customer satisfaction',
      'Accurate customer records maintained across internal tracking systems',
      'Lead follow-up driving client onboarding and account retention',
    ],
    tags: ['CRM Tracking', 'Conflict Resolution', 'Lead Generation'],
  },
  {
    title: 'Front Desk Operations & Travel Booking Accuracy',
    organization: 'Hanana Global Travel Agency',
    period: 'February 2022',
    description:
      'Coordinated customer inquiries and ticket bookings in a fast-paced travel agency environment. Provided end-to-end client administrative support and documentation management with zero-tolerance for ticketing error.',
    metrics: [
      'High-accuracy booking processing and client record documentation',
      'Active promotion of agency packages to walk-in and remote clients',
      'Professional front-desk reception and schedule coordination',
    ],
    tags: ['Travel Ticketing', 'Client Onboarding', 'Front Desk Reception'],
  },
  {
    title: 'Dispatch Fulfillment & Operational Quality Assurance',
    organization: 'Queens Meal Bakery',
    period: 'March 2020 – 2021',
    description:
      'Executed daily production order packaging, labeling, and logistical dispatch in a demanding fast-turnaround environment. Collaborated with production teams to achieve daily batch targets.',
    metrics: [
      'Accurate dispatch workflows and batch fulfillment tracking',
      'Strict adherence to product quality, labeling, and packaging criteria',
      'Consistent team target achievement in fast-paced production shifts',
    ],
    tags: ['Order Fulfillment', 'Dispatch Logistics', 'Quality Control'],
  },
  {
    title: 'Institutional Administration & Governance Framework',
    organization: 'Public Administration HND',
    period: 'Class of 2024',
    description:
      'Higher National Diploma program focusing on organizational governance, public policy, administrative record systems, personnel coordination, and leadership ethics at Oyo State College of Agriculture and Technology.',
    metrics: [
      'Public administration and structured organizational management',
      'Task delegation, document filing protocols, and time management',
      'NYSC National Service completion (2026 Discharge Certificate)',
    ],
    tags: ['Public Policy', 'Administrative Systems', 'Ethics & Governance'],
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-[#C6A77B]/20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.2em] text-[#C6A77B] font-semibold mb-2 block font-mono">
          Operational Milestones
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F1EFEA] mb-4">
          Featured <span className="text-[#C6A77B] font-normal">Work &amp; Case Studies</span>
        </h2>
        <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
          Documented case studies reflecting practical achievements in omnichannel customer service, administrative management, and operations execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, i) => (
          <div
            key={i}
            className="bg-[#0D1522]/75 backdrop-blur-2xl border border-[#C6A77B]/25 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[#C6A77B]/60 transition-all duration-400 group shadow-xl hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3.5 py-1 rounded-full bg-[#C6A77B]/10 border border-[#C6A77B]/30 text-[#C6A77B] font-mono text-xs uppercase tracking-wider">
                  {project.organization}
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">{project.period}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#F1EFEA] mb-3 group-hover:text-[#C6A77B] transition-colors">
                {project.title}
              </h3>

              <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-2 mb-6 text-xs text-[#94A3B8]">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A77B] shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#06080C]/80 border border-[#C6A77B]/20 text-xs font-mono text-[#DFC8A7]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
