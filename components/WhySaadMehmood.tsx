import React from 'react';

export default function WhySaadMehmood() {
  const pillars = [
    {
      number: '01',
      title: 'PREMIUM FABRICS',
      description: 'Carefully presented fabrics for refined menswear, spun from select raw fibers and woven to exacting specifications.',
    },
    {
      number: '02',
      title: 'TIMELESS STYLE',
      description: 'Traditional character with a contemporary perspective, honouring centuries of Pakistani menswear heritage.',
    },
    {
      number: '03',
      title: 'CRAFTED FOR MEN',
      description: "Collections designed specifically around men's Pakistani fashion, ensuring proper body, drape and tailoring ease.",
    },
    {
      number: '04',
      title: 'QUALITY FIRST',
      description: 'A brand experience centered around fabric, presentation and trust, delivered in signature embossed packaging.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0C0C0C] border-t border-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2 block">
            OUR STANDARD OF EXCELLENCE
          </span>
          <h2 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-[#F5F5F5] mb-4">
            WHY SAAD MEHMOOD
          </h2>
          <div className="h-[1px] w-16 bg-[#C5A059]/60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-[#121212] border border-[#202020] flex flex-col justify-between hover:border-[#383838] transition-colors group"
            >
              <div>
                <span className="text-xs font-mono text-[#C5A059] tracking-wider block mb-4">
                  {item.number}
                </span>
                <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-[#F5F5F5] mb-3 group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8E8E8E] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] text-[#555555] uppercase tracking-wider">
                <span>VERIFIED STANDARD</span>
                <span>4.5M CUT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
