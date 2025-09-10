import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function EventDetail({ params }: Props) {
  const id = `${params.id}`; // ensures it's treated as string

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 text-white px-4">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="mb-4 text-lg">{data.description}</p>
      <p className="text-sm text-gray-300">📍 {data.location}</p>
      <p className="text-sm text-gray-300">📅 {data.date}</p>
    </div>
  );
}