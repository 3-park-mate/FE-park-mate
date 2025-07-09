import { options } from '@/app/api/auth/[...nextauth]/options';
import QrSignInTrigger from '@/components/pages/auth/signIn/QrSignInTrigger';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const token = params.token;
  console.log(token);
  if (token !== process.env.QR_SIGNIN_KEY) notFound();
  const session = await getServerSession(options);
  if (session) redirect('/');

  return (
    <>
      <QrSignInTrigger />
    </>
  );
}
