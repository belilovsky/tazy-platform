export const metadata = { title: 'TAZY.PRO — Национальный реестр породы тазы', description: 'Реестр, родословные, здоровье и происхождение тазы. Общественное объединение Найза.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ru"><body>{children}</body></html>);
}
