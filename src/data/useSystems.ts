import { useMemo } from 'react';
import { SystemCase } from '../types';
import { systemsList } from './systemsData';
import { systemsText } from './systemsI18n';
import { useLang } from '../i18n/LanguageContext';

export const useSystems = (): SystemCase[] => {
  const { lang } = useLang();

  return useMemo(
    () =>
      systemsList.map((s) => {
        const o = systemsText[s.id][lang];
        return {
          ...s,
          subtitle: o.subtitle,
          description: o.description,
          architectureType: o.architectureType,
          slaStatus: o.slaStatus,
          pattern: o.pattern,
          kicker: o.kicker,
          problemHeading: o.problemHeading,
          decisionsHeading: o.decisionsHeading,
          partitionLabel: o.partitionLabel,
          topologyLabel: o.topologyLabel,
          technologies: s.technologies.map((t, i) => ({ ...t, detail: o.techDetails[i] ?? t.detail })),
          phases: s.phases.map((p, i) => ({ ...p, ...o.phases[i] })),
          deepDive: o.deepDive,
          specs: { ...s.specs, ...o.specs },
          quote: {
            text: o.quoteText,
            author: 'Leonardo Hernández',
            role: lang === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
            location: lang === 'es' ? 'Aguascalientes, México' : 'Aguascalientes, Mexico',
          },
        };
      }),
    [lang]
  );
};
