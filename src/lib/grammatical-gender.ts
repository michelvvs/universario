export type Gender = 'masculino' | 'feminino' | 'neutro';

/**
 * Returns a phrase referencing when the person was born, applying the correct Portuguese article.
 * 
 * Examples:
 * - (Michel, 'masculino') -> "quando o Michel nasceu"
 * - (Juliana, 'feminino') -> "quando a Juliana nasceu"
 * - (Alex, 'neutro') -> "quando Alex nasceu"
 * - (undefined, any) -> "quando você nasceu"
 */
export function getWhenBornPhrase(
  name?: string,
  gender?: Gender,
  verb: 'nasceu' | 'chegou ao mundo' = 'nasceu'
): string {
  const trimmed = name?.trim();
  if (!trimmed) {
    return `quando você ${verb}`;
  }

  if (gender === 'feminino') {
    return `quando a ${trimmed} ${verb}`;
  }

  if (gender === 'masculino') {
    return `quando o ${trimmed} ${verb}`;
  }

  return `quando ${trimmed} ${verb}`;
}

/**
 * Returns the name with its respective article or fallback.
 * 
 * Examples:
 * - (Michel, 'masculino') -> "o Michel"
 * - (Juliana, 'feminino') -> "a Juliana"
 * - (Alex, 'neutro') -> "Alex"
 * - (undefined, any) -> "Você"
 */
export function getPersonWithArticle(name?: string, gender?: Gender): string {
  const trimmed = name?.trim();
  if (!trimmed) return 'Você';

  if (gender === 'feminino') return `a ${trimmed}`;
  if (gender === 'masculino') return `o ${trimmed}`;
  return trimmed;
}

/**
 * Returns the contracted preposition "de + artigo" (do / da / de).
 * 
 * Examples:
 * - (Michel, 'masculino') -> "do Michel"
 * - (Juliana, 'feminino') -> "da Juliana"
 * - (Alex, 'neutro') -> "de Alex"
 * - (undefined, any) -> "de Você"
 */
export function getOfPersonPhrase(name?: string, gender?: Gender): string {
  const trimmed = name?.trim();
  if (!trimmed) return 'da sua história';

  if (gender === 'feminino') return `da ${trimmed}`;
  if (gender === 'masculino') return `do ${trimmed}`;
  return `de ${trimmed}`;
}
