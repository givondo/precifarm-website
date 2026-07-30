import BookNowLink from "@/components/BookNowLink";

const steps = [
  {
    step: "1",
    title: "Pick journey",
    text: "Choose your date, departure time and number of passengers.",
  },
  {
    step: "2",
    title: "Select seats",
    text: "Reserve your seat on the Yutong U18 before you travel.",
  },
  {
    step: "3",
    title: "Pay with M-Pesa",
    text: "Enter your PIN on your phone. Your PF reference arrives by SMS.",
  },
];

export default function HomeBookingSteps() {
  return (
    <section className="section-muted border-b border-border section-pad">
      <div className="page-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sm font-semibold uppercase tracking-widest text-forest-500">
            How booking works
          </p>
          <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
            Three steps to your ticket
          </h2>
          <p className="mt-3 text-sm text-forest-600">
            No queues. No diesel-price surprises. National ID required at boarding.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {steps.map((item) => (
            <li key={item.title} className="home-step-card feature-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charge-600 font-mono text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold text-forest-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-600">{item.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <BookNowLink className="btn-primary inline-flex rounded-full px-8 py-3 text-sm">
            Start booking →
          </BookNowLink>
        </div>
      </div>
    </section>
  );
}
