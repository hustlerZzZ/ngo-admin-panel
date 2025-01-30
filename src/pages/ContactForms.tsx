import { useGetAllContactQuery } from "../redux/features/contact-forms/contactApiSlice.ts";

export default function ContactForms() {
  const { data, error, isLoading } = useGetAllContactQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  if (data.contactForms.length === 0) {
    return (
      <div className="p-8">
        <h3 className="text-center text-4xl my-4 font-bold">
          Chief we are waiting for contact form's to submit!
        </h3>
        <div className="flex items-center justify-center">
          <img src="/public/contact.svg" alt="img" className="h-96 w-96" />
        </div>
      </div>
    );
  }

  return (
    <main className="mt-8">
      <table className="w-full outline">
        <thead>
          <tr className="grid grid-cols-6 justify-between bg-black text-white px-4 py-2">
            <td>S.No</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subject</td>
            <td>Message</td>
            <td>Submission Date</td>
          </tr>
        </thead>
        <tbody>
          {data.contactForms.map(
            (
              data: {
                name: string;
                email: string;
                subject: string;
                message: string;
                created_at: string;
              },
              i: number,
            ) => (
              <tr
                key={i}
                className="grid grid-cols-6 justify-between bg-gray-200  px-4 py-2"
              >
                <td>{i + 1}.</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.subject}</td>
                <td>{data.message}</td>
                <td>{new Date(data.created_at).toDateString()}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </main>
  );
}
