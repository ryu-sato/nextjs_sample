import Head from 'next/head'
import useSWR from 'swr'

function Employees() {
  const fetcher = () => fetch("http://localhost:8083/rest/v1/employees").then(res => res.json());
  const { data, error } = useSWR('/employees', fetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // データをレンダリングする
  const employees = data;
  const employeeListHtml = employees.map((employee) => 
    <tr>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.department}</td>
      <td>{employee.gender}</td>
    </tr>
  );
  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Gender</th>
      </thead>
      <tbody>
        {employeeListHtml}
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Employee management application (sample)</title>
      </Head>

      <main>
        <Employees />
      </main>
    </div>
  )
}
