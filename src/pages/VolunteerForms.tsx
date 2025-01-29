import { useGetAllVolunteersQuery } from "../redux/features/volunteer-forms/volunteerApiSlice.ts";

export default function VolunteerForms() {
  const { data, error, isLoading } = useGetAllVolunteersQuery({});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  if (data.allVolunteerForms.length === 0) {
    return (
      <div className="p-8">
        <h3 className="text-center text-4xl my-4 font-bold">
          Chief we are waiting for volunteer's to submit!
        </h3>
        <div className="flex items-center justify-center">
          <img src="/public/form.svg" alt="img" className="h-96 w-96" />
        </div>
      </div>
    );
  }

  return <main>hello</main>;
}
