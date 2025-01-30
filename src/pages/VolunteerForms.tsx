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

  return (
    <main className="mt-8">
      <table className="w-full outline">
        <thead>
          <tr className="grid grid-cols-6 justify-between bg-black text-white px-4 py-2">
            <td>S.No</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Zip Code</td>
            <td>Country</td>
          </tr>
        </thead>
        <tbody>
          {data.allVolunteerForms.map(
            (
              data: {
                name: string;
                email: string;
                phone_number: string;
                zip_code: string;
                country: string;
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
                <td>{data.phone_number}</td>
                <td>{data.zip_code}</td>
                <td>{data.country}</td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </main>
  );
}
