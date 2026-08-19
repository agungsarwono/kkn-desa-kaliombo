import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Dalam tahap nyata, di sini akan ada pemanggilan ke Supabase
  // misalnya supabase.from('...').select('id').limit(1)
  // untuk memastikan instance database tetap menyala (active).
  return NextResponse.json(
    { message: 'Keep-alive ping received successfully.' },
    { status: 200 }
  );
}
