export type Team = 'player' | 'enemy' | 'neutral'

export function isHostile(a: Team, b: Team): boolean {
  return (a === 'player' && b === 'enemy') || (a === 'enemy' && b === 'player')
}
