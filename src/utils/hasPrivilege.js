const privilegeMap = {
  none: 0,
  read: 1,
  contribute: 2,
  vote: 4,
  comment: 8,
  developer: 16,
  admin: 128
};

const hasPrivilege = (privilege, role) => privilegeMap[privilege] & role.privilege != 0;
