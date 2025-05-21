import UserCard from '../components/UserCard';

export const dynamic = 'force-dynamic';

async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }
  return res.json();
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div>
      <h1 className="mb-4">Users</h1>
      <div className="d-flex flex-wrap justify-content-start gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
