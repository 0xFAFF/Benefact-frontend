const privilegeMap = {
  none: 0,
  read: 1,
  contribute: 2,
  vote: 4,
  comment: 8,
  developer: 16,
  admin: 128
};

const hasPrivilege = (privilege, userPrivilege, strict = false) => {
  if(!userPrivilege) return false;
  if(!strict && (userPrivilege & privilegeMap.admin) !== 0) return true;
  return privilege.split("|").some(p => (privilegeMap[p] & userPrivilege) !== 0);
}
export default hasPrivilege;