import React from 'react';
import PageTransition from '../components/PageTransition';
import UserRegistration from '../components/UserRegistration';
import UserList from '../components/UserList';

function Users() {
  return (
    <PageTransition>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserRegistration />
          <UserList />
        </div>
      </div>
    </PageTransition>
  );
}

export default Users;