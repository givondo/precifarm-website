import SectionHeader from "@/components/ui/SectionHeader";
import { aboutPage } from "@/lib/about-page";

export const routeRoles = aboutPage.roles;

export default function RouteRolesTable() {
  const { rolesSection, roles } = aboutPage;

  return (
    <div>
      <SectionHeader
        eyebrow={rolesSection.eyebrow}
        title={rolesSection.title}
        description={rolesSection.description}
        className="mb-8"
      />
      <div className="grid gap-4">
        {roles.map((row) => (
          <article key={row.layer} className="card overflow-hidden">
            <h3 className="border-b border-border bg-muted/40 px-5 py-3 text-sm font-semibold text-forest-900 sm:px-6">
              {row.layer}
            </h3>
            <div className="grid sm:grid-cols-2">
              <div className="px-5 py-4 sm:px-6 sm:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Precifarm
                </p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/85">{row.precifarm}</p>
              </div>
              <div className="border-t border-border px-5 py-4 sm:border-l sm:border-t-0 sm:px-6 sm:py-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-forest-500">
                  Partners
                </p>
                <p className="mt-2 text-sm leading-relaxed text-forest-600/85">{row.partners}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
