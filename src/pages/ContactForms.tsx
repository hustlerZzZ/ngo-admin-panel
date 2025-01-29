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

  return <main>ContactForms</main>;
}
