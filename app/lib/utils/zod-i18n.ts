import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { FieldValues, Resolver } from 'react-hook-form';
import { z } from 'zod';

export const makeZodI18nMap = (t: ReturnType<typeof useTranslations>): z.ZodErrorMap => {
  return (issue) => {
    switch (issue.code) {
      case 'too_small': {
        const typedIssue = issue as z.core.$ZodIssueTooSmall;
        if (typedIssue.minimum === 1) {
          return {
            message: t(`validation.${typedIssue.code}_required`)
          };
        }

        if (typedIssue.exact) {
          return {
            message: t(`validation.${typedIssue.code}_exact`, { minimum: typedIssue.minimum as number })
          };
        }

        return {
          message: t(`validation.${typedIssue.code}`, { minimum: typedIssue.minimum as number })
        };
      }

      case 'invalid_format': {
        const typedIssue = issue as z.core.$ZodIssueInvalidStringFormat;
        return {
          message: t(`validation.${typedIssue.code}`)
        };
      }

      case 'custom': {
        const typedIssue = issue as z.core.$ZodIssueCustom;
        const key = (typedIssue.params as { i18n?: string } | undefined)?.i18n;
        return {
          message: t(`validation.${key ?? typedIssue.code}`)
        };
      }
      // add more scenarios on demand
      default:
        console.warn('unhandled zod error issue:', issue);
        return {
          message: t(`validation.${issue.code}`)
        }
    }
  };
};

export const withI18n = <T extends z.ZodType<FieldValues, FieldValues>>(
  t: ReturnType<typeof useTranslations>,
  schema: T,
) => {
  const errorMap = makeZodI18nMap(t);
  return zodResolver(schema, { error: errorMap }) as unknown as Resolver<z.infer<T>>;
};

export const useZodI18n = <T extends z.ZodType<FieldValues, FieldValues>>(
  namespace: string,
  schema: T,
): Resolver<z.infer<T>> => {
  const t = useTranslations(namespace);

  const resolver = useMemo(() => {
    const errorMap = makeZodI18nMap(t);
    return zodResolver(schema, { error: errorMap }) as unknown as Resolver<z.infer<T>>;
  }, [schema, t]);

  return resolver;
}
