import React from "react";

const plans = [
  {
    title: "Internet For Personal",
    badge: "5-10 MBPS",
    price: "$25",
    features: [
      "Single Device Uses",
      "Phone & Computer",
      "Random IP",
    ],
    featured: false,
  },
  {
    title: "Internet For Family",
    badge: "10-15 MBPS",
    price: "$55",
    features: [
      "20 Devices Allowed",
      "Phone, Computer & TV",
      "Random IP",
    ],
    featured: true,
  },
  {
    title: "Internet For Corporate",
    badge: "Unlimited",
    price: "$95",
    features: [
      "Unlimited Devices Allowed",
      "Any Devices",
      "Fixed IP",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-slate-50 py-24 border-t border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
            OUR PRICING
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Discover Our Best Value Plans
          </h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-2xl bg-white p-8 shadow-sm flex flex-col justify-between ${
                plan.featured
                  ? "border-2 border-red-600 shadow-md relative lg:-top-2"
                  : "border border-slate-200"
              }`}
            >
              <div>
                {/* Title + Badge */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    {plan.title}
                  </h3>
                  <span className="rounded bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    START FROM
                  </p>
                  <p className="mt-1 flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-black ${
                        plan.featured ? "text-red-600" : "text-slate-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      /MONTH
                    </span>
                  </p>
                </div>

                {/* Feature List */}
                <ul className="mt-8 space-y-4 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      🗹 {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href="#"
                className={`mt-8 block w-full rounded-md py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition-all ${
                  plan.featured
                    ? "bg-red-600 hover:bg-slate-900"
                    : "bg-slate-900 hover:bg-red-600"
                }`}
              >
                BUY PLANS
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}