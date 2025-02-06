import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Partidos de Fútbol</h1>
      <Link href="/create-match" className="bg-blue-500 text-white p-2 rounded">
        Crear Partido
      </Link>
      {/* Aquí puedes listar los partidos disponibles */}
    </div>
  );
}